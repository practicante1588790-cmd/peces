"""Optional development QA using an existing Chrome and Playwright installation."""
import json
import hashlib
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
output = root / "docs/verification"
baseline = json.loads((output / "baseline-styles.json").read_text(encoding="utf-8"))
report = {"browser": "Chrome", "viewports": [360, 390, 768, 1440], "checks": [], "styleDifferences": [], "scriptErrors": []}

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(root), **kwargs)
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
Thread(target=server.serve_forever, daemon=True).start()

def ready_images(page):
    page.evaluate("document.querySelectorAll('img').forEach(i => i.loading = 'eager')")
    page.wait_for_function("[...document.images].every(i => i.complete)")

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path="C:/Program Files/Google/Chrome/Application/chrome.exe", headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.on("pageerror", lambda error: report["scriptErrors"].append(str(error)))
        page.goto((root / "index.html").as_uri())
        ready_images(page)
        assert page.locator(".fish-card").count() == 12
        assert "50 especies" in page.locator("#result-count").inner_text()
        assert "Página 1 de 5" in page.locator("#result-count").inner_text()
        assert page.evaluate("[...document.images].every(i => i.naturalWidth > 0)")
        assert page.locator("#previous-page").is_disabled()
        ids = []
        for number in range(1, 6):
            assert page.locator(".fish-card").count() == (2 if number == 5 else 12)
            ids.extend(page.locator(".fish-card").evaluate_all("cards => cards.map(card => card.dataset.speciesId)"))
            if number < 5:
                page.locator("#next-page").click()
        assert len(set(ids)) == 50
        assert page.locator("#next-page").is_disabled()
        page.locator("#search").fill("PIRARUCU")
        assert page.locator(".fish-card").count() == 1
        assert "Página 1 de 1" in page.locator("#result-count").inner_text()
        page.locator('[data-filter="marine"]').click()
        assert page.locator(".fish-card").count() == 0
        assert page.locator("#empty-state").is_visible()
        assert not page.locator("#pagination").is_visible()
        page.locator("#reset-search").click()
        assert page.locator("#search").evaluate("el => document.activeElement === el")
        page.locator("#search").fill("AMAZONIA")
        page.locator('[data-filter="freshwater"]').click()
        page.locator("#region-filter").select_option("south-america")
        assert page.locator(".fish-card").count() >= 2
        page.locator("#region-filter").select_option("europe")
        assert page.locator(".fish-card").count() == 0
        page.locator("#clear-filters").click()
        page.locator("#search").fill("TRUCHA")
        page.locator('[data-filter="brackish"]').click()
        assert page.locator(".fish-card").count() == 1
        assert page.locator(".environment-badge").inner_text() == "Agua dulce · Agua salada · Agua salobre"
        page.locator("#clear-filters").click()
        page.locator("#sort-order").select_option("name-asc")
        first_asc = page.locator(".fish-card h3").first.inner_text()
        page.locator("#sort-order").select_option("name-desc")
        assert page.locator(".fish-card h3").first.inner_text() != first_asc
        assert "Página 1 de 5" in page.locator("#result-count").inner_text()
        page.locator("#page-input").fill("999")
        page.locator('#page-form button').click()
        assert "Página 5 de 5" in page.locator("#result-count").inner_text()
        page.locator("#page-input").fill("-3")
        page.locator('#page-form button').click()
        assert "Página 1 de 5" in page.locator("#result-count").inner_text()
        page.locator("#page-input").fill("")
        page.locator('#page-form button').click()
        assert "Página 1 de 5" in page.locator("#result-count").inner_text()
        page.locator("#clear-filters").click()
        # Check every species dialog, including records with missing images or empty fields.
        catalog_ids = page.evaluate("AtlasCatalog.species.map(f => [f.id, f.scientificName])")
        for fish_id, scientific_name in catalog_ids:
            page.locator("#search").fill(scientific_name)
            button = page.locator(f'[data-species-id="{fish_id}"] .more-button')
            button.focus()
            page.keyboard.press("Enter")
            assert page.locator("dialog").evaluate("el => el.open")
            assert page.locator(".detail-list dd").count() >= 9
            assert page.locator(".dialog-sources li").count() >= 1
            page.keyboard.press("Shift+Tab")
            assert page.evaluate("document.activeElement.closest('dialog') !== null")
            for _ in range(8):
                page.keyboard.press("Tab")
                assert page.evaluate("document.activeElement.closest('dialog') !== null")
            page.keyboard.press("Escape")
            assert not page.locator("dialog").evaluate("el => el.open")
            assert button.evaluate("el => el === document.activeElement")
        page.locator("#clear-filters").click()
        page.locator(".more-button").first.click()
        page.locator("#close-dialog").click()
        assert page.locator(".more-button").first.evaluate("el => el === document.activeElement")
        report["checks"].extend(["12 cards per page", "50 unique paginated records", "search including aliases and accents", "combined environment/native-region/search filters", "multiple environments", "sorting", "pagination resets", "empty and out-of-range pages", "all 50 accessible dialogs", "Escape, button close, Tab and restored focus"])
        for width, height, label in [(1440, 1000, "desktop"), (390, 844, "mobile")]:
            page.set_viewport_size({"width": width, "height": height})
            page.locator("#clear-filters").click()
            ready_images(page)
            page.mouse.move(0, 0)
            page.evaluate("window.scrollTo({top:0, behavior:'instant'})")
            page.screenshot(path=str(output / f"after-{label}.png"))
            page.locator(".fish-card").first.screenshot(path=str(output / f"after-card-{label}.png"))
            page.locator(".more-button").first.click()
            page.locator("dialog").screenshot(path=str(output / f"after-dialog-{label}.png"))
            page.keyboard.press("Escape")
            page.mouse.move(0, 0)
            page.wait_for_function("['none', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px'].includes(getComputedStyle(document.querySelector('.fish-card')).boxShadow)")
            for selector, properties in baseline[label].items():
                actual = page.locator(selector).first.evaluate("(el, properties) => Object.fromEntries(properties.map(key => [key, getComputedStyle(el)[key]]))", list(properties))
                for key, old_value in properties.items():
                    if key == "boxShadow" and {old_value, actual[key]}.issubset({"none", "rgba(0, 0, 0, 0) 0px 0px 0px 0px"}):
                        continue
                    if actual[key] != old_value:
                        report["styleDifferences"].append({"viewport": label, "selector": selector, "property": key, "before": old_value, "after": actual[key]})
        assert not report["styleDifferences"], report["styleDifferences"]
        for width in report["viewports"]:
            page.set_viewport_size({"width": width, "height": 844})
            assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), width
        page.set_viewport_size({"width": 390, "height": 844})
        page.locator(".menu-toggle").click()
        assert page.locator(".menu-toggle").get_attribute("aria-expanded") == "true"
        page.keyboard.press("Escape")
        assert page.locator(".menu-toggle").get_attribute("aria-expanded") == "false"
        page.locator(".menu-toggle").click()
        page.locator('#main-nav a[href="#habitats"]').click()
        assert not page.locator("#main-nav").is_visible()
        page.locator("#search").fill("Engraulis ringens")
        assert page.locator(".fish-card .image-placeholder").inner_text() == "Imagen no disponible"
        page.locator("#clear-filters").click()
        page.evaluate("document.querySelector('.fish-card img').src='assets/images/test-missing.jpg'")
        assert page.locator(".fish-card .image-placeholder").first.inner_text() == "Imagen no disponible"
        page.emulate_media(reduced_motion="reduce")
        assert page.evaluate("getComputedStyle(document.documentElement).scrollBehavior") == "auto"
        assert page.goto(f"http://127.0.0.1:{server.server_port}/index.html").status == 200
        ready_images(page)
        assert page.locator(".fish-card").count() == 12
        assert page.evaluate("[...document.images].every(i => i.naturalWidth > 0)")
        assert not report["scriptErrors"], report["scriptErrors"]
        report["checks"].extend(["preserved computed styles", "responsive without horizontal overflow", "mobile menu", "missing images and load failures", "reduced motion", "file and HTTP loading"])
        browser.close()
finally:
    server.shutdown()

original_css = (root / "backups/phase-1-original/style.css").read_text(encoding="utf-8")
new_css = (root / "style.css").read_text(encoding="utf-8")
assert new_css.startswith(original_css)
manifest = json.loads((root / "backups/phase-1-original/manifest.json").read_text(encoding="utf-8"))
for relative, digest in manifest.items():
    if relative.startswith("assets/"):
        assert hashlib.sha256((root / relative).read_bytes()).hexdigest() == digest
report["checks"].extend(["original CSS rules unchanged", "all original photos and credits preserved by SHA-256"])
report["result"] = "passed"
(output / "browser-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report))
