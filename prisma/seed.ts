import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const CATEGORIES = [
  {
    slug: 'zadaszenia',
    order: 1,
    translations: {
      pl: { name: 'Zadaszenia' },
      en: { name: 'Zadaszenia' }, // TODO: translate
      de: { name: 'Zadaszenia' }, // TODO: translate
    },
  },
  {
    slug: 'aluminium-szklo',
    order: 2,
    translations: {
      pl: { name: 'Aluminium & Szkło' },
      en: { name: 'Aluminium & Szkło' }, // TODO: translate
      de: { name: 'Aluminium & Szkło' }, // TODO: translate
    },
  },
  {
    slug: 'rozwiazania-przeciwsloneczne',
    order: 3,
    translations: {
      pl: { name: 'Rozwiązania Przeciwsłoneczne' },
      en: { name: 'Rozwiązania Przeciwsłoneczne' }, // TODO: translate
      de: { name: 'Rozwiązania Przeciwsłoneczne' }, // TODO: translate
    },
  },
  {
    slug: 'oslony-rolety',
    order: 4,
    translations: {
      pl: { name: 'Osłony i Rolety' },
      en: { name: 'Osłony i Rolety' }, // TODO: translate
      de: { name: 'Osłony i Rolety' }, // TODO: translate
    },
  },
  {
    slug: 'ogrodzenia-bramy',
    order: 5,
    translations: {
      pl: { name: 'Ogrodzenia i Bramy' },
      en: { name: 'Ogrodzenia i Bramy' }, // TODO: translate
      de: { name: 'Ogrodzenia i Bramy' }, // TODO: translate
    },
  },
  {
    slug: 'stolarka-aluminiowa',
    order: 6,
    translations: {
      pl: { name: 'Stolarka Aluminiowa' },
      en: { name: 'Stolarka Aluminiowa' }, // TODO: translate
      de: { name: 'Stolarka Aluminiowa' }, // TODO: translate
    },
  },
  {
    slug: 'elewacje-panele',
    order: 7,
    translations: {
      pl: { name: 'Elewacje i Panele' },
      en: { name: 'Elewacje i Panele' }, // TODO: translate
      de: { name: 'Elewacje i Panele' }, // TODO: translate
    },
  },
]

// Products grouped by category slug
const PRODUCTS: Array<{
  categorySlug: string
  slug: string
  order: number
  imageUrl: string
  translations: object
}> = [
  // --- Zadaszenia (9) ---
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
          'Klasyczna pergola aluminiowa o solidnej konstrukcji i ponadczasowym designie. Zapewnia ochronę przed deszczem i słońcem przez cały rok. Dostępna w wielu kolorach RAL. Idealna do domów jednorodzinnych i obiektów komercyjnych.',
      }, // TODO: translate
      de: {
        name: 'VS Solid',
        description:
          'Klasyczna pergola aluminiowa o solidnej konstrukcji i ponadczasowym designie. Zapewnia ochronę przed deszczem i słońcem przez cały rok. Dostępna w wielu kolorach RAL. Idealna do domów jednorodzinnych i obiektów komercyjnych.',
      }, // TODO: translate
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
          'Nowoczesna pergola o pogrubionej ramie i wyraźnych liniach. Masywna bryła nadaje realizacjom ekskluzywny charakter. System kompatybilny z przeszkleniami i oświetleniem LED. Doskonała do dużych tarasów i powierzchni handlowych.',
      }, // TODO: translate
      de: {
        name: 'VS Bold',
        description:
          'Nowoczesna pergola o pogrubionej ramie i wyraźnych liniach. Masywna bryła nadaje realizacjom ekskluzywny charakter. System kompatybilny z przeszkleniami i oświetleniem LED. Doskonała do dużych tarasów i powierzchni handlowych.',
      }, // TODO: translate
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
          'Nowoczesna pergola aluminiowa o płaskiej linii dachu i ukrytym spadku. Dzięki dużym profilom oraz minimalistycznej bryle konstrukcja prezentuje się bardzo elegancko i luksusowo. System zapewnia wysoką stabilność, możliwość rozbudowy o przeszklenia, ZIP Screeny oraz oświetlenie LED. Idealny wybór dla nowoczesnych domów i prestiżowych realizacji.',
      }, // TODO: translate
      de: {
        name: 'VS Cube',
        description:
          'Nowoczesna pergola aluminiowa o płaskiej linii dachu i ukrytym spadku. Dzięki dużym profilom oraz minimalistycznej bryle konstrukcja prezentuje się bardzo elegancko i luksusowo. System zapewnia wysoką stabilność, możliwość rozbudowy o przeszklenia, ZIP Screeny oraz oświetlenie LED. Idealny wybór dla nowoczesnych domów i prestiżowych realizacji.',
      }, // TODO: translate
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
          'Rozszerzona wersja VS Cube przeznaczona do dużych powierzchni. Wzmocniona konstrukcja umożliwia zadaszycie przestrzeni powyżej 100 m². Opcjonalne przeszklenia boczne i dach fotowoltaiczny. Prestiżowe rozwiązanie dla hoteli i centrów komercyjnych.',
      }, // TODO: translate
      de: {
        name: 'VS Cube Grand',
        description:
          'Rozszerzona wersja VS Cube przeznaczona do dużych powierzchni. Wzmocniona konstrukcja umożliwia zadaszycie przestrzeni powyżej 100 m². Opcjonalne przeszklenia boczne i dach fotowoltaiczny. Prestiżowe rozwiązanie dla hoteli i centrów komercyjnych.',
      }, // TODO: translate
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
          'Aluminiowe zadaszenie garażowe łączące funkcjonalność z estetyką. Chroni pojazdy przed warunkami atmosferycznymi przez cały rok. Dostępne w wersjach jedno- i dwustanowiskowych. Trwała konstrukcja odporna na wiatr i obciążenia śniegiem.',
      }, // TODO: translate
      de: {
        name: 'VS Carport',
        description:
          'Aluminiowe zadaszenie garażowe łączące funkcjonalność z estetyką. Chroni pojazdy przed warunkami atmosferycznymi przez cały rok. Dostępne w wersjach jedno- i dwustanowiskowych. Trwała konstrukcja odporna na wiatr i obciążenia śniegiem.',
      }, // TODO: translate
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
          'Pergola premium z dachem lamellowym umożliwiającym regulację nasłonecznienia. Aluminiowe lamele obracają się o 140°, zapewniając pełną kontrolę nad dostępem światła i wentylacji. System z wbudowanym odwodnieniem i oświetleniem LED w lamelach.',
      }, // TODO: translate
      de: {
        name: 'VS Prime',
        description:
          'Pergola premium z dachem lamellowym umożliwiającym regulację nasłonecznienia. Aluminiowe lamele obracają się o 140°, zapewniając pełną kontrolę nad dostępem światła i wentylacji. System z wbudowanym odwodnieniem i oświetleniem LED w lamelach.',
      }, // TODO: translate
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
          'Dynamiczna pergola z ruchomym dachem przesuwnym. Możliwość szybkiego otwierania i zamykania przestrzeni w zależności od warunków pogodowych. Napęd elektryczny z pilotem lub aplikacją mobilną. Kompatybilna z czujnikami deszczu i wiatru.',
      }, // TODO: translate
      de: {
        name: 'VS Dynamic',
        description:
          'Dynamiczna pergola z ruchomym dachem przesuwnym. Możliwość szybkiego otwierania i zamykania przestrzeni w zależności od warunków pogodowych. Napęd elektryczny z pilotem lub aplikacją mobilną. Kompatybilna z czujnikami deszczu i wiatru.',
      }, // TODO: translate
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
          'Zaawansowany system zadaszenia z dachem modułowym. Łączy elementy pergoli lamellowej i szklanej w jednej konstrukcji. Możliwość integracji z systemami smart home. Wysoki standard wykończenia dla wymagających klientów.',
      }, // TODO: translate
      de: {
        name: 'VS Advanced',
        description:
          'Zaawansowany system zadaszenia z dachem modułowym. Łączy elementy pergoli lamellowej i szklanej w jednej konstrukcji. Możliwość integracji z systemami smart home. Wysoki standard wykończenia dla wymagających klientów.',
      }, // TODO: translate
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
          'Elastyczny system zadaszenia dostosowujący się do różnych kształtów budynków. Idealne rozwiązanie dla nieregularnych tarasów i atriów. Modułowa budowa umożliwia rozbudowę bez konieczności demontażu. Dostępna w szerokiej gamie kolorów i wykończeń.',
      }, // TODO: translate
      de: {
        name: 'VS Adaptive',
        description:
          'Elastyczny system zadaszenia dostosowujący się do różnych kształtów budynków. Idealne rozwiązanie dla nieregularnych tarasów i atriów. Modułowa budowa umożliwia rozbudowę bez konieczności demontażu. Dostępna w szerokiej gamie kolorów i wykończeń.',
      }, // TODO: translate
    },
  },

  // --- Aluminium & Szkło (4) ---
  {
    categorySlug: 'aluminium-szklo',
    slug: 'sliding-walls',
    order: 1,
    imageUrl: '/products/image10.png',
    translations: {
      pl: {
        name: 'Sliding Walls',
        description:
          'Przesuwne ściany aluminiowo-szklane tworzące elastyczną przestrzeń. Idealne do zamykania tarasów, pergoli i werand. Systemy bezramkowe i ramkowe dostępne w różnych konfiguracjach. Wysoka izolacyjność termiczna i akustyczna.',
      },
      en: {
        name: 'Sliding Walls',
        description:
          'Przesuwne ściany aluminiowo-szklane tworzące elastyczną przestrzeń. Idealne do zamykania tarasów, pergoli i werand. Systemy bezramkowe i ramkowe dostępne w różnych konfiguracjach. Wysoka izolacyjność termiczna i akustyczna.',
      }, // TODO: translate
      de: {
        name: 'Sliding Walls',
        description:
          'Przesuwne ściany aluminiowo-szklane tworzące elastyczną przestrzeń. Idealne do zamykania tarasów, pergoli i werand. Systemy bezramkowe i ramkowe dostępne w różnych konfiguracjach. Wysoka izolacyjność termiczna i akustyczna.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'aluminium-szklo',
    slug: 'sliding-doors',
    order: 2,
    imageUrl: '/products/image11.png',
    translations: {
      pl: {
        name: 'Sliding Doors',
        description:
          'Aluminiowe drzwi przesuwne o dużych przeszkleniach. Płynne prowadzenie i minimalne progi zapewniają komfort użytkowania. Dostępne w wersjach 2-, 3- i 4-skrzydłowych. Kompatybilne z systemami antywłamaniowymi.',
      },
      en: {
        name: 'Sliding Doors',
        description:
          'Aluminiowe drzwi przesuwne o dużych przeszkleniach. Płynne prowadzenie i minimalne progi zapewniają komfort użytkowania. Dostępne w wersjach 2-, 3- i 4-skrzydłowych. Kompatybilne z systemami antywłamaniowymi.',
      }, // TODO: translate
      de: {
        name: 'Sliding Doors',
        description:
          'Aluminiowe drzwi przesuwne o dużych przeszkleniach. Płynne prowadzenie i minimalne progi zapewniają komfort użytkowania. Dostępne w wersjach 2-, 3- i 4-skrzydłowych. Kompatybilne z systemami antywłamaniowymi.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'aluminium-szklo',
    slug: 'guillotine',
    order: 3,
    imageUrl: '/products/image12.png',
    translations: {
      pl: {
        name: 'Guillotine',
        description:
          'Pionowo przesuwne szyby gilotynowe do zamykania przestrzeni bez widocznych ram. Idealne do restauracji, hoteli i ekskluzywnych obiektów. Szybkie i ciche działanie napędu elektrycznego. Szkło hartowane ESG o grubości 8–12 mm.',
      },
      en: {
        name: 'Guillotine',
        description:
          'Pionowo przesuwne szyby gilotynowe do zamykania przestrzeni bez widocznych ram. Idealne do restauracji, hoteli i ekskluzywnych obiektów. Szybkie i ciche działanie napędu elektrycznego. Szkło hartowane ESG o grubości 8–12 mm.',
      }, // TODO: translate
      de: {
        name: 'Guillotine',
        description:
          'Pionowo przesuwne szyby gilotynowe do zamykania przestrzeni bez widocznych ram. Idealne do restauracji, hoteli i ekskluzywnych obiektów. Szybkie i ciche działanie napędu elektrycznego. Szkło hartowane ESG o grubości 8–12 mm.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'aluminium-szklo',
    slug: 'fixed-wall-systems',
    order: 4,
    imageUrl: '/products/image13.png',
    translations: {
      pl: {
        name: 'Fixed Wall Systems',
        description:
          'Stałe ściany szklane w aluminiowej ramie do trwałego zamykania przestrzeni. Wysoka odporność na warunki atmosferyczne. Możliwość montażu drzwi wejściowych i okien uchylnych. Dostępne w wersji z ciepłą i zimną ramą.',
      },
      en: {
        name: 'Fixed Wall Systems',
        description:
          'Stałe ściany szklane w aluminiowej ramie do trwałego zamykania przestrzeni. Wysoka odporność na warunki atmosferyczne. Możliwość montażu drzwi wejściowych i okien uchylnych. Dostępne w wersji z ciepłą i zimną ramą.',
      }, // TODO: translate
      de: {
        name: 'Fixed Wall Systems',
        description:
          'Stałe ściany szklane w aluminiowej ramie do trwałego zamykania przestrzeni. Wysoka odporność na warunki atmosferyczne. Możliwość montażu drzwi wejściowych i okien uchylnych. Dostępne w wersji z ciepłą i zimną ramą.',
      }, // TODO: translate
    },
  },

  // --- Rozwiązania Przeciwsłoneczne (3) ---
  {
    categorySlug: 'rozwiazania-przeciwsloneczne',
    slug: 'vs-sun-shading',
    order: 1,
    imageUrl: '/products/image14.png',
    translations: {
      pl: {
        name: 'VS Sun Shading',
        description:
          'Zewnętrzne żaluzje fasadowe chroniące przed nadmiernym nasłonecznieniem. Redukują nagrzewanie pomieszczeń i obniżają koszty klimatyzacji. Dostępne w wersjach ręcznych i elektrycznych. Szerokie możliwości personalizacji koloru i materiału.',
      },
      en: {
        name: 'VS Sun Shading',
        description:
          'Zewnętrzne żaluzje fasadowe chroniące przed nadmiernym nasłonecznieniem. Redukują nagrzewanie pomieszczeń i obniżają koszty klimatyzacji. Dostępne w wersjach ręcznych i elektrycznych. Szerokie możliwości personalizacji koloru i materiału.',
      }, // TODO: translate
      de: {
        name: 'VS Sun Shading',
        description:
          'Zewnętrzne żaluzje fasadowe chroniące przed nadmiernym nasłonecznieniem. Redukują nagrzewanie pomieszczeń i obniżają koszty klimatyzacji. Dostępne w wersjach ręcznych i elektrycznych. Szerokie możliwości personalizacji koloru i materiału.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'rozwiazania-przeciwsloneczne',
    slug: 'vs-under-roof-shading',
    order: 2,
    imageUrl: '/products/image15.png',
    translations: {
      pl: {
        name: 'VS Under-Roof Shading',
        description:
          'Markizy podpergolowe montowane pod dachem lamellowym lub szklanym. Zapewniają cień bez konieczności zamykania dachu. Tkaniny odporne na UV i opady deszczu. Napęd elektryczny z automatyką pogodową.',
      },
      en: {
        name: 'VS Under-Roof Shading',
        description:
          'Markizy podpergolowe montowane pod dachem lamellowym lub szklanym. Zapewniają cień bez konieczności zamykania dachu. Tkaniny odporne na UV i opady deszczu. Napęd elektryczny z automatyką pogodową.',
      }, // TODO: translate
      de: {
        name: 'VS Under-Roof Shading',
        description:
          'Markizy podpergolowe montowane pod dachem lamellowym lub szklanym. Zapewniają cień bez konieczności zamykania dachu. Tkaniny odporne na UV i opady deszczu. Napęd elektryczny z automatyką pogodową.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'rozwiazania-przeciwsloneczne',
    slug: 'screens',
    order: 3,
    imageUrl: '/products/image16.png',
    translations: {
      pl: {
        name: 'Screens',
        description:
          'ZIP Screeny i rolety zewnętrzne eliminujące odblaski i nadmierne ciepło. System prowadzenia ZIP gwarantuje stabilność nawet przy silnym wietrze. Dostępne jako markizy wolnostojące lub do integracji z pergolą. Bogata gama tkanin technicznych.',
      },
      en: {
        name: 'Screens',
        description:
          'ZIP Screeny i rolety zewnętrzne eliminujące odblaski i nadmierne ciepło. System prowadzenia ZIP gwarantuje stabilność nawet przy silnym wietrze. Dostępne jako markizy wolnostojące lub do integracji z pergolą. Bogata gama tkanin technicznych.',
      }, // TODO: translate
      de: {
        name: 'Screens',
        description:
          'ZIP Screeny i rolety zewnętrzne eliminujące odblaski i nadmierne ciepło. System prowadzenia ZIP gwarantuje stabilność nawet przy silnym wietrze. Dostępne jako markizy wolnostojące lub do integracji z pergolą. Bogata gama tkanin technicznych.',
      }, // TODO: translate
    },
  },

  // --- Osłony i Rolety (1) ---
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
        name: 'Rolety zewnętrzne VS',
        description:
          'Aluminiowe rolety zewnętrzne zapewniające ochronę przed słońcem, wiatrem i włamaniem. Pancerz rolety wykonany z wysokiej jakości profili aluminiowych. Napęd elektryczny z możliwością integracji z systemem smart home. Dostępne w ponad 200 kolorach RAL.',
      }, // TODO: translate
      de: {
        name: 'Rolety zewnętrzne VS',
        description:
          'Aluminiowe rolety zewnętrzne zapewniające ochronę przed słońcem, wiatrem i włamaniem. Pancerz rolety wykonany z wysokiej jakości profili aluminiowych. Napęd elektryczny z możliwością integracji z systemem smart home. Dostępne w ponad 200 kolorach RAL.',
      }, // TODO: translate
    },
  },

  // --- Ogrodzenia i Bramy (3) ---
  {
    categorySlug: 'ogrodzenia-bramy',
    slug: 'vs-gates',
    order: 1,
    imageUrl: '/products/image18.png',
    translations: {
      pl: {
        name: 'VS Gates',
        description:
          'Aluminiowe bramy wjazdowe przesuwne i dwuskrzydłowe w nowoczesnym designie. Trwała konstrukcja odporna na korozję i zmiany temperatury. Napęd elektryczny z pilotem, klawiaturą lub interkomem wideo. Możliwość malowania proszkowego w dowolnym kolorze RAL.',
      },
      en: {
        name: 'VS Gates',
        description:
          'Aluminiowe bramy wjazdowe przesuwne i dwuskrzydłowe w nowoczesnym designie. Trwała konstrukcja odporna na korozję i zmiany temperatury. Napęd elektryczny z pilotem, klawiaturą lub interkomem wideo. Możliwość malowania proszkowego w dowolnym kolorze RAL.',
      }, // TODO: translate
      de: {
        name: 'VS Gates',
        description:
          'Aluminiowe bramy wjazdowe przesuwne i dwuskrzydłowe w nowoczesnym designie. Trwała konstrukcja odporna na korozję i zmiany temperatury. Napęd elektryczny z pilotem, klawiaturą lub interkomem wideo. Możliwość malowania proszkowego w dowolnym kolorze RAL.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'ogrodzenia-bramy',
    slug: 'vs-fencing',
    order: 2,
    imageUrl: '/products/image19.png',
    translations: {
      pl: {
        name: 'VS Fencing',
        description:
          'Aluminiowe ogrodzenia panelowe o nowoczesnej estetyce. Długa żywotność bez konieczności malowania czy konserwacji. Dostępne w różnych wysokościach i rozstawach listew. Kompatybilne z bramami VS Gates.',
      },
      en: {
        name: 'VS Fencing',
        description:
          'Aluminiowe ogrodzenia panelowe o nowoczesnej estetyce. Długa żywotność bez konieczności malowania czy konserwacji. Dostępne w różnych wysokościach i rozstawach listew. Kompatybilne z bramami VS Gates.',
      }, // TODO: translate
      de: {
        name: 'VS Fencing',
        description:
          'Aluminiowe ogrodzenia panelowe o nowoczesnej estetyce. Długa żywotność bez konieczności malowania czy konserwacji. Dostępne w różnych wysokościach i rozstawach listew. Kompatybilne z bramami VS Gates.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'ogrodzenia-bramy',
    slug: 'vs-balustrade',
    order: 3,
    imageUrl: '/products/image20.png',
    translations: {
      pl: {
        name: 'VS Balustrade',
        description:
          'Aluminiowe balustrady tarasowe i balkonowe łączące bezpieczeństwo z estetyką. Dostępne w wersjach pełnych, z przeszkleniami i z linkami stalowymi. Odporność na korozję i warunki atmosferyczne. Certyfikowane zgodnie z normami europejskimi.',
      },
      en: {
        name: 'VS Balustrade',
        description:
          'Aluminiowe balustrady tarasowe i balkonowe łączące bezpieczeństwo z estetyką. Dostępne w wersjach pełnych, z przeszkleniami i z linkami stalowymi. Odporność na korozję i warunki atmosferyczne. Certyfikowane zgodnie z normami europejskimi.',
      }, // TODO: translate
      de: {
        name: 'VS Balustrade',
        description:
          'Aluminiowe balustrady tarasowe i balkonowe łączące bezpieczeństwo z estetyką. Dostępne w wersjach pełnych, z przeszkleniami i z linkami stalowymi. Odporność na korozję i warunki atmosferyczne. Certyfikowane zgodnie z normami europejskimi.',
      }, // TODO: translate
    },
  },

  // --- Stolarka Aluminiowa (3) ---
  {
    categorySlug: 'stolarka-aluminiowa',
    slug: 'room-dividers',
    order: 1,
    imageUrl: '/products/image21.png',
    translations: {
      pl: {
        name: 'Room Dividers',
        description:
          'Aluminiowe ścianki działowe do aranżacji przestrzeni wewnętrznych i zewnętrznych. Lekka konstrukcja umożliwia łatwą rekonfigurację układu pomieszczeń. Dostępne z przeszkleniami, panelami pełnymi lub kombinowanymi. Szeroka gama wykończeń i kolorów.',
      },
      en: {
        name: 'Room Dividers',
        description:
          'Aluminiowe ścianki działowe do aranżacji przestrzeni wewnętrznych i zewnętrznych. Lekka konstrukcja umożliwia łatwą rekonfigurację układu pomieszczeń. Dostępne z przeszkleniami, panelami pełnymi lub kombinowanymi. Szeroka gama wykończeń i kolorów.',
      }, // TODO: translate
      de: {
        name: 'Room Dividers',
        description:
          'Aluminiowe ścianki działowe do aranżacji przestrzeni wewnętrznych i zewnętrznych. Lekka konstrukcja umożliwia łatwą rekonfigurację układu pomieszczeń. Dostępne z przeszkleniami, panelami pełnymi lub kombinowanymi. Szeroka gama wykończeń i kolorów.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'stolarka-aluminiowa',
    slug: 'vs-doors',
    order: 2,
    imageUrl: '/products/image22.png',
    translations: {
      pl: {
        name: 'VS Doors',
        description:
          'Aluminiowe drzwi zewnętrzne o wysokich parametrach izolacyjności termicznej i akustycznej. Elegancki design z możliwością integracji z systemami kontroli dostępu. Dostępne w wersjach jednoskrzydłowych, dwuskrzydłowych i z doświetlami. Certyfikat RC2.',
      },
      en: {
        name: 'VS Doors',
        description:
          'Aluminiowe drzwi zewnętrzne o wysokich parametrach izolacyjności termicznej i akustycznej. Elegancki design z możliwością integracji z systemami kontroli dostępu. Dostępne w wersjach jednoskrzydłowych, dwuskrzydłowych i z doświetlami. Certyfikat RC2.',
      }, // TODO: translate
      de: {
        name: 'VS Doors',
        description:
          'Aluminiowe drzwi zewnętrzne o wysokich parametrach izolacyjności termicznej i akustycznej. Elegancki design z możliwością integracji z systemami kontroli dostępu. Dostępne w wersjach jednoskrzydłowych, dwuskrzydłowych i z doświetlami. Certyfikat RC2.',
      }, // TODO: translate
    },
  },
  {
    categorySlug: 'stolarka-aluminiowa',
    slug: 'vs-windows',
    order: 3,
    imageUrl: '/products/image23.png',
    translations: {
      pl: {
        name: 'VS Windows',
        description:
          'Aluminiowe okna o smukłych profilach i dużych powierzchniach przeszkleń. Wysoka izolacyjność termiczna Uf ≤ 1,0 W/m²K. Dostępne w wersjach rozwierno-uchylnych, przesuwnych i stałych. Opcjonalne pakiety antywłamaniowe i akustyczne.',
      },
      en: {
        name: 'VS Windows',
        description:
          'Aluminiowe okna o smukłych profilach i dużych powierzchniach przeszkleń. Wysoka izolacyjność termiczna Uf ≤ 1,0 W/m²K. Dostępne w wersjach rozwierno-uchylnych, przesuwnych i stałych. Opcjonalne pakiety antywłamaniowe i akustyczne.',
      }, // TODO: translate
      de: {
        name: 'VS Windows',
        description:
          'Aluminiowe okna o smukłych profilach i dużych powierzchniach przeszkleń. Wysoka izolacyjność termiczna Uf ≤ 1,0 W/m²K. Dostępne w wersjach rozwierno-uchylnych, przesuwnych i stałych. Opcjonalne pakiety antywłamaniowe i akustyczne.',
      }, // TODO: translate
    },
  },

  // --- Elewacje i Panele (1) ---
  {
    categorySlug: 'elewacje-panele',
    slug: 'vs-facade-cladding',
    order: 1,
    imageUrl: '/products/image24.png',
    translations: {
      pl: {
        name: 'VS Facade Cladding',
        description:
          'Aluminiowe systemy elewacyjne nadające budynkom nowoczesny charakter i chroniące przed warunkami atmosferycznymi. Panele dostępne w różnych profilach, fakturach i kolorach. Łatwy montaż na ruszcie aluminiowym lub stalowym. Długa żywotność i minimalne wymagania konserwacyjne.',
      },
      en: {
        name: 'VS Facade Cladding',
        description:
          'Aluminiowe systemy elewacyjne nadające budynkom nowoczesny charakter i chroniące przed warunkami atmosferycznymi. Panele dostępne w różnych profilach, fakturach i kolorach. Łatwy montaż na ruszcie aluminiowym lub stalowym. Długa żywotność i minimalne wymagania konserwacyjne.',
      }, // TODO: translate
      de: {
        name: 'VS Facade Cladding',
        description:
          'Aluminiowe systemy elewacyjne nadające budynkom nowoczesny charakter i chroniące przed warunkami atmosferycznymi. Panele dostępne w różnych profilach, fakturach i kolorach. Łatwy montaż na ruszcie aluminiowym lub stalowym. Długa żywotność i minimalne wymagania konserwacyjne.',
      }, // TODO: translate
    },
  },
]

async function main() {
  // Upsert categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { order: cat.order, translations: cat.translations },
      create: { slug: cat.slug, order: cat.order, translations: cat.translations },
    })
  }
  console.log(`Upserted ${CATEGORIES.length} categories`)

  // Build slug → id map
  const categoryMap = new Map<string, string>()
  const dbCategories = await prisma.category.findMany({ select: { id: true, slug: true } })
  for (const c of dbCategories) {
    categoryMap.set(c.slug, c.id)
  }

  // Upsert products
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
