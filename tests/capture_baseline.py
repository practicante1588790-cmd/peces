"""Capture the preserved version before changing the interface."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
output = root / "docs" / "verification"
selectors = [".site-header", ".brand", ".hero", "h1", ".fish-card", ".image-frame", ".card-content", ".habitat-grid article", ".care", ".site-footer"]
properties = ["color", "backgroundColor", "fontFamily", "fontSize", "fontWeight", "lineHeight", "borderRadius", "padding", "gap", "border", "boxShadow", "aspectRatio"]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path="C:/Program Files/Google/Chrome/Application/chrome.exe", headless=True)
    page = browser.new_page()
    styles = {}
    for width, height, label in [(1440, 1000, "desktop"), (390, 844, "mobile")]:
        page.set_viewport_size({"width": width, "height": height})
        page.goto((root / "backups/phase-1-original/index.html").as_uri())
        page.evaluate("document.querySelectorAll('img').forEach(i => i.loading = 'eager')")
        page.wait_for_function("[...document.images].every(i => i.complete)")
        page.mouse.move(0, 0)
        page.screenshot(path=str(output / f"before-{label}.png"))
        page.locator(".fish-card").first.screenshot(path=str(output / f"before-card-{label}.png"))
        page.locator(".more-button").first.click()
        page.locator("dialog").screenshot(path=str(output / f"before-dialog-{label}.png"))
        page.keyboard.press("Escape")
        page.mouse.move(0, 0)
        page.wait_for_function("['none', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px'].includes(getComputedStyle(document.querySelector('.fish-card')).boxShadow)")
        styles[label] = page.evaluate("""({selectors, properties}) => Object.fromEntries(selectors.map(selector => {
            const style = getComputedStyle(document.querySelector(selector));
            return [selector, Object.fromEntries(properties.map(property => [property, style[property]]))];
        }))""", {"selectors": selectors, "properties": properties})
    (output / "baseline-styles.json").write_text(json.dumps(styles, indent=2), encoding="utf-8")
    browser.close()
print("Baseline captured in docs/verification")
