"use strict";

// Curated species and credits. Keep unknown fields empty and cite every verified fact.
const AtlasCatalog = {
  "schemaVersion": 1,
  "reviewedAt": "2026-10-13",
  "regions": {
    "south-america": "América del Sur",
    "north-america": "América del Norte",
    "europe": "Europa",
    "africa": "África",
    "asia": "Asia",
    "oceania": "Oceanía",
    "atlantic": "Océano Atlántico",
    "pacific": "Océano Pacífico",
    "indian": "Océano Índico",
    "arctic": "Ártico",
    "antarctic": "Antártida"
  },
  "groups": [
    {
      "id": "group-sharks",
      "name": "Tiburones",
      "speciesIds": [
        "whale-shark",
        "hammerhead"
      ]
    }
  ],
  "heroPhoto": {
    "path": "assets/images/hero.jpg",
    "alt": "Paisaje submarino de un arrecife de coral iluminado por el agua azul.",
    "author": "Nata Mostova",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Pink_coral_reef_underwater.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Pink_coral_reef_underwater.jpg",
    "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
  },
  "species": [
    {
      "id": "clownfish",
      "scientificName": "Amphiprion ocellaris",
      "name": "Pez payaso",
      "alternativeNames": [
        "Falso pez payaso"
      ],
      "family": "Pomacentridae",
      "order": "",
      "environments": [
        "marine"
      ],
      "regions": [
        "asia",
        "oceania",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Indopacífico: sudeste asiático y norte de Australia",
      "introducedDistribution": "",
      "habitat": "Arrecifes de coral y lagunas protegidas, junto a anémonas.",
      "diet": "Pequeños crustáceos, zooplancton y algas.",
      "description": "Sus bandas blancas y su color naranja lo hacen inconfundible. Vive asociado a anémonas que le ofrecen refugio.",
      "curiosities": [
        "Vive en grupos con una hembra dominante. Un macho puede transformarse en hembra cuando cambia la jerarquía del grupo."
      ],
      "notes": "La región indicada es nativa; su presencia en acuarios de otros países no representa distribución natural.",
      "size": null,
      "photo": {
        "path": "assets/images/clownfish.jpg",
        "alt": "Pez payaso naranja con tres bandas blancas sobre un fondo rocoso.",
        "author": "Raimond Spekking",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
        "source": "https://commons.wikimedia.org/wiki/File:Clownfisch_(Amphiprion_ocellaris).jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Clownfisch_%28Amphiprion_ocellaris%29.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Amphiprion ocellaris",
          "url": "https://animaldiversity.org/accounts/Amphiprion_ocellaris/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "blue-tang",
      "scientificName": "Paracanthurus hepatus",
      "name": "Pez cirujano azul",
      "alternativeNames": [
        "Cirujano de paleta"
      ],
      "family": "Acanthuridae",
      "order": "Acanthuriformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "africa",
        "asia",
        "oceania",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Indopacífico tropical",
      "introducedDistribution": "",
      "habitat": "Arrecifes coralinos con zonas de refugio entre corales ramificados.",
      "diet": "Zooplancton y algas.",
      "description": "Un cuerpo azul intenso, un dibujo oscuro y una cola amarilla distinguen a este habitante de los arrecifes.",
      "curiosities": [
        "Tiene espinas afiladas a ambos lados de la base de la cola: de ahí el nombre de pez cirujano."
      ],
      "notes": "Nativo de aguas tropicales de los océanos Índico y Pacífico.",
      "size": {
        "value": 31,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Paracanthurus-hepatus.html"
      },
      "photo": {
        "path": "assets/images/blue-tang.jpg",
        "alt": "Pez cirujano azul de cuerpo azul, marcas oscuras y cola amarilla.",
        "author": "Tewy",
        "license": "CC BY 2.5",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
        "source": "https://commons.wikimedia.org/wiki/File:Blue_tang_(Paracanthurus_hepatus)_02.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/Blue_tang_%28Paracanthurus_hepatus%29_02.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Paracanthurus hepatus",
          "url": "https://animaldiversity.org/accounts/Paracanthurus_hepatus/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        },
        {
          "title": "FishBase — Paracanthurus hepatus",
          "url": "https://www.fishbase.se/summary/Paracanthurus-hepatus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "whale-shark",
      "scientificName": "Rhincodon typus",
      "name": "Tiburón ballena",
      "alternativeNames": [],
      "family": "Rhincodontidae",
      "order": "",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Océanos tropicales y templados cálidos",
      "introducedDistribution": "",
      "habitat": "Mar abierto y zonas costeras, a menudo cerca de la superficie.",
      "diet": "Plancton, huevos de peces y pequeños organismos que filtra del agua.",
      "description": "El pez más grande del mundo se alimenta filtrando agua. Su piel está cubierta de manchas claras y líneas.",
      "curiosities": [
        "Aunque su nombre mencione a una ballena, es un pez cartilaginoso y respira mediante branquias."
      ],
      "notes": "Su distribución nativa abarca aguas cálidas del Atlántico, Índico y Pacífico.",
      "size": null,
      "photo": {
        "path": "assets/images/whale-shark.jpg",
        "alt": "Primer plano de la cabeza de un tiburón ballena bajo el agua.",
        "author": "Arturo de Frias Marques",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
        "source": "https://commons.wikimedia.org/wiki/File:Whale_Shark_AdF.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Whale_Shark_AdF.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Florida Museum — Rhincodon typus",
          "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/whale-shark/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "hammerhead",
      "scientificName": "Sphyrna zygaena",
      "name": "Tiburón martillo común",
      "alternativeNames": [],
      "family": "Sphyrnidae",
      "order": "",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Mares templados y tropicales del mundo",
      "introducedDistribution": "",
      "habitat": "Aguas costeras y plataformas continentales; también realiza recorridos mar adentro.",
      "diet": "Peces, rayas, otros pequeños tiburones y cefalópodos.",
      "description": "La silueta de su cabeza es ancha y curva, con un borde frontal liso que lo diferencia de otros tiburones martillo.",
      "curiosities": [
        "Sus ojos se sitúan en los extremos de la cabeza. Esta forma también distribuye órganos sensoriales que ayudan a detectar presas."
      ],
      "notes": "Nativo de regiones del Atlántico, Índico y Pacífico. No debe confundirse con el martillo festoneado, Sphyrna lewini.",
      "size": null,
      "photo": {
        "path": "assets/images/hammerhead.jpg",
        "alt": "Tiburón martillo común de cabeza ancha con borde frontal liso.",
        "author": "Globetrotteur17... Ici, là-bas ou ailleurs...",
        "license": "CC BY-SA 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
        "source": "https://commons.wikimedia.org/wiki/File:Sphyrna_zygaena,_Aquarium_de_La_Rochelle.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Sphyrna_zygaena%2C_Aquarium_de_La_Rochelle.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Florida Museum — Sphyrna zygaena",
          "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/smooth-hammerhead/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "lionfish",
      "scientificName": "Pterois volitans",
      "name": "Pez león rojo",
      "alternativeNames": [],
      "family": "Scorpaenidae",
      "order": "",
      "environments": [
        "marine"
      ],
      "regions": [
        "asia",
        "oceania",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Indopacífico: océano Pacífico y este del Índico",
      "introducedDistribution": "Introducido e invasor en el Atlántico occidental, el Caribe y el golfo de México.",
      "habitat": "Arrecifes rocosos y coralinos, con cuevas y grietas donde puede refugiarse.",
      "diet": "Pequeños peces y crustáceos.",
      "description": "Sus aletas desplegadas y sus franjas rojizas parecen ornamentales, pero sus espinas contienen veneno.",
      "curiosities": [
        "Es un cazador que captura sus presas con un movimiento rápido de su boca."
      ],
      "notes": "Nativo del Indopacífico. Introducido e invasor en el Atlántico occidental, el Caribe y el golfo de México; esos lugares no son su región nativa.",
      "size": null,
      "photo": {
        "path": "assets/images/lionfish.jpg",
        "alt": "Pez león rojo con franjas blancas y rojizas y aletas extendidas.",
        "author": "Jens Petersen; edición: Olegiwit y Fir0002",
        "license": "CC BY 2.5",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
        "source": "https://commons.wikimedia.org/wiki/File:Pterois_volitans_Manado-e_edit.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Pterois_volitans_Manado-e_edit.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Florida Museum — Pterois volitans",
          "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/red-lionfish/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "introducedDistribution"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "seahorse",
      "scientificName": "Hippocampus ingens",
      "name": "Caballito de mar del Pacífico",
      "alternativeNames": [],
      "family": "Syngnathidae",
      "order": "Syngnathiformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "north-america",
        "south-america",
        "pacific"
      ],
      "nativeDistribution": "Pacífico oriental: de California a Perú",
      "introducedDistribution": "",
      "habitat": "Bahías protegidas, arrecifes y praderas marinas, donde se sujeta a la vegetación.",
      "diet": "Pequeños crustáceos y otros organismos del zooplancton.",
      "description": "Nada en posición vertical y usa su cola prensil para sujetarse. Puede cambiar de color para confundirse con su entorno.",
      "curiosities": [
        "El macho incuba los huevos en una bolsa y después libera a las crías."
      ],
      "notes": "Nativo de las costas del Pacífico oriental, incluidas islas como las Galápagos.",
      "size": {
        "value": 30,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Hippocampus-ingens.html"
      },
      "photo": {
        "path": "assets/images/seahorse.jpg",
        "alt": "Caballito de mar del Pacífico con hocico alargado y cola curvada.",
        "author": "Alberto Alcalá",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
        "source": "https://commons.wikimedia.org/wiki/File:Hippocampus_ingens_256105643.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/8/88/Hippocampus_ingens_256105643.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Hippocampus ingens",
          "url": "https://animaldiversity.org/accounts/Hippocampus_ingens/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        },
        {
          "title": "FishBase — Hippocampus ingens",
          "url": "https://www.fishbase.se/summary/Hippocampus-ingens.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "mandarinfish",
      "scientificName": "Synchiropus splendidus",
      "name": "Pez mandarín",
      "alternativeNames": [],
      "family": "Callionymidae",
      "order": "",
      "environments": [
        "marine"
      ],
      "regions": [
        "asia",
        "oceania",
        "pacific"
      ],
      "nativeDistribution": "Pacífico occidental: de las islas Ryukyu a Australia",
      "introducedDistribution": "",
      "habitat": "Lagunas someras y fondos de arrecifes entre corales y fragmentos de coral.",
      "diet": "Pequeños crustáceos, gusanos y otros invertebrados del fondo.",
      "description": "Un mosaico de líneas azules, verdes y anaranjadas cubre a este pequeño pez que explora el fondo del arrecife.",
      "curiosities": [
        "No tiene escamas: su piel está protegida por una capa de mucosidad."
      ],
      "notes": "Nativo del Pacífico occidental, incluidas Filipinas, Indonesia y Nueva Guinea.",
      "size": null,
      "photo": {
        "path": "assets/images/mandarinfish.jpg",
        "alt": "Pez mandarín con líneas azules y anaranjadas sobre el cuerpo.",
        "author": "Luc Viatour",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
        "source": "https://commons.wikimedia.org/wiki/File:Synchiropus_splendidus_2_Luc_Viatour.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Synchiropus_splendidus_2_Luc_Viatour.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Synchiropus splendidus",
          "url": "https://animaldiversity.org/accounts/Synchiropus_splendidus/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "arapaima",
      "scientificName": "Arapaima gigas",
      "name": "Paiche",
      "alternativeNames": [
        "Pirarucú"
      ],
      "family": "Arapaimidae",
      "order": "",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "América del Sur: cuenca amazónica",
      "introducedDistribution": "",
      "habitat": "Lagos de inundación, tributarios y bosques inundados de la Amazonía.",
      "diet": "Principalmente peces; también otros animales que captura en el agua.",
      "description": "También llamado pirarucú, este gran pez amazónico tiene un cuerpo alargado y escamas resistentes.",
      "curiosities": [
        "Sube a la superficie para respirar aire gracias a una vejiga natatoria especializada."
      ],
      "notes": "Su región nativa es amazónica. El nombre paiche también se aplica a otros miembros del género Arapaima; esta ficha trata de A. gigas.",
      "size": null,
      "photo": {
        "path": "assets/images/arapaima.jpg",
        "alt": "Paiche de cuerpo alargado con escamas grandes y tonos rojizos.",
        "author": "Citron / CC-BY-SA-3.0",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "source": "https://commons.wikimedia.org/wiki/File:Arapaima_gigas_captivity.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/7/75/Arapaima_gigas_captivity.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Arapaima gigas",
          "url": "https://animaldiversity.org/accounts/Arapaima_gigas/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "piranha",
      "scientificName": "Pygocentrus nattereri",
      "name": "Piraña de vientre rojo",
      "alternativeNames": [],
      "family": "Serrasalmidae",
      "order": "Characiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "América del Sur: Amazonía y cuenca Paraná–Paraguay",
      "introducedDistribution": "",
      "habitat": "Ríos y otros ambientes fluviales, especialmente aguas con sedimentos en suspensión.",
      "diet": "Peces, invertebrados y materia vegetal; también aprovecha carroña.",
      "description": "Su vientre rojizo contrasta con el dorso plateado. Sus mandíbulas llevan dientes triangulares que encajan entre sí.",
      "curiosities": [
        "Su alimentación es más variada de lo que su fama sugiere: no consume únicamente presas vivas."
      ],
      "notes": "Nativa de cuencas sudamericanas al este de los Andes; aquí se muestran regiones nativas representativas.",
      "size": null,
      "photo": {
        "path": "assets/images/piranha.jpg",
        "alt": "Piraña de vientre rojo con dorso plateado y zona ventral anaranjada.",
        "author": "Gregory Moine",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
        "source": "https://commons.wikimedia.org/wiki/File:Gregory_Moine_-_Red_bellied_Piranha_(by).jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Gregory_Moine_-_Red_bellied_Piranha_%28by%29.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Pygocentrus nattereri",
          "url": "https://animaldiversity.org/accounts/Pygocentrus_nattereri/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        },
        {
          "title": "FishBase — Pygocentrus nattereri",
          "url": "https://www.fishbase.se/summary/Pygocentrus-nattereri.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "betta",
      "scientificName": "Betta splendens",
      "name": "Betta",
      "alternativeNames": [],
      "family": "Osphronemidae",
      "order": "",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "asia"
      ],
      "nativeDistribution": "Sudeste asiático: Tailandia",
      "introducedDistribution": "",
      "habitat": "Humedales, charcas con vegetación y aguas someras de corriente lenta.",
      "diet": "Insectos, larvas y pequeños crustáceos.",
      "description": "Las variedades domésticas lucen grandes aletas y colores intensos. Los ejemplares silvestres tienen una apariencia más discreta.",
      "curiosities": [
        "Su órgano laberinto le permite respirar aire de la superficie. El macho construye un nido de burbujas para los huevos."
      ],
      "notes": "Tailandia forma parte de su distribución nativa. Su cría ornamental en todo el mundo no implica que sea nativo de esos países.",
      "size": null,
      "photo": {
        "path": "assets/images/betta.jpg",
        "alt": "Betta doméstico de colores intensos con aletas extendidas.",
        "author": "Henryk Niestrój",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
        "source": "https://commons.wikimedia.org/wiki/File:Bojownik_syjamski.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/5/54/Bojownik_syjamski.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Betta splendens",
          "url": "https://animaldiversity.org/accounts/Betta_splendens/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "discus",
      "scientificName": "Symphysodon discus",
      "name": "Pez disco",
      "alternativeNames": [
        "Disco de Heckel"
      ],
      "family": "Cichlidae",
      "order": "Cichliformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "Amazonía brasileña: Negro, Abacaxis y Trombetas",
      "introducedDistribution": "",
      "habitat": "Aguas amazónicas cálidas, con refugios entre raíces y vegetación sumergida.",
      "diet": "Gusanos, crustáceos, insectos y materia vegetal.",
      "description": "Su cuerpo redondeado y aplanado recuerda a un disco. Es uno de los cíclidos característicos de la Amazonía.",
      "curiosities": [
        "Las crías se alimentan inicialmente de la mucosidad de la piel de sus padres, que también las protegen."
      ],
      "notes": "Nativo de sectores de la cuenca amazónica en Brasil. Otras especies del género y variedades domésticas también se llaman peces disco.",
      "size": {
        "value": 20,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Symphysodon-discus.html"
      },
      "photo": {
        "path": "assets/images/discus.jpg",
        "alt": "Pez disco de cuerpo circular y aplanado, de color naranja rojizo en un acuario.",
        "author": "Karelj",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "source": "https://commons.wikimedia.org/wiki/File:Symphysodon_discus_Prague_2011_1.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Symphysodon_discus_Prague_2011_1.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "FishBase — Symphysodon discus",
          "url": "https://www.fishbase.org/summary/Symphysodon_discus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        },
        {
          "title": "FishBase — Symphysodon discus",
          "url": "https://www.fishbase.se/summary/Symphysodon-discus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "trout",
      "scientificName": "Oncorhynchus mykiss",
      "name": "Trucha arcoíris",
      "alternativeNames": [
        "Steelhead"
      ],
      "family": "Salmonidae",
      "order": "",
      "environments": [
        "freshwater",
        "marine",
        "brackish"
      ],
      "regions": [
        "north-america",
        "pacific"
      ],
      "nativeDistribution": "Norteamérica: vertiente del Pacífico",
      "introducedDistribution": "Introducida en múltiples regiones fuera de su distribución nativa, incluidos los Andes.",
      "habitat": "Ríos y lagos de agua fría y bien oxigenada; usa fondos de grava para reproducirse. La forma steelhead utiliza aguas costeras marinas y estuarinas antes de regresar a los ríos.",
      "diet": "Insectos acuáticos, crustáceos y pequeños peces.",
      "description": "Una franja rosada recorre su cuerpo moteado. Aquí se presenta la forma que permanece en agua dulce. La especie también tiene una forma migratoria que visita el mar.",
      "curiosities": [
        "La misma especie tiene una forma migratoria, llamada steelhead, que crece en el mar y vuelve a los ríos para reproducirse."
      ],
      "notes": "Nativa de la vertiente pacífica de Norteamérica. Ha sido introducida en muchas otras regiones, incluidos los Andes; su presencia allí no es nativa.",
      "size": null,
      "photo": {
        "path": "assets/images/trout.jpg",
        "alt": "Trucha arcoíris plateada con manchas oscuras y una banda rosada lateral.",
        "author": "Jonathunder",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "source": "https://commons.wikimedia.org/wiki/File:Trout.jpg",
        "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/d/db/Trout.jpg",
        "changes": "Sin modificaciones; la página puede recortar la vista con CSS."
      },
      "sources": [
        {
          "title": "Animal Diversity Web — Oncorhynchus mykiss",
          "url": "https://animaldiversity.org/accounts/Oncorhynchus_mykiss/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "introducedDistribution"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "sarda-chiliensis",
      "scientificName": "Sarda chiliensis",
      "name": "Bonito del Pacífico",
      "alternativeNames": [],
      "family": "Scombridae",
      "order": "Scombriformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "south-america",
        "pacific"
      ],
      "nativeDistribution": "Pacífico sudoriental, desde el norte de Perú hasta Talcahuano, Chile.",
      "introducedDistribution": "",
      "habitat": "Aguas costeras; los adultos pueden alejarse más de la costa.",
      "diet": "Peces pequeños de cardumen, calamares y camarones.",
      "description": "Pez marino de cuerpo fusiforme que forma cardúmenes por tamaño.",
      "curiosities": [
        "Carece de vejiga natatoria."
      ],
      "size": {
        "value": 102,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Sarda-chiliensis.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Sarda chiliensis",
          "url": "https://www.fishbase.se/summary/Sarda-chiliensis.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "engraulis-ringens",
      "scientificName": "Engraulis ringens",
      "name": "Anchoveta peruana",
      "alternativeNames": [],
      "family": "Engraulidae",
      "order": "Clupeiformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "south-america",
        "pacific"
      ],
      "nativeDistribution": "Pacífico sudoriental: Galápagos, Perú y Chile, incluidas islas de Pascua y Chiloé.",
      "introducedDistribution": "",
      "habitat": "Aguas superficiales cercanas a la costa, donde forma grandes cardúmenes.",
      "diet": "Plancton de la corriente peruana, capturado por filtración.",
      "description": "Pez pequeño, alargado y brillante de tonos azules o verdes.",
      "curiosities": [
        "Es alimento de pelícanos y otras aves guaneras."
      ],
      "size": {
        "value": 20,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Engraulis-ringens.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Engraulis ringens",
          "url": "https://www.fishbase.se/summary/Engraulis-ringens.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "thunnus-albacares",
      "scientificName": "Thunnus albacares",
      "name": "Atún de aleta amarilla",
      "alternativeNames": [],
      "family": "Scombridae",
      "order": "Scombriformes",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "atlantic",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Mares tropicales y subtropicales del mundo; ausente del Mediterráneo.",
      "introducedDistribution": "",
      "habitat": "Aguas abiertas del océano; forma grupos por tamaño.",
      "diet": "Peces, crustáceos y calamares.",
      "description": "Atún de cuerpo alargado, dorso azul y aletas amarillas.",
      "curiosities": [
        "Puede agruparse alrededor de objetos flotantes."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Thunnus albacares",
          "url": "https://www.fishbase.se/summary/Thunnus-albacares.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "gadus-morhua",
      "scientificName": "Gadus morhua",
      "name": "Bacalao del Atlántico",
      "alternativeNames": [],
      "family": "Gadidae",
      "order": "Gadiformes",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "atlantic",
        "arctic",
        "north-america",
        "europe"
      ],
      "nativeDistribution": "Atlántico norte y Ártico: Canadá, Estados Unidos, Groenlandia, Islandia y costas europeas hasta el golfo de Vizcaya.",
      "introducedDistribution": "Introducido en el Mediterráneo.",
      "habitat": "Desde costas hasta la plataforma continental; adultos en aguas frías y profundas.",
      "diet": "Invertebrados y peces, incluidos bacalaos jóvenes.",
      "description": "Pez con una barbilla destacada bajo la mandíbula.",
      "curiosities": [
        "Los juveniles encuentran protección en praderas marinas y fondos rocosos."
      ],
      "size": {
        "value": 200,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Gadus-morhua.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Gadus morhua",
          "url": "https://www.fishbase.se/summary/Gadus-morhua.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size",
            "introducedDistribution"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "sardina-pilchardus",
      "scientificName": "Sardina pilchardus",
      "name": "Sardina europea",
      "alternativeNames": [],
      "family": "Alosidae",
      "order": "Clupeiformes",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "atlantic",
        "europe",
        "africa"
      ],
      "nativeDistribution": "Atlántico nororiental, del mar del Norte hasta Senegal; también Mediterráneo, mar de Mármara y mar Negro.",
      "introducedDistribution": "",
      "habitat": "Aguas costeras abiertas; cardúmenes que ascienden durante la noche.",
      "diet": "Principalmente crustáceos planctónicos.",
      "description": "Pez pelágico costero que se desplaza en cardúmenes.",
      "curiosities": [
        "Los grupos suelen ocupar aguas más profundas durante el día."
      ],
      "size": {
        "value": 27.5,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Sardina-pilchardus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Sardina pilchardus",
          "url": "https://www.fishbase.se/summary/Sardina-pilchardus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "scomber-scombrus",
      "scientificName": "Scomber scombrus",
      "name": "Caballa del Atlántico",
      "alternativeNames": [],
      "family": "Scombridae",
      "order": "Scombriformes",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "atlantic"
      ],
      "nativeDistribution": "Atlántico norte, incluido el Mediterráneo.",
      "introducedDistribution": "",
      "habitat": "Aguas frías y templadas sobre la plataforma continental.",
      "diet": "Zooplancton y peces pequeños.",
      "description": "Pez de cuerpo fusiforme con marcas oscuras sobre el dorso.",
      "curiosities": [
        "No tiene vejiga natatoria."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Scomber scombrus",
          "url": "https://www.fishbase.se/summary/Scomber-scombrus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "hippoglossus-hippoglossus",
      "scientificName": "Hippoglossus hippoglossus",
      "name": "Fletán del Atlántico",
      "alternativeNames": [],
      "family": "Pleuronectidae",
      "order": "Pleuronectiformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "arctic"
      ],
      "nativeDistribution": "Océano Atlántico y Ártico adyacente.",
      "introducedDistribution": "",
      "habitat": "Fondos marinos; los adultos también pueden nadar en aguas abiertas.",
      "diet": "Peces, cefalópodos, grandes crustáceos y otros animales del fondo.",
      "description": "Pez plano de color oscuro, con juveniles moteados.",
      "curiosities": [
        "Su crecimiento depende de la competencia y la disponibilidad de alimento."
      ],
      "size": {
        "value": 470,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Hippoglossus-hippoglossus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Hippoglossus hippoglossus",
          "url": "https://www.fishbase.se/summary/Hippoglossus-hippoglossus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "pleuronectes-platessa",
      "scientificName": "Pleuronectes platessa",
      "name": "Solla europea",
      "alternativeNames": [],
      "family": "Pleuronectidae",
      "order": "Pleuronectiformes",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "atlantic",
        "europe"
      ],
      "nativeDistribution": "Mar del Norte; los registros actuales del Mediterráneo pueden ser identificaciones erróneas.",
      "introducedDistribution": "",
      "habitat": "Fondos de arena y fango, costas y estuarios.",
      "diet": "Moluscos de concha fina y gusanos poliquetos.",
      "description": "Pez plano con manchas anaranjadas o rojizas y cara inferior blanca.",
      "curiosities": [
        "Pasa parte del día enterrado en la arena."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Pleuronectes platessa",
          "url": "https://www.fishbase.se/summary/Pleuronectes-platessa.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "dicentrarchus-labrax",
      "scientificName": "Dicentrarchus labrax",
      "name": "Lubina europea",
      "alternativeNames": [],
      "family": "Moronidae",
      "order": "",
      "environments": [
        "marine",
        "freshwater",
        "brackish"
      ],
      "regions": [
        "atlantic",
        "europe",
        "africa"
      ],
      "nativeDistribution": "Atlántico nororiental, de Marruecos a Noruega; Mediterráneo y sur del mar Negro.",
      "introducedDistribution": "Registros recientes sugieren expansión al norte del mar Rojo a través del canal de Suez.",
      "habitat": "Costas, lagunas, estuarios y ocasionalmente ríos.",
      "diet": "Camarones, moluscos y peces.",
      "description": "Pez costero que utiliza ambientes con diferentes salinidades.",
      "curiosities": [
        "Los jóvenes forman grupos; los adultos son menos gregarios."
      ],
      "size": {
        "value": 103,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Dicentrarchus-labrax.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Dicentrarchus labrax",
          "url": "https://www.fishbase.se/summary/Dicentrarchus-labrax.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "diet",
            "size",
            "introducedDistribution"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "sparus-aurata",
      "scientificName": "Sparus aurata",
      "name": "Dorada",
      "alternativeNames": [],
      "family": "Sparidae",
      "order": "",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "atlantic",
        "europe",
        "africa"
      ],
      "nativeDistribution": "Atlántico oriental: islas británicas, Gibraltar, Cabo Verde y Canarias; también Mediterráneo.",
      "introducedDistribution": "",
      "habitat": "Praderas marinas, fondos arenosos, lagunas costeras y estuarios.",
      "diet": "Moluscos, incluidos mejillones y ostras; ocasionalmente vegetales.",
      "description": "Pez de cuerpo alto con una mancha oscura en el opérculo.",
      "curiosities": [
        "Puede madurar primero como macho y después como hembra."
      ],
      "size": {
        "value": 70,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Sparus-aurata.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Sparus aurata",
          "url": "https://www.fishbase.se/summary/Sparus-aurata.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "coryphaena-hippurus",
      "scientificName": "Coryphaena hippurus",
      "name": "Perico",
      "alternativeNames": [],
      "family": "Coryphaenidae",
      "order": "Carangiformes",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "atlantic",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Aguas tropicales y subtropicales de los océanos Atlántico, Índico y Pacífico.",
      "introducedDistribution": "",
      "habitat": "Aguas abiertas y zonas próximas a la costa.",
      "diet": "Peces, zooplancton, crustáceos y calamares.",
      "description": "Pez de dorso azul verdoso metálico y flancos con brillo dorado.",
      "curiosities": [
        "Los machos adultos desarrollan una cresta prominente en la cabeza."
      ],
      "size": {
        "value": 210,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Coryphaena-hippurus"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Coryphaena hippurus",
          "url": "https://www.fishbase.se/summary/Coryphaena-hippurus",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "xiphias-gladius",
      "scientificName": "Xiphias gladius",
      "name": "Pez espada",
      "alternativeNames": [],
      "family": "Xiphiidae",
      "order": "Carangiformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Océanos Atlántico, Índico y Pacífico, en aguas tropicales y templadas; también Mediterráneo y mares adyacentes.",
      "introducedDistribution": "",
      "habitat": "Océano abierto, a veces aguas costeras; realiza migraciones.",
      "diet": "Principalmente peces, además de crustáceos y calamares.",
      "description": "Depredador con un rostro largo y aplanado semejante a una espada.",
      "curiosities": [
        "Los adultos carecen de aletas pélvicas."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Xiphias gladius",
          "url": "https://www.fishbase.se/summary/Xiphias-gladius.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "katsuwonus-pelamis",
      "scientificName": "Katsuwonus pelamis",
      "name": "Atún listado",
      "alternativeNames": [],
      "family": "Scombridae",
      "order": "Scombriformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "pacific",
        "indian"
      ],
      "nativeDistribution": "Aguas tropicales y templadas cálidas del mundo; ausente del mar Negro.",
      "introducedDistribution": "",
      "habitat": "Aguas alejadas de la costa, con cardúmenes cerca de la superficie.",
      "diet": "Peces, crustáceos, cefalópodos y otros moluscos.",
      "description": "Atún con bandas oscuras longitudinales en los flancos inferiores.",
      "curiosities": [
        "Sus huevos y larvas permanecen en la columna de agua."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Katsuwonus pelamis",
          "url": "https://www.fishbase.se/summary/Katsuwonus-pelamis.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "acanthurus-coeruleus",
      "scientificName": "Acanthurus coeruleus",
      "name": "Pez cirujano azul del Atlántico",
      "alternativeNames": [],
      "family": "Acanthuridae",
      "order": "Acanthuriformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "north-america",
        "south-america"
      ],
      "nativeDistribution": "Atlántico occidental, de Nueva York y Bermudas a Brasil; isla Ascensión en el Atlántico oriental.",
      "introducedDistribution": "",
      "habitat": "Arrecifes de coral y zonas costeras rocosas o con vegetación.",
      "diet": "Algas.",
      "description": "Pez cirujano de cuerpo alto con una espina amarilla junto a la cola.",
      "curiosities": [
        "Se han observado juveniles retirando parásitos de tortugas verdes."
      ],
      "size": {
        "value": 39,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Acanthurus-coeruleus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Acanthurus coeruleus",
          "url": "https://www.fishbase.se/summary/Acanthurus-coeruleus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "chelmon-rostratus",
      "scientificName": "Chelmon rostratus",
      "name": "Pez mariposa de bandas cobrizas",
      "alternativeNames": [],
      "family": "Chaetodontidae",
      "order": "Acanthuriformes",
      "environments": [
        "marine",
        "brackish"
      ],
      "regions": [
        "pacific",
        "indian",
        "asia",
        "oceania"
      ],
      "nativeDistribution": "Desde el mar de Andamán hasta las islas Ryukyu y Australia.",
      "introducedDistribution": "",
      "habitat": "Costas rocosas, arrecifes coralinos y estuarios.",
      "diet": "",
      "description": "Pez mariposa asociado a arrecifes y de comportamiento territorial.",
      "curiosities": [
        "Los adultos forman parejas durante la reproducción."
      ],
      "size": {
        "value": 20,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Chelmon-rostratus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Chelmon rostratus",
          "url": "https://www.fishbase.se/summary/Chelmon-rostratus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "zanclus-cornutus",
      "scientificName": "Zanclus cornutus",
      "name": "Ídolo moro",
      "alternativeNames": [],
      "family": "Zanclidae",
      "order": "Acanthuriformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "indian",
        "pacific",
        "africa",
        "asia",
        "oceania",
        "north-america",
        "south-america"
      ],
      "nativeDistribution": "Indopacífico, de África oriental a islas del Pacífico; también del golfo de California a Perú.",
      "introducedDistribution": "",
      "habitat": "Lagunas, plataformas arrecifales y arrecifes rocosos o coralinos.",
      "diet": "Pequeños animales adheridos al sustrato.",
      "description": "Pez de cuerpo discoidal y comprimido con un filamento dorsal largo.",
      "curiosities": [
        "Los adultos pueden aparecer solos, en parejas o en pequeños grupos."
      ],
      "size": {
        "value": 23,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Zanclus-cornutus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Zanclus cornutus",
          "url": "https://www.fishbase.se/summary/Zanclus-cornutus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "diet",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "pterapogon-kauderni",
      "scientificName": "Pterapogon kauderni",
      "name": "Pez cardenal de Banggai",
      "alternativeNames": [],
      "family": "Apogonidae",
      "order": "Kurtiformes",
      "environments": [
        "marine"
      ],
      "regions": [
        "pacific",
        "asia"
      ],
      "nativeDistribution": "Islas Banggai y localidades próximas de Indonesia, incluidas Taliabu y Luwuk.",
      "introducedDistribution": "",
      "habitat": "Aguas marinas someras.",
      "diet": "Crustáceos y otros organismos planctónicos.",
      "description": "Pez cardenal marino propio de una pequeña región de Indonesia.",
      "curiosities": [
        "El macho incuba los huevos dentro de su boca."
      ],
      "size": {
        "value": 8.6,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Pterapogon-kauderni.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase — Pterapogon kauderni",
          "url": "https://www.fishbase.se/summary/Pterapogon-kauderni.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "order",
            "size"
          ]
        },
        {
          "title": "Life History Of Banggai Cardinalfish (2013)",
          "url": "https://www.researchgate.net/publication/259573022_Life_History_Of_Banggai_Cardinalfish_Pterapogon_Kauderni_Actinopterygii_Perciformes_Apogonidae_From_Banggai_Islands_And_Palu_Bay_Sulawesi_Indonesia",
          "accessedAt": "2026-10-13",
          "fields": [
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "holacanthus-ciliaris",
      "scientificName": "Holacanthus ciliaris",
      "name": "Pez ángel reina",
      "alternativeNames": [],
      "family": "Pomacanthidae",
      "order": "",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "north-america",
        "south-america"
      ],
      "nativeDistribution": "Atlántico occidental tropical: Bermudas, Brasil, Panamá y Caribe.",
      "introducedDistribution": "",
      "habitat": "Arrecifes de coral, cerca del fondo.",
      "diet": "Principalmente esponjas; también otros invertebrados, algas y plancton.",
      "description": "Pez azul verdoso con tonos amarillos y una marca semejante a una corona.",
      "curiosities": [
        "Los juveniles pueden retirar parásitos de peces mayores."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "Florida Museum — Holacanthus ciliaris",
          "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/queen-angelfish/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "sphyraena-barracuda",
      "scientificName": "Sphyraena barracuda",
      "name": "Gran barracuda",
      "alternativeNames": [],
      "family": "Sphyraenidae",
      "order": "",
      "environments": [
        "marine"
      ],
      "regions": [
        "atlantic",
        "indian",
        "pacific",
        "north-america",
        "south-america"
      ],
      "nativeDistribution": "Mares tropicales y subtropicales: Atlántico, Indopacífico y mar Rojo; rara o ausente en el Pacífico oriental.",
      "introducedDistribution": "",
      "habitat": "Arrecifes costeros, manglares y praderas marinas; también mar abierto.",
      "diet": "Diversas especies de peces.",
      "description": "Depredador de cuerpo alargado, mandíbula prominente y dientes grandes.",
      "curiosities": [
        "Localiza sus presas principalmente mediante la vista."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "Florida Museum — Sphyraena barracuda",
          "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/great-barracuda/",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "diet"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "gamitana",
      "scientificName": "Colossoma macropomum",
      "name": "Gamitana",
      "alternativeNames": [],
      "family": "Serrasalmidae",
      "order": "Characiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "Cuencas del Amazonas y del Orinoco.",
      "introducedDistribution": "",
      "habitat": "Bosques inundados y llanuras de inundación tropicales.",
      "diet": "Frutos, semillas, zooplancton, insectos y caracoles.",
      "description": "Pez de cuerpo alto que aprovecha los recursos de los bosques inundados.",
      "curiosities": [
        "Durante las crecidas entra en el bosque inundado."
      ],
      "size": {
        "value": 108,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Colossoma-macropomum.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Colossoma macropomum",
          "url": "https://www.fishbase.se/summary/Colossoma-macropomum.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        },
        {
          "title": "IIAP: memoria institucional 2018",
          "url": "https://www.iiap.gob.pe/Archivos/Publicaciones/Publicacion_3838.pdf",
          "fields": [
            "name"
          ],
          "accessedAt": "2026-10-13"
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "paco",
      "scientificName": "Piaractus brachypomus",
      "name": "Paco",
      "alternativeNames": [],
      "family": "Serrasalmidae",
      "order": "Characiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "Cuenca del Amazonas; el linaje del Orinoco corresponde a Piaractus orinoquensis.",
      "introducedDistribution": "",
      "habitat": "Ríos tropicales de la cuenca amazónica.",
      "diet": "Insectos y material vegetal.",
      "description": "Pez amazónico de cuerpo profundo, importante en la alimentación y acuicultura regional.",
      "curiosities": [
        "No debe confundirse con la especie del Orinoco Piaractus orinoquensis."
      ],
      "size": {
        "value": 88,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Piaractus-brachypomus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Piaractus brachypomus",
          "url": "https://www.fishbase.se/summary/Piaractus-brachypomus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "habitat",
            "diet",
            "description",
            "size"
          ]
        },
        {
          "title": "Redescripción de Piaractus brachypomus (2019)",
          "url": "https://pubmed.ncbi.nlm.nih.gov/31017302/",
          "fields": [
            "scientificName",
            "nativeDistribution",
            "regions",
            "curiosities"
          ],
          "accessedAt": "2026-10-13"
        },
        {
          "title": "IIAP: memoria institucional 2018",
          "url": "https://www.iiap.gob.pe/Archivos/Publicaciones/Publicacion_3838.pdf",
          "fields": [
            "name"
          ],
          "accessedAt": "2026-10-13"
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "boquichico",
      "scientificName": "Prochilodus nigricans",
      "name": "Boquichico",
      "alternativeNames": [],
      "family": "Prochilodontidae",
      "order": "Characiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "Cuencas del Amazonas y del Tocantins.",
      "introducedDistribution": "",
      "habitat": "Ríos tropicales de agua dulce.",
      "diet": "Detritos.",
      "description": "Pez de cuerpo fusiforme que se desplaza dentro de las cuencas fluviales.",
      "curiosities": [
        "Sus migraciones ocurren dentro del agua dulce."
      ],
      "size": {
        "value": 52.5,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Prochilodus-nigricans.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Prochilodus nigricans",
          "url": "https://www.fishbase.se/summary/Prochilodus-nigricans.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "description",
            "curiosities",
            "size"
          ]
        },
        {
          "title": "IIAP: memoria institucional 2018",
          "url": "https://www.iiap.gob.pe/Archivos/Publicaciones/Publicacion_3838.pdf",
          "fields": [
            "name",
            "diet"
          ],
          "accessedAt": "2026-10-13"
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "arahuana-plateada",
      "scientificName": "Osteoglossum bicirrhosum",
      "name": "Arahuana plateada",
      "alternativeNames": [],
      "family": "Osteoglossidae",
      "order": "Osteoglossiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "Cuenca del Amazonas y ríos Rupununi y Oyapock.",
      "introducedDistribution": "",
      "habitat": "Aguas tropicales continentales; busca alimento cerca de la superficie.",
      "diet": "Peces e insectos, entre otros alimentos.",
      "description": "Pez alargado y plateado con grandes escamas y dos barbillas en la mandíbula.",
      "curiosities": [
        "El macho protege huevos y crías en su boca."
      ],
      "size": {
        "value": 90,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Osteoglossum-bicirrhosum.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Osteoglossum bicirrhosum",
          "url": "https://www.fishbase.se/summary/Osteoglossum-bicirrhosum.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "anguila-electrica",
      "scientificName": "Electrophorus electricus",
      "name": "Anguila eléctrica",
      "alternativeNames": [],
      "family": "Gymnotidae",
      "order": "Gymnotiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "south-america"
      ],
      "nativeDistribution": "Escudo Guayanés.",
      "introducedDistribution": "",
      "habitat": "Arroyos, pantanos y aguas tranquilas con fondos fangosos.",
      "diet": "Invertebrados cuando es joven; peces y pequeños mamíferos de adulta.",
      "description": "Pez de cuerpo alargado que produce descargas eléctricas.",
      "curiosities": [
        "Utiliza órganos eléctricos tanto para percibir su entorno como para capturar presas."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Electrophorus electricus",
          "url": "https://www.fishbase.se/summary/Electrophorus-electricus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "tilapia-del-nilo",
      "scientificName": "Oreochromis niloticus",
      "name": "Tilapia del Nilo",
      "alternativeNames": [],
      "family": "",
      "order": "",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "africa",
        "asia"
      ],
      "nativeDistribution": "Partes de África y del Levante, incluidos Israel y Líbano.",
      "introducedDistribution": "Introducida para cultivo, entre otros países, en Tailandia, Filipinas, Brasil, Estados Unidos y China.",
      "habitat": "Aguas tropicales poco profundas.",
      "diet": "Fitoplancton, algas adheridas, plantas acuáticas, pequeños invertebrados y detritos.",
      "description": "Pez omnívoro ampliamente utilizado en acuicultura.",
      "curiosities": [
        "La hembra recoge los huevos fecundados y los incuba en la boca."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "FAO: tilapia del Nilo",
          "url": "https://www.fao.org/fishery/docs/DOCUMENT/aquaculture/CulturedSpecies/file/en/en_niletilapia.htm",
          "fields": [
            "scientificName",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "introducedDistribution"
          ],
          "accessedAt": "2026-10-13"
        },
        {
          "title": "FAO AGROVOC: Oreochromis niloticus",
          "url": "https://agrovoc.fao.org/browse/agrovoc/en/page/c_34687",
          "fields": [
            "nativeDistribution",
            "regions"
          ],
          "accessedAt": "2026-10-13"
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "pez-pulmonado-africano",
      "scientificName": "Protopterus annectens",
      "name": "Pez pulmonado africano",
      "alternativeNames": [],
      "family": "Protopteridae",
      "order": "Ceratodontiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "africa"
      ],
      "nativeDistribution": "Grandes cuencas del Sahel y otras cuencas de África occidental y austral.",
      "introducedDistribution": "",
      "habitat": "Pantanos, remansos y llanuras inundables.",
      "diet": "Moluscos, peces y ranas; también material vegetal.",
      "description": "Pez alargado con aletas pares finas y capacidad de respirar aire.",
      "curiosities": [
        "Cuando se seca su hábitat puede permanecer dentro de un capullo de mucosidad."
      ],
      "size": {
        "value": 100,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Protopterus-annectens.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Protopterus annectens",
          "url": "https://www.fishbase.se/summary/Protopterus-annectens.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "perca-del-nilo",
      "scientificName": "Lates niloticus",
      "name": "Perca del Nilo",
      "alternativeNames": [],
      "family": "Latidae",
      "order": "",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "africa"
      ],
      "nativeDistribution": "Cuencas del Nilo, Senegal, Níger, Volta, Chad y Congo; lagos como Alberto y Turkana.",
      "introducedDistribution": "",
      "habitat": "Canales fluviales y lagos; los adultos ocupan aguas profundas.",
      "diet": "Principalmente peces; los juveniles consumen plancton.",
      "description": "Gran depredador africano cuya distribución nativa debe distinguirse de las introducciones.",
      "curiosities": [
        "Los juveniles ocupan aguas más someras que los adultos."
      ],
      "size": {
        "value": 200,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Lates-niloticus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Lates niloticus",
          "url": "https://www.fishbase.se/summary/Lates-niloticus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "pez-cebra",
      "scientificName": "Danio rerio",
      "name": "Pez cebra",
      "alternativeNames": [],
      "family": "Danionidae",
      "order": "Cypriniformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "asia"
      ],
      "nativeDistribution": "Pakistán, India, Bangladés, Nepal y Myanmar.",
      "introducedDistribution": "",
      "habitat": "Arroyos, canales, estanques y arrozales con agua lenta.",
      "diet": "Gusanos, pequeños crustáceos y larvas de insectos.",
      "description": "Pequeño pez de aguas continentales del sur de Asia.",
      "curiosities": [
        "Puede reproducirse a lo largo del año."
      ],
      "size": {
        "value": 3.8,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Danio-rerio.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Danio rerio",
          "url": "https://www.fishbase.se/summary/Danio-rerio.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "gurami-de-tres-puntos",
      "scientificName": "Trichopodus trichopterus",
      "name": "Gurami de tres puntos",
      "alternativeNames": [],
      "family": "Osphronemidae",
      "order": "Anabantiformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "asia"
      ],
      "nativeDistribution": "Sudeste asiático, incluida la cuenca del Mekong.",
      "introducedDistribution": "",
      "habitat": "Humedales, pantanos y canales con vegetación y agua lenta.",
      "diet": "Zooplancton, crustáceos y larvas de insectos.",
      "description": "Pez de cuerpo comprimido que habita aguas tropicales tranquilas.",
      "curiosities": [
        "El macho construye y cuida un nido de burbujas."
      ],
      "size": {
        "value": 15,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Trichopodus-trichopterus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Trichopodus trichopterus",
          "url": "https://www.fishbase.se/summary/Trichopodus-trichopterus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "cabeza-de-serpiente-rayada",
      "scientificName": "Channa striata",
      "name": "Cabeza de serpiente rayada",
      "alternativeNames": [],
      "family": "Channidae",
      "order": "Anabantiformes",
      "environments": [
        "freshwater",
        "brackish"
      ],
      "regions": [
        "asia"
      ],
      "nativeDistribution": "Desde Pakistán hasta Tailandia y el sur de China.",
      "introducedDistribution": "",
      "habitat": "Pantanos, ríos de llanura, estanques y canales de agua lenta.",
      "diet": "Peces, anfibios, insectos y crustáceos.",
      "description": "Depredador alargado, con cabeza ancha y boca grande.",
      "curiosities": [
        "Puede respirar aire y sobrevivir en barro húmedo durante períodos secos."
      ],
      "size": {
        "value": 100,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Channa-striata.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Channa striata",
          "url": "https://www.fishbase.se/summary/Channa-striata.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "panga",
      "scientificName": "Pangasianodon hypophthalmus",
      "name": "Panga",
      "alternativeNames": [],
      "family": "Pangasiidae",
      "order": "Siluriformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "asia"
      ],
      "nativeDistribution": "Cuencas del Mekong, Chao Phraya y Maeklong.",
      "introducedDistribution": "Introducido en otras cuencas fluviales para acuicultura; la fuente consultada no detalla todos los destinos.",
      "habitat": "Grandes ríos tropicales y áreas inundadas.",
      "diet": "Peces, crustáceos y restos vegetales.",
      "description": "Bagre migratorio que se desplaza entre los ríos y sus áreas inundables.",
      "curiosities": [
        "Su coloración cambia: los jóvenes tienen franjas oscuras y los adultos grandes son grises."
      ],
      "size": {
        "value": 130,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Pangasianodon-hypophthalmus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Pangasianodon hypophthalmus",
          "url": "https://www.fishbase.se/summary/Pangasianodon-hypophthalmus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "lucio",
      "scientificName": "Esox lucius",
      "name": "Lucio",
      "alternativeNames": [],
      "family": "Esocidae",
      "order": "Esociformes",
      "environments": [
        "freshwater",
        "brackish"
      ],
      "regions": [
        "north-america",
        "europe",
        "asia"
      ],
      "nativeDistribution": "Aguas continentales de Norteamérica y Eurasia; distribución circumpolar.",
      "introducedDistribution": "",
      "habitat": "Lagos con vegetación, remansos y ríos; también aguas salobres del Báltico.",
      "diet": "Principalmente peces; también ranas y cangrejos de río.",
      "description": "Depredador alargado con hocico aplanado y dientes grandes.",
      "curiosities": [
        "Suele ser solitario y territorial."
      ],
      "size": {
        "value": 150,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Esox-lucius.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Esox lucius",
          "url": "https://www.fishbase.se/summary/Esox-lucius.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "perca-europea",
      "scientificName": "Perca fluviatilis",
      "name": "Perca europea",
      "alternativeNames": [],
      "family": "Percidae",
      "order": "Perciformes",
      "environments": [
        "freshwater",
        "brackish"
      ],
      "regions": [
        "europe",
        "asia"
      ],
      "nativeDistribution": "Gran parte de Europa y cuencas de Siberia hasta el río Kolyma; no toda Europa es nativa.",
      "introducedDistribution": "",
      "habitat": "Lagos, lagunas estuarinas y ríos medianos.",
      "diet": "Invertebrados y peces; las larvas consumen plancton.",
      "description": "Depredador oportunista de una amplia variedad de ambientes continentales.",
      "curiosities": [
        "Los jóvenes cambian de alimento conforme crecen."
      ],
      "size": {
        "value": 60,
        "unit": "cm",
        "type": "maximum",
        "measurement": "SL",
        "sourceUrl": "https://www.fishbase.se/summary/Perca-fluviatilis.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Perca fluviatilis",
          "url": "https://www.fishbase.se/summary/Perca-fluviatilis.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "salmon-del-atlantico",
      "scientificName": "Salmo salar",
      "name": "Salmón del Atlántico",
      "alternativeNames": [],
      "family": "",
      "order": "",
      "environments": [
        "freshwater",
        "brackish",
        "marine"
      ],
      "regions": [
        "north-america",
        "europe",
        "atlantic"
      ],
      "nativeDistribution": "Atlántico norte y ríos asociados de Norteamérica, Groenlandia, Islandia, Europa y Rusia.",
      "introducedDistribution": "",
      "habitat": "Ríos fríos con grava, estuarios y mar abierto.",
      "diet": "Insectos e invertebrados de joven; peces en la etapa adulta marina.",
      "description": "Pez migratorio que nace en ríos, crece en el océano y retorna al agua dulce para reproducirse.",
      "curiosities": [
        "El paso por los estuarios acompaña su adaptación fisiológica a la salinidad."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "NOAA: ciencia del salmón del Atlántico",
          "url": "https://www.fisheries.noaa.gov/species/atlantic-salmon/science",
          "fields": [
            "scientificName",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ],
          "accessedAt": "2026-10-13"
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "bagre-de-canal",
      "scientificName": "Ictalurus punctatus",
      "name": "Bagre de canal",
      "alternativeNames": [],
      "family": "Ictaluridae",
      "order": "Siluriformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "north-america"
      ],
      "nativeDistribution": "Cuencas de San Lorenzo, Grandes Lagos, río Rojo y Missouri-Mississippi.",
      "introducedDistribution": "Introducido en gran parte de Estados Unidos fuera de sus cuencas nativas.",
      "habitat": "Lagos y pozas profundas de ríos con fondos de arena o roca.",
      "diet": "Peces pequeños, crustáceos, moluscos e insectos acuáticos.",
      "description": "Bagre norteamericano que busca alimento en ambientes fluviales y lacustres.",
      "curiosities": [
        "Puede vivir tanto en ríos como en estanques y embalses."
      ],
      "size": {
        "value": 132,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Ictalurus-punctatus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Ictalurus punctatus",
          "url": "https://www.fishbase.se/summary/Ictalurus-punctatus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "pejelagarto-de-hocico-largo",
      "scientificName": "Lepisosteus osseus",
      "name": "Pejelagarto de hocico largo",
      "alternativeNames": [],
      "family": "Lepisosteidae",
      "order": "Lepisosteiformes",
      "environments": [
        "freshwater",
        "brackish"
      ],
      "regions": [
        "north-america"
      ],
      "nativeDistribution": "Este y centro de Norteamérica, incluidos Grandes Lagos, Mississippi y cuencas del golfo hasta México.",
      "introducedDistribution": "",
      "habitat": "Remansos, lagos y brazos de grandes ríos, frecuentemente cerca de vegetación.",
      "diet": "Peces y crustáceos.",
      "description": "Pez alargado con hocico muy estrecho y escamas óseas.",
      "curiosities": [
        "Puede respirar aire de forma facultativa."
      ],
      "size": {
        "value": 200,
        "unit": "cm",
        "type": "maximum",
        "measurement": "TL",
        "sourceUrl": "https://www.fishbase.se/summary/Lepisosteus-osseus.html"
      },
      "photo": null,
      "sources": [
        {
          "title": "FishBase: Lepisosteus osseus",
          "url": "https://www.fishbase.se/summary/Lepisosteus-osseus.html",
          "accessedAt": "2026-10-13",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "regions",
            "nativeDistribution",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "size"
          ]
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "carpa-comun",
      "scientificName": "Cyprinus carpio",
      "name": "Carpa común",
      "alternativeNames": [],
      "family": "Cyprinidae",
      "order": "Cypriniformes",
      "environments": [
        "freshwater"
      ],
      "regions": [
        "europe",
        "asia"
      ],
      "nativeDistribution": "Europa oriental y Asia; su larga historia de cultivo complica la delimitación precisa de algunas poblaciones.",
      "introducedDistribution": "Introducida en Inglaterra y Norteamérica; se cultiva y ha sido trasladada a numerosas regiones.",
      "habitat": "Lagos, embalses y ríos de corriente lenta con fondos blandos.",
      "diet": "Invertebrados del fondo, semillas y otros alimentos vegetales.",
      "description": "Omnívoro que busca alimento removiendo sedimentos.",
      "curiosities": [
        "Al alimentarse puede aumentar la turbidez del agua."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "Animal Diversity Web: Cyprinus carpio",
          "url": "https://animaldiversity.org/accounts/Cyprinus_carpio/",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "habitat",
            "diet",
            "description",
            "curiosities"
          ],
          "accessedAt": "2026-10-13"
        },
        {
          "title": "FAO: registro de introducciones",
          "url": "https://www.fao.org/4/x5628e/x5628e09.htm",
          "fields": [
            "nativeDistribution",
            "regions"
          ],
          "accessedAt": "2026-10-13"
        },
        {
          "title": "FAO: historia del cultivo de la carpa",
          "url": "https://www.fao.org/4/Y2406E/y2406e02.htm",
          "fields": [
            "introducedDistribution"
          ],
          "accessedAt": "2026-10-13"
        }
      ],
      "reviewedAt": "2026-10-13"
    },
    {
      "id": "anguila-europea",
      "scientificName": "Anguilla anguilla",
      "name": "Anguila europea",
      "alternativeNames": [],
      "family": "Anguillidae",
      "order": "Anguilliformes",
      "environments": [
        "freshwater",
        "brackish",
        "marine"
      ],
      "regions": [
        "europe",
        "africa",
        "atlantic"
      ],
      "nativeDistribution": "Costas y aguas continentales accesibles de Europa y norte de África; Atlántico y mar de los Sargazos.",
      "introducedDistribution": "",
      "habitat": "Ríos, estuarios y ambientes marinos según su etapa de vida.",
      "diet": "Invertebrados acuáticos, peces y carroña.",
      "description": "Pez alargado que utiliza ambientes con distintas salinidades a lo largo de su vida.",
      "curiosities": [
        "La reproducción está vinculada al mar de los Sargazos."
      ],
      "size": null,
      "photo": null,
      "sources": [
        {
          "title": "Animal Diversity Web: Anguilla anguilla",
          "url": "https://animaldiversity.org/accounts/Anguilla_anguilla/",
          "fields": [
            "scientificName",
            "family",
            "order",
            "environments",
            "habitat",
            "diet",
            "description",
            "curiosities",
            "nativeDistribution",
            "regions"
          ],
          "accessedAt": "2026-10-13"
        }
      ],
      "reviewedAt": "2026-10-13"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) module.exports = AtlasCatalog;
