import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

type Translations = {
  pl: { name: string; description?: string }
  en: { name: string; description?: string }
  de: { name: string; description?: string }
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const CATEGORIES = [
  {
    slug: 'zadaszenia',
    order: 1,
    translations: {
      pl: { name: 'Zadaszenia' },
      en: { name: 'Patio Covers' },
      de: { name: 'Terrassenüberdachungen' },
    },
  },
  {
    slug: 'aluminium-szklo',
    order: 2,
    translations: {
      pl: { name: 'Aluminium & Szkło' },
      en: { name: 'Aluminium & Glass' },
      de: { name: 'Aluminium & Glas' },
    },
  },
  {
    slug: 'rozwiazania-przeciwsloneczne',
    order: 3,
    translations: {
      pl: { name: 'Rozwiązania Przeciwsłoneczne' },
      en: { name: 'Sun Protection Systems' },
      de: { name: 'Sonnenschutzsysteme' },
    },
  },
  {
    slug: 'oslony-rolety',
    order: 4,
    translations: {
      pl: { name: 'Osłony i Rolety' },
      en: { name: 'Screens & Blinds' },
      de: { name: 'Screens & Rollläden' },
    },
  },
  {
    slug: 'ogrodzenia-bramy',
    order: 5,
    translations: {
      pl: { name: 'Ogrodzenia i Bramy' },
      en: { name: 'Fences & Gates' },
      de: { name: 'Zäune & Tore' },
    },
  },
  {
    slug: 'stolarka-aluminiowa',
    order: 6,
    translations: {
      pl: { name: 'Stolarka Aluminiowa' },
      en: { name: 'Aluminium Joinery' },
      de: { name: 'Aluminiumfenster & Türen' },
    },
  },
  {
    slug: 'elewacje-panele',
    order: 7,
    translations: {
      pl: { name: 'Elewacje i Panele' },
      en: { name: 'Facades & Panels' },
      de: { name: 'Fassaden & Paneele' },
    },
  },
]

const PRODUCTS: Array<{
  categorySlug: string
  slug: string
  order: number
  imageUrl: string
  translations: Translations
}> = [
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-solid',
      order: 1,
      imageUrl: '/products/image1.png',
      translations: {
        pl: {
          name: 'VS Solid',
          description:
            'Klasyczna pergola aluminiowa o solidnej konstrukcji i ponadczasowym designie. Zapewnia ochronę przed deszczem i słońcem przez cały rok. Dostępna w wielu kolorach RAL. Idealna do domów jednorodzinnych i obiektów komercyjnych.',
        },
        en: {
          name: 'VS Solid',
          description:
            'A classic aluminium pergola with a solid structure and timeless design. It provides year-round protection from rain and sun. Available in many RAL colours. Ideal for private homes and commercial properties.',
        },
        de: {
          name: 'VS Solid',
          description:
            'Eine klassische Aluminiumpergola mit stabiler Konstruktion und zeitlosem Design. Sie bietet ganzjährigen Schutz vor Regen und Sonne. In vielen RAL-Farben erhältlich. Ideal für Einfamilienhäuser und gewerbliche Objekte.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-bold',
      order: 2,
      imageUrl: '/products/image2.png',
      translations: {
        pl: {
          name: 'VS Bold',
          description:
            'Nowoczesna pergola o pogrubionej ramie i wyraźnych liniach. Masywna bryła nadaje realizacjom ekskluzywny charakter. System kompatybilny z przeszkleniami i oświetleniem LED. Doskonała do dużych tarasów i powierzchni handlowych.',
        },
        en: {
          name: 'VS Bold',
          description:
            'A modern pergola with a bold frame and clean architectural lines. Its solid form gives every project an exclusive character. Compatible with glass walls and LED lighting. Perfect for large terraces and commercial areas.',
        },
        de: {
          name: 'VS Bold',
          description:
            'Eine moderne Pergola mit verstärktem Rahmen und klaren Linien. Die massive Form verleiht Projekten einen exklusiven Charakter. Kompatibel mit Verglasungen und LED-Beleuchtung. Ideal für große Terrassen und Gewerbeflächen.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-cube',
      order: 3,
      imageUrl: '/products/image3.png',
      translations: {
        pl: {
          name: 'VS Cube',
          description:
            'Nowoczesna pergola aluminiowa o płaskiej linii dachu i ukrytym spadku. Dzięki dużym profilom oraz minimalistycznej bryle konstrukcja prezentuje się bardzo elegancko i luksusowo. System zapewnia wysoką stabilność, możliwość rozbudowy o przeszklenia, ZIP Screeny oraz oświetlenie LED. Idealny wybór dla nowoczesnych domów i prestiżowych realizacji.',
        },
        en: {
          name: 'VS Cube',
          description:
            'A modern aluminium pergola with a flat roofline and hidden slope. Large profiles and a minimalist shape create an elegant, luxurious appearance. The system offers high stability and can be expanded with glass walls, ZIP screens and LED lighting. An ideal choice for modern homes and prestigious projects.',
        },
        de: {
          name: 'VS Cube',
          description:
            'Eine moderne Aluminiumpergola mit flacher Dachlinie und verstecktem Gefälle. Große Profile und die minimalistische Form sorgen für eine elegante und luxuriöse Optik. Das System bietet hohe Stabilität und kann mit Glaswänden, ZIP-Screens und LED-Beleuchtung erweitert werden. Ideal für moderne Häuser und repräsentative Projekte.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-cube-grand',
      order: 4,
      imageUrl: '/products/image4.png',
      translations: {
        pl: {
          name: 'VS Cube Grand',
          description:
            'Rozszerzona wersja VS Cube przeznaczona do dużych powierzchni. Wzmocniona konstrukcja umożliwia zadaszycie przestrzeni powyżej 100 m². Opcjonalne przeszklenia boczne i dach fotowoltaiczny. Prestiżowe rozwiązanie dla hoteli i centrów komercyjnych.',
        },
        en: {
          name: 'VS Cube Grand',
          description:
            'An extended version of VS Cube designed for large spaces. The reinforced structure allows roofing of areas over 100 m². Optional side glazing and photovoltaic roof solutions are available. A prestigious system for hotels and commercial centres.',
        },
        de: {
          name: 'VS Cube Grand',
          description:
            'Eine erweiterte Version von VS Cube für große Flächen. Die verstärkte Konstruktion ermöglicht Überdachungen von über 100 m². Optionale Seitenverglasungen und Photovoltaik-Dachlösungen sind verfügbar. Eine repräsentative Lösung für Hotels und Gewerbezentren.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-carport',
      order: 5,
      imageUrl: '/products/image5.png',
      translations: {
        pl: {
          name: 'VS Carport',
          description:
            'Aluminiowe zadaszenie garażowe łączące funkcjonalność z estetyką. Chroni pojazdy przed warunkami atmosferycznymi przez cały rok. Dostępne w wersjach jedno- i dwustanowiskowych. Trwała konstrukcja odporna na wiatr i obciążenia śniegiem.',
        },
        en: {
          name: 'VS Carport',
          description:
            'An aluminium carport combining functionality with elegant design. It protects vehicles from weather conditions all year round. Available as single or double parking structures. Durable construction resistant to wind and snow loads.',
        },
        de: {
          name: 'VS Carport',
          description:
            'Ein Aluminium-Carport, der Funktionalität mit Ästhetik verbindet. Er schützt Fahrzeuge das ganze Jahr über vor Witterungseinflüssen. Als Einzel- oder Doppelcarport erhältlich. Robuste Konstruktion mit hoher Wind- und Schneelastbeständigkeit.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-prime',
      order: 6,
      imageUrl: '/products/image6.png',
      translations: {
        pl: {
          name: 'VS Prime',
          description:
            'Pergola premium z dachem lamellowym umożliwiającym regulację nasłonecznienia. Aluminiowe lamele obracają się o 140°, zapewniając pełną kontrolę nad dostępem światła i wentylacji. System z wbudowanym odwodnieniem i oświetleniem LED w lamelach.',
        },
        en: {
          name: 'VS Prime',
          description:
            'A premium pergola with a louvered roof that allows precise sunlight control. Aluminium louvers rotate up to 140°, providing full control over light and ventilation. The system includes integrated drainage and LED lighting in the louvers.',
        },
        de: {
          name: 'VS Prime',
          description:
            'Eine Premium-Pergola mit Lamellendach zur präzisen Regulierung von Sonne und Schatten. Die Aluminiumlamellen drehen sich bis zu 140° und ermöglichen volle Kontrolle über Licht und Belüftung. Mit integrierter Entwässerung und LED-Beleuchtung in den Lamellen.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-dynamic',
      order: 7,
      imageUrl: '/products/image7.png',
      translations: {
        pl: {
          name: 'VS Dynamic',
          description:
            'Dynamiczna pergola z ruchomym dachem przesuwnym. Możliwość szybkiego otwierania i zamykania przestrzeni w zależności od warunków pogodowych. Napęd elektryczny z pilotem lub aplikacją mobilną. Kompatybilna z czujnikami deszczu i wiatru.',
        },
        en: {
          name: 'VS Dynamic',
          description:
            'A dynamic pergola with a movable sliding roof. The space can be opened or closed quickly depending on weather conditions. Electric drive with remote control or mobile app. Compatible with rain and wind sensors.',
        },
        de: {
          name: 'VS Dynamic',
          description:
            'Eine dynamische Pergola mit beweglichem Schiebedach. Der Bereich kann je nach Wetterlage schnell geöffnet oder geschlossen werden. Elektrischer Antrieb mit Fernbedienung oder mobiler App. Kompatibel mit Regen- und Windsensoren.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-advanced',
      order: 8,
      imageUrl: '/products/image8.png',
      translations: {
        pl: {
          name: 'VS Advanced',
          description:
            'Zaawansowany system zadaszenia z dachem modułowym. Łączy elementy pergoli lamellowej i szklanej w jednej konstrukcji. Możliwość integracji z systemami smart home. Wysoki standard wykończenia dla wymagających klientów.',
        },
        en: {
          name: 'VS Advanced',
          description:
            'An advanced roofing system with a modular roof. It combines features of louvered and glass pergolas in one structure. Can be integrated with smart home systems. High-end finish for demanding customers.',
        },
        de: {
          name: 'VS Advanced',
          description:
            'Ein fortschrittliches Überdachungssystem mit modularem Dach. Es kombiniert Elemente einer Lamellenpergola und einer Glasüberdachung in einer Konstruktion. Integration in Smart-Home-Systeme möglich. Hochwertige Ausführung für anspruchsvolle Kunden.',
        },
      },
    },
    {
      categorySlug: 'zadaszenia',
      slug: 'vs-adaptive',
      order: 9,
      imageUrl: '/products/image9.png',
      translations: {
        pl: {
          name: 'VS Adaptive',
          description:
            'Elastyczny system zadaszenia dostosowujący się do różnych kształtów budynków. Idealne rozwiązanie dla nieregularnych tarasów i atriów. Modułowa budowa umożliwia rozbudowę bez konieczności demontażu. Dostępna w szerokiej gamie kolorów i wykończeń.',
        },
        en: {
          name: 'VS Adaptive',
          description:
            'A flexible roofing system that adapts to different building shapes. Ideal for irregular terraces and atriums. Modular construction allows future expansion without full dismantling. Available in a wide range of colours and finishes.',
        },
        de: {
          name: 'VS Adaptive',
          description:
            'Ein flexibles Überdachungssystem, das sich an verschiedene Gebäudeformen anpasst. Ideal für unregelmäßige Terrassen und Atrien. Die modulare Bauweise ermöglicht spätere Erweiterungen ohne vollständige Demontage. In vielen Farben und Ausführungen erhältlich.',
        },
      },
    },

    {
      categorySlug: 'aluminium-szklo',
      slug: 'sliding-walls',
      order: 1,
      imageUrl: '/products/image10.png',
      translations: {
        pl: {
          name: 'Ściany przesuwne',
          description:
            'Przesuwne ściany aluminiowo-szklane tworzące elastyczną przestrzeń. Idealne do zamykania tarasów, pergoli i werand. Systemy bezramkowe i ramkowe dostępne w różnych konfiguracjach. Wysoka izolacyjność termiczna i akustyczna.',
        },
        en: {
          name: 'Sliding Walls',
          description:
            'Sliding aluminium and glass walls that create a flexible living space. Ideal for enclosing terraces, pergolas and verandas. Frameless and framed systems are available in various configurations. High thermal and acoustic comfort.',
        },
        de: {
          name: 'Schiebewände',
          description:
            'Schiebbare Aluminium-Glas-Wände für flexible Raumgestaltung. Ideal zum Schließen von Terrassen, Pergolen und Veranden. Rahmenlose und gerahmte Systeme in verschiedenen Konfigurationen erhältlich. Hoher Wärme- und Schallschutzkomfort.',
        },
      },
    },
    {
      categorySlug: 'aluminium-szklo',
      slug: 'sliding-doors',
      order: 2,
      imageUrl: '/products/image11.png',
      translations: {
        pl: {
          name: 'Drzwi przesuwne',
          description:
            'Aluminiowe drzwi przesuwne o dużych przeszkleniach. Płynne prowadzenie i minimalne progi zapewniają komfort użytkowania. Dostępne w wersjach 2-, 3- i 4-skrzydłowych. Kompatybilne z systemami antywłamaniowymi.',
        },
        en: {
          name: 'Sliding Doors',
          description:
            'Aluminium sliding doors with large glass surfaces. Smooth operation and minimal thresholds ensure comfortable everyday use. Available in 2-, 3- and 4-panel versions. Compatible with anti-burglary systems.',
        },
        de: {
          name: 'Schiebetüren',
          description:
            'Aluminium-Schiebetüren mit großen Glasflächen. Leichtgängige Führung und niedrige Schwellen sorgen für hohen Bedienkomfort. Erhältlich als 2-, 3- und 4-flügelige Systeme. Kompatibel mit Einbruchschutzsystemen.',
        },
      },
    },
    {
      categorySlug: 'aluminium-szklo',
      slug: 'guillotine',
      order: 3,
      imageUrl: '/products/image12.png',
      translations: {
        pl: {
          name: 'Gilotyna szklana',
          description:
            'Pionowo przesuwne szyby gilotynowe do zamykania przestrzeni bez widocznych ram. Idealne do restauracji, hoteli i ekskluzywnych obiektów. Szybkie i ciche działanie napędu elektrycznego. Szkło hartowane ESG o grubości 8–12 mm.',
        },
        en: {
          name: 'Guillotine Glass System',
          description:
            'Vertically sliding guillotine glass panels for enclosing spaces without visible frames. Ideal for restaurants, hotels and premium properties. Fast and quiet electric operation. Tempered ESG glass, 8–12 mm thick.',
        },
        de: {
          name: 'Guillotine-Glassystem',
          description:
            'Vertikal verschiebbare Guillotine-Glaselemente zum Schließen von Bereichen ohne sichtbare Rahmen. Ideal für Restaurants, Hotels und exklusive Objekte. Schneller und leiser Elektroantrieb. ESG-Sicherheitsglas mit 8–12 mm Stärke.',
        },
      },
    },
    {
      categorySlug: 'aluminium-szklo',
      slug: 'fixed-wall-systems',
      order: 4,
      imageUrl: '/products/image13.png',
      translations: {
        pl: {
          name: 'Stałe ściany szklane',
          description:
            'Stałe ściany szklane w aluminiowej ramie do trwałego zamykania przestrzeni. Wysoka odporność na warunki atmosferyczne. Możliwość montażu drzwi wejściowych i okien uchylnych. Dostępne w wersji z ciepłą i zimną ramą.',
        },
        en: {
          name: 'Fixed Glass Wall Systems',
          description:
            'Fixed glass walls in aluminium frames for permanent enclosure of spaces. High resistance to weather conditions. Entrance doors and tilt windows can be integrated. Available with warm and cold frame systems.',
        },
        de: {
          name: 'Feste Glaswandsysteme',
          description:
            'Feste Glaswände in Aluminiumrahmen zur dauerhaften Schließung von Bereichen. Hohe Witterungsbeständigkeit. Eingangstüren und Kippfenster können integriert werden. Mit warmen und kalten Rahmensystemen erhältlich.',
        },
      },
    },

    {
      categorySlug: 'rozwiazania-przeciwsloneczne',
      slug: 'vs-sun-shading',
      order: 1,
      imageUrl: '/products/image14.png',
      translations: {
        pl: {
          name: 'VS Ochrona przeciwsłoneczna',
          description:
            'Zewnętrzne żaluzje fasadowe chroniące przed nadmiernym nasłonecznieniem. Redukują nagrzewanie pomieszczeń i obniżają koszty klimatyzacji. Dostępne w wersjach ręcznych i elektrycznych. Szerokie możliwości personalizacji koloru i materiału.',
        },
        en: {
          name: 'VS Sun Shading',
          description:
            'External facade shading systems that protect interiors from excessive sunlight. They reduce room overheating and help lower air-conditioning costs. Available in manual and electric versions. Wide options for colour and fabric personalisation.',
        },
        de: {
          name: 'VS Sonnenschutz',
          description:
            'Außenliegende Fassaden-Sonnenschutzsysteme zum Schutz vor übermäßiger Sonneneinstrahlung. Sie reduzieren die Aufheizung von Räumen und senken Klimatisierungskosten. In manueller und elektrischer Ausführung erhältlich. Große Auswahl an Farben und Materialien.',
        },
      },
    },
    {
      categorySlug: 'rozwiazania-przeciwsloneczne',
      slug: 'vs-under-roof-shading',
      order: 2,
      imageUrl: '/products/image15.png',
      translations: {
        pl: {
          name: 'VS Markiza poddachowa',
          description:
            'Markizy podpergolowe montowane pod dachem lamellowym lub szklanym. Zapewniają cień bez konieczności zamykania dachu. Tkaniny odporne na UV i opady deszczu. Napęd elektryczny z automatyką pogodową.',
        },
        en: {
          name: 'VS Under-Roof Shading',
          description:
            'Under-roof awnings installed beneath louvered or glass roofs. They provide shade without closing the roof. UV- and rain-resistant fabrics. Electric drive with optional weather automation.',
        },
        de: {
          name: 'VS Unterdachbeschattung',
          description:
            'Unterdachmarkisen für Lamellen- oder Glasdächer. Sie spenden Schatten, ohne das Dach schließen zu müssen. UV- und regenbeständige Stoffe. Elektrischer Antrieb mit optionaler Wetterautomatik.',
        },
      },
    },
    {
      categorySlug: 'rozwiazania-przeciwsloneczne',
      slug: 'screens',
      order: 3,
      imageUrl: '/products/image16.png',
      translations: {
        pl: {
          name: 'Screeny ZIP',
          description:
            'ZIP Screeny i rolety zewnętrzne eliminujące odblaski i nadmierne ciepło. System prowadzenia ZIP gwarantuje stabilność nawet przy silnym wietrze. Dostępne jako markizy wolnostojące lub do integracji z pergolą. Bogata gama tkanin technicznych.',
        },
        en: {
          name: 'ZIP Screens',
          description:
            'ZIP screens and external blinds that reduce glare and excessive heat. The ZIP guide system ensures stability even in strong wind. Available as standalone shading systems or for integration with pergolas. Wide range of technical fabrics.',
        },
        de: {
          name: 'ZIP-Screens',
          description:
            'ZIP-Screens und Außenrollos zur Reduzierung von Blendung und übermäßiger Hitze. Das ZIP-Führungssystem sorgt auch bei starkem Wind für Stabilität. Als eigenständige Beschattung oder zur Integration in Pergolen erhältlich. Große Auswahl technischer Gewebe.',
        },
      },
    },

    {
      categorySlug: 'oslony-rolety',
      slug: 'rolety-zewnetrzne',
      order: 1,
      imageUrl: '/products/image17.png',
      translations: {
        pl: {
          name: 'Rolety zewnętrzne VS',
          description:
            'Aluminiowe rolety zewnętrzne zapewniające ochronę przed słońcem, wiatrem i włamaniem. Pancerz rolety wykonany z wysokiej jakości profili aluminiowych. Napęd elektryczny z możliwością integracji z systemem smart home. Dostępne w ponad 200 kolorach RAL.',
        },
        en: {
          name: 'VS External Roller Shutters',
          description:
            'Aluminium external roller shutters that protect against sun, wind and intrusion. The shutter curtain is made from high-quality aluminium profiles. Electric drive with smart home integration options. Available in over 200 RAL colours.',
        },
        de: {
          name: 'VS Außenrollläden',
          description:
            'Aluminium-Außenrollläden zum Schutz vor Sonne, Wind und Einbruch. Der Rollladenpanzer besteht aus hochwertigen Aluminiumprofilen. Elektrischer Antrieb mit Smart-Home-Integration möglich. In über 200 RAL-Farben erhältlich.',
        },
      },
    },

    {
      categorySlug: 'ogrodzenia-bramy',
      slug: 'vs-gates',
      order: 1,
      imageUrl: '/products/image18.png',
      translations: {
        pl: {
          name: 'VS Bramy',
          description:
            'Aluminiowe bramy wjazdowe przesuwne i dwuskrzydłowe w nowoczesnym designie. Trwała konstrukcja odporna na korozję i zmiany temperatury. Napęd elektryczny z pilotem, klawiaturą lub interkomem wideo. Możliwość malowania proszkowego w dowolnym kolorze RAL.',
        },
        en: {
          name: 'VS Gates',
          description:
            'Modern aluminium entrance gates in sliding and double-leaf versions. Durable construction resistant to corrosion and temperature changes. Electric drive with remote control, keypad or video intercom. Powder coating available in any RAL colour.',
        },
        de: {
          name: 'VS Tore',
          description:
            'Moderne Aluminium-Einfahrtstore als Schiebe- oder zweiflügelige Tore. Robuste Konstruktion, beständig gegen Korrosion und Temperaturschwankungen. Elektrischer Antrieb mit Fernbedienung, Tastatur oder Video-Gegensprechanlage. Pulverbeschichtung in jeder RAL-Farbe möglich.',
        },
      },
    },
    {
      categorySlug: 'ogrodzenia-bramy',
      slug: 'vs-fencing',
      order: 2,
      imageUrl: '/products/image19.png',
      translations: {
        pl: {
          name: 'VS Ogrodzenia',
          description:
            'Aluminiowe ogrodzenia panelowe o nowoczesnej estetyce. Długa żywotność bez konieczności malowania czy konserwacji. Dostępne w różnych wysokościach i rozstawach listew. Kompatybilne z bramami VS Gates.',
        },
        en: {
          name: 'VS Fencing',
          description:
            'Modern aluminium panel fencing with a clean architectural look. Long service life without painting or heavy maintenance. Available in different heights and slat spacing options. Compatible with VS Gates.',
        },
        de: {
          name: 'VS Zäune',
          description:
            'Moderne Aluminium-Panelzäune mit klarer architektonischer Optik. Lange Lebensdauer ohne Streichen oder aufwendige Wartung. In verschiedenen Höhen und Lamellenabständen erhältlich. Kompatibel mit VS Toren.',
        },
      },
    },
    {
      categorySlug: 'ogrodzenia-bramy',
      slug: 'vs-balustrade',
      order: 3,
      imageUrl: '/products/image20.png',
      translations: {
        pl: {
          name: 'VS Balustrady',
          description:
            'Aluminiowe balustrady tarasowe i balkonowe łączące bezpieczeństwo z estetyką. Dostępne w wersjach pełnych, z przeszkleniami i z linkami stalowymi. Odporność na korozję i warunki atmosferyczne. Certyfikowane zgodnie z normami europejskimi.',
        },
        en: {
          name: 'VS Balustrades',
          description:
            'Aluminium terrace and balcony balustrades combining safety with elegant design. Available as full-panel, glass or steel-cable versions. Resistant to corrosion and weather conditions. Certified according to European standards.',
        },
        de: {
          name: 'VS Geländer',
          description:
            'Aluminiumgeländer für Terrassen und Balkone, die Sicherheit mit Ästhetik verbinden. Als geschlossene, verglaste oder mit Edelstahlseilen ausgeführte Varianten erhältlich. Korrosions- und witterungsbeständig. Nach europäischen Normen zertifiziert.',
        },
      },
    },

    {
      categorySlug: 'stolarka-aluminiowa',
      slug: 'room-dividers',
      order: 1,
      imageUrl: '/products/image21.png',
      translations: {
        pl: {
          name: 'Ścianki działowe',
          description:
            'Aluminiowe ścianki działowe do aranżacji przestrzeni wewnętrznych i zewnętrznych. Lekka konstrukcja umożliwia łatwą rekonfigurację układu pomieszczeń. Dostępne z przeszkleniami, panelami pełnymi lub kombinowanymi. Szeroka gama wykończeń i kolorów.',
        },
        en: {
          name: 'Room Dividers',
          description:
            'Aluminium room dividers for interior and exterior space arrangement. Lightweight construction allows easy reconfiguration of layouts. Available with glass, full panels or mixed configurations. Wide range of finishes and colours.',
        },
        de: {
          name: 'Raumteiler',
          description:
            'Aluminium-Raumteiler für Innen- und Außenbereiche. Die leichte Konstruktion ermöglicht eine einfache Umgestaltung von Raumaufteilungen. Mit Glas, Vollpaneelen oder kombinierten Ausführungen erhältlich. Große Auswahl an Oberflächen und Farben.',
        },
      },
    },
    {
      categorySlug: 'stolarka-aluminiowa',
      slug: 'vs-doors',
      order: 2,
      imageUrl: '/products/image22.png',
      translations: {
        pl: {
          name: 'VS Drzwi',
          description:
            'Aluminiowe drzwi zewnętrzne o wysokich parametrach izolacyjności termicznej i akustycznej. Elegancki design z możliwością integracji z systemami kontroli dostępu. Dostępne w wersjach jednoskrzydłowych, dwuskrzydłowych i z doświetlami. Certyfikat RC2.',
        },
        en: {
          name: 'VS Doors',
          description:
            'Aluminium external doors with high thermal and acoustic insulation parameters. Elegant design with access control integration options. Available as single-leaf, double-leaf and sidelight versions. RC2 certification.',
        },
        de: {
          name: 'VS Türen',
          description:
            'Aluminium-Außentüren mit hoher Wärme- und Schalldämmung. Elegantes Design mit Möglichkeit zur Integration von Zutrittskontrollsystemen. Als einflügelige, zweiflügelige und mit Seitenteilen ausgeführte Varianten erhältlich. RC2-Zertifizierung.',
        },
      },
    },
    {
      categorySlug: 'stolarka-aluminiowa',
      slug: 'vs-windows',
      order: 3,
      imageUrl: '/products/image23.png',
      translations: {
        pl: {
          name: 'VS Okna',
          description:
            'Aluminiowe okna o smukłych profilach i dużych powierzchniach przeszkleń. Wysoka izolacyjność termiczna Uf ≤ 1,0 W/m²K. Dostępne w wersjach rozwierno-uchylnych, przesuwnych i stałych. Opcjonalne pakiety antywłamaniowe i akustyczne.',
        },
        en: {
          name: 'VS Windows',
          description:
            'Aluminium windows with slim profiles and large glass surfaces. High thermal insulation with Uf ≤ 1.0 W/m²K. Available as tilt-and-turn, sliding and fixed windows. Optional anti-burglary and acoustic packages.',
        },
        de: {
          name: 'VS Fenster',
          description:
            'Aluminiumfenster mit schlanken Profilen und großen Glasflächen. Hohe Wärmedämmung mit Uf ≤ 1,0 W/m²K. Als Dreh-Kipp-, Schiebe- und Festverglasung erhältlich. Optionale Einbruchschutz- und Schallschutzpakete.',
        },
      },
    },

    {
      categorySlug: 'elewacje-panele',
      slug: 'vs-facade-cladding',
      order: 1,
      imageUrl: '/products/image24.png',
      translations: {
        pl: {
          name: 'VS Elewacje',
          description:
            'Aluminiowe systemy elewacyjne nadające budynkom nowoczesny charakter i chroniące przed warunkami atmosferycznymi. Panele dostępne w różnych profilach, fakturach i kolorach. Łatwy montaż na ruszcie aluminiowym lub stalowym. Długa żywotność i minimalne wymagania konserwacyjne.',
        },
        en: {
          name: 'VS Facade Cladding',
          description:
            'Aluminium facade systems that give buildings a modern character and protect them from weather conditions. Panels are available in various profiles, textures and colours. Easy installation on aluminium or steel substructures. Long service life and minimal maintenance.',
        },
        de: {
          name: 'VS Fassadenverkleidung',
          description:
            'Aluminium-Fassadensysteme, die Gebäuden einen modernen Charakter verleihen und sie vor Witterungseinflüssen schützen. Paneele sind in verschiedenen Profilen, Strukturen und Farben erhältlich. Einfache Montage auf Aluminium- oder Stahlunterkonstruktionen. Lange Lebensdauer und minimaler Wartungsaufwand.',
        },
      },
    },
  ]

async function main() {
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { order: cat.order, translations: cat.translations },
      create: { slug: cat.slug, order: cat.order, translations: cat.translations },
    })
  }

  console.log(`Upserted ${CATEGORIES.length} categories`)

  const categoryMap = new Map<string, string>()
  const dbCategories = await prisma.category.findMany({ select: { id: true, slug: true } })

  for (const c of dbCategories) {
    categoryMap.set(c.slug, c.id)
  }

  let productCount = 0

  for (const p of PRODUCTS) {
    const categoryId = categoryMap.get(p.categorySlug)

    if (!categoryId) {
      throw new Error(`Category not found for slug: ${p.categorySlug}`)
    }

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        order: p.order,
        categoryId,
        translations: p.translations,
        imageUrl: p.imageUrl,
      },
      create: {
        slug: p.slug,
        order: p.order,
        categoryId,
        translations: p.translations,
        imageUrl: p.imageUrl,
      },
    })

    productCount++
  }

  console.log(`Upserted ${productCount} products`)
}

main().catch(console.error).finally(() => prisma.$disconnect())