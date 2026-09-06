/* ==========================================================================
   Azzaouia Resort — Central configuration
   --------------------------------------------------------------------------
   >>> PASTE THE NOZOUL RESERVATION URL BELOW. It is used everywhere. <<<
   ========================================================================== */

var SITE_CONFIG = {
  /* ---------------------------------------------------------------
     1. NOZOUL RESERVATION ENGINE
     Replace PASTE_NOZOUL_URL_HERE with the real URL, e.g.
     "https://booking.nozoul.ma/azzaouia-resort"
     This is the ONLY place the URL appears in the whole project.
     --------------------------------------------------------------- */
  NOZOUL_RESERVATION_URL: "https://azzaouiaresort.nozoul.ma/#/be/5f39360e-bbf6-4a0a-b129-48f770077068/book",

  /* Open the engine in a new tab (true) or the same tab (false).
     New tab keeps the current site alive behind the booking flow. */
  NOZOUL_OPEN_IN_NEW_TAB: true,

  /* Send the hero search (dates, guests) to Nozoul as query parameters.
     The exact param names Nozoul expects (period/adults/child/ages) are
     hardcoded in Reservation.buildUrl() below — don't rename them here. */
  NOZOUL_SEND_PARAMS: true
};

/* ==========================================================================
   Accommodation data
   --------------------------------------------------------------------------
   All content below is taken from the original website. Nothing is invented.
   Fields left empty are simply not displayed.
   ========================================================================== */

var ACCOMMODATIONS = [
  {
    id: "chambre-double",
    type: "room",
    price: 660,
    tag: { fr: "14 chambres", en: "14 rooms", ar: "14 غرفة" },
    name: { fr: "Chambre Double", en: "Double Room", ar: "غرفة مزدوجة" },
    capacity: { fr: "1 à 2 personnes", en: "1 to 2 guests", ar: "شخص إلى شخصين" },
    short: {
      fr: "Une chambre chaleureuse au style marocain authentique, idéale pour un séjour paisible en pleine nature.",
      en: "A warm room in authentic Moroccan style, ideal for a peaceful stay surrounded by nature.",
      ar: "غرفة دافئة بطراز مغربي أصيل، مثالية لإقامة هادئة في قلب الطبيعة."
    },
    long: {
      fr: "Nos 12 chambres doubles marient l'artisanat marocain traditionnel au confort contemporain. Chacune ouvre sur le calme du village d'Aïn Sahla, aux portes du Parc National de Tazekka.",
      en: "Our 12 double rooms combine traditional Moroccan craftsmanship with contemporary comfort. Each one opens onto the quiet of Aïn Sahla village, at the gateway to Tazekka National Park.",
      ar: "تجمع غرفنا المزدوجة الاثنتا عشرة بين الحرفية المغربية التقليدية والراحة العصرية. تطل كل غرفة على هدوء قرية عين سهلة عند مدخل المنتزه الوطني لتازكة."
    },
    rates: {
      fr: [
        "1 adulte, petit-déjeuner : 700 MAD",
        "1 adulte, déjeuner inclus : 900 MAD",
        "2 adultes, petit-déjeuner : 900 MAD",
        "2 adultes, déjeuner inclus : 1300 MAD",
        "Enfant supplémentaire : +350 MAD"
      ],
      en: [
        "1 adult, breakfast: 700 MAD",
        "1 adult, lunch included: 900 MAD",
        "2 adults, breakfast: 900 MAD",
        "2 adults, lunch included: 1300 MAD",
        "Additional child: +350 MAD"
      ],
      ar: [
        "شخص بالغ واحد، فطور: 700 درهم",
        "شخص بالغ واحد، مع الغداء: 900 درهم",
        "شخصان بالغان، فطور: 900 درهم",
        "شخصان بالغان، مع الغداء: 1300 درهم",
        "طفل إضافي: +350 درهم"
      ]
    },
    notes: {
      fr: ["Restriction : limite d'âge de 8 ans"],
      en: ["Restriction: 8-year age limit"],
      ar: ["شرط: الحد العمري 8 سنوات"]
    },
    images: [
      "assets/img/chambre-double/chambre-double-01.jpg",
      "assets/img/chambre-double/chambre-double-02.jpg",
      "assets/img/chambre-double/chambre-double-03.jpg",
      "assets/img/chambre-double/chambre-double-04.jpg",
      "assets/img/chambre-double/chambre-double-05.jpg",
      "assets/img/chambre-double/chambre-double-06.jpg",
      "assets/img/chambre-double/chambre-double-07.jpg",
      "assets/img/chambre-double/chambre-double-08.jpg",
      "assets/img/chambre-double/chambre-double-09.jpg",
      "assets/img/chambre-double/chambre-double-10.jpg"
    ],
    thumbs: [
      "assets/img/chambre-double/chambre-double-01-sm.jpg",
      "assets/img/chambre-double/chambre-double-02-sm.jpg",
      "assets/img/chambre-double/chambre-double-03-sm.jpg",
      "assets/img/chambre-double/chambre-double-04-sm.jpg",
      "assets/img/chambre-double/chambre-double-05-sm.jpg",
      "assets/img/chambre-double/chambre-double-06-sm.jpg",
      "assets/img/chambre-double/chambre-double-07-sm.jpg",
      "assets/img/chambre-double/chambre-double-08-sm.jpg",
      "assets/img/chambre-double/chambre-double-09-sm.jpg",
      "assets/img/chambre-double/chambre-double-10-sm.jpg"
    ]
  },

  {
    id: "grande-suite",
    type: "suite",
    price: 2420,
    tag: { fr: "3 Suite", en: "3 Suite", ar: "جناح 3" },
    name: { fr: "Grande Suite", en: "Large Suite", ar: "جناح كبير" },
    capacity: { fr: "Jusqu'à 6 personnes", en: "Up to 6 guests", ar: "حتى 6 أشخاص" },
    short: {
      fr: "Notre plus vaste suite, pensée pour les familles élargies et les séjours en groupe.",
      en: "Our largest suite, designed for extended families and group stays.",
      ar: "أوسع أجنحتنا، مصمم للعائلات الكبيرة والإقامات الجماعية."
    },
    long: {
      fr: "La Grande Suite offre le plus grand volume du resort, avec un coin salon généreux pour réunir toute la famille. Elle fait partie des 5 suites du domaine.",
      en: "The Large Suite offers the resort's most generous volume, with a spacious lounge area for the whole family. It is one of the estate's 5 suites.",
      ar: "يوفر الجناح الكبير أوسع مساحة في المنتجع، مع ركن جلوس رحب يجمع العائلة بأكملها. وهو من بين الأجنحة الخمسة بالمنتجع."
    },
    rates: {
      fr: [
        "1 ou 2 adultes, petit-déjeuner : 1800 MAD",
        "Adulte supplémentaire : +300 MAD",
        "Enfant supplémentaire : +150 MAD"
      ],
      en: [
        "1 or 2 adults, breakfast: 1800 MAD",
        "Additional adult: +300 MAD",
        "Additional child: +150 MAD"
      ],
      ar: [
        "شخص أو شخصان بالغان، فطور: 1800 درهم",
        "شخص بالغ إضافي: +300 درهم",
        "طفل إضافي: +150 درهم"
      ]
    },
    notes: {
      fr: ["Capacité maximale : 6 personnes"],
      en: ["Maximum capacity: 6 guests"],
      ar: ["السعة القصوى: 6 أشخاص"]
    },
    images: [
      "assets/img/grande-suite/grande-suite-01.jpg",
      "assets/img/grande-suite/grande-suite-02.jpg",
      "assets/img/grande-suite/grande-suite-03.jpg",
      "assets/img/grande-suite/grande-suite-04.jpg",
      "assets/img/grande-suite/grande-suite-05.jpg",
      "assets/img/grande-suite/grande-suite-06.jpg",
      "assets/img/grande-suite/grande-suite-07.jpg",
      "assets/img/grande-suite/grande-suite-08.jpg",
      "assets/img/grande-suite/grande-suite-09.jpg",
      "assets/img/grande-suite/grande-suite-10.jpg"
    ],
    thumbs: [
      "assets/img/grande-suite/grande-suite-01-sm.jpg",
      "assets/img/grande-suite/grande-suite-02-sm.jpg",
      "assets/img/grande-suite/grande-suite-03-sm.jpg",
      "assets/img/grande-suite/grande-suite-04-sm.jpg",
      "assets/img/grande-suite/grande-suite-05-sm.jpg",
      "assets/img/grande-suite/grande-suite-06-sm.jpg",
      "assets/img/grande-suite/grande-suite-07-sm.jpg",
      "assets/img/grande-suite/grande-suite-08-sm.jpg",
      "assets/img/grande-suite/grande-suite-09-sm.jpg",
      "assets/img/grande-suite/grande-suite-10-sm.jpg"
    ]
  },

  {
    id: "petite-suite",
    type: "suite",
    price: 1490,
    tag: { fr: "4 Suite", en: "4 Suite", ar: "4 جناح" },
    name: { fr: "Petite Suite", en: "Small Suite", ar: "جناح صغير" },
    capacity: { fr: "Jusqu'à 4 personnes", en: "Up to 4 guests", ar: "حتى 4 أشخاص" },
    short: {
      fr: "Un espace plus généreux avec coin salon, pensé pour les familles et les petits groupes.",
      en: "A roomier space with a lounge corner, made for families and small groups.",
      ar: "مساحة أرحب مع ركن جلوس، مخصصة للعائلات والمجموعات الصغيرة."
    },
    long: {
      fr: "La Petite Suite ajoute un coin salon à l'espace nuit, pour les familles qui souhaitent plus de place sans changer d'échelle. Elle fait partie des 5 suites du domaine.",
      en: "The Small Suite adds a lounge corner to the sleeping area, for families who want more room without moving up a size. It is one of the estate's 5 suites.",
      ar: "يضيف الجناح الصغير ركن جلوس إلى مساحة النوم، للعائلات التي ترغب في مساحة أوسع. وهو من بين الأجنحة الخمسة بالمنتجع."
    },
    rates: {
      fr: [
        "1 ou 2 adultes, petit-déjeuner : 1400 MAD",
        "Adulte supplémentaire : +300 MAD",
        "Enfant supplémentaire : +150 MAD"
      ],
      en: [
        "1 or 2 adults, breakfast: 1400 MAD",
        "Additional adult: +300 MAD",
        "Additional child: +150 MAD"
      ],
      ar: [
        "شخص أو شخصان بالغان، فطور: 1400 درهم",
        "شخص بالغ إضافي: +300 درهم",
        "طفل إضافي: +150 درهم"
      ]
    },
    notes: {
      fr: ["Capacité maximale : 4 personnes"],
      en: ["Maximum capacity: 4 guests"],
      ar: ["السعة القصوى: 4 أشخاص"]
    },
    images: [
      "assets/img/petite-suite/petite-suite-01.jpg",
      "assets/img/petite-suite/petite-suite-02.jpg",
      "assets/img/petite-suite/petite-suite-03.jpg",
      "assets/img/petite-suite/petite-suite-04.jpg",
      "assets/img/petite-suite/petite-suite-05.jpg",
      "assets/img/petite-suite/petite-suite-06.jpg",
      "assets/img/petite-suite/petite-suite-07.jpg",
      "assets/img/petite-suite/petite-suite-08.jpg",
      "assets/img/petite-suite/petite-suite-09.jpg",
      "assets/img/petite-suite/petite-suite-10.jpg"
    ],
    thumbs: [
      "assets/img/petite-suite/petite-suite-01-sm.jpg",
      "assets/img/petite-suite/petite-suite-02-sm.jpg",
      "assets/img/petite-suite/petite-suite-03-sm.jpg",
      "assets/img/petite-suite/petite-suite-04-sm.jpg",
      "assets/img/petite-suite/petite-suite-05-sm.jpg",
      "assets/img/petite-suite/petite-suite-06-sm.jpg",
      "assets/img/petite-suite/petite-suite-07-sm.jpg",
      "assets/img/petite-suite/petite-suite-08-sm.jpg",
      "assets/img/petite-suite/petite-suite-09-sm.jpg",
      "assets/img/petite-suite/petite-suite-10-sm.jpg"
    ]
  },

  {
    id: "dortoir",
    type: "dorm",
    price: 275,
    tag: { fr: "4 dortoirs", en: "4 dormitories", ar: "4 مَهاجِع" },
    name: { fr: "Dortoirs", en: "Dormitories", ar: "المهاجع" },
    capacity: { fr: "Jusqu'à 12 personnes", en: "Up to 12 guests", ar: "حتى 12 شخصًا" },
    short: {
      fr: "Un espace convivial et sécurisé, idéal pour les groupes venus profiter du calme d'Aïn Sahla.",
      en: "A friendly, secure space, ideal for groups coming to enjoy the quiet of Aïn Sahla.",
      ar: "فضاء ودّي وآمن، مثالي للمجموعات القادمة للاستمتاع بهدوء عين سهلة."
    },
    long: {
      fr: "Nos 2 dortoirs accueillent les groupes, les randonneurs et les séjours scolaires ou associatifs, à quelques pas des sentiers du Parc National de Tazekka.",
      en: "Our 2 dormitories host groups, hikers, and school or association stays, a few steps from the trails of Tazekka National Park.",
      ar: "يستقبل مهجعانا المجموعات والمتنزهين والرحلات المدرسية والجمعوية، على بعد خطوات من مسالك المنتزه الوطني لتازكة."
    },
    rates: {
      fr: [
        "1 personne : 400 MAD",
        "2 personnes : 800 MAD",
        "Adulte supplémentaire : +400 MAD",
        "Enfant supplémentaire : +200 MAD"
      ],
      en: [
        "1 guest: 400 MAD",
        "2 guests: 800 MAD",
        "Additional adult: +400 MAD",
        "Additional child: +200 MAD"
      ],
      ar: [
        "شخص واحد: 400 درهم",
        "شخصان: 800 درهم",
        "شخص بالغ إضافي: +400 درهم",
        "طفل إضافي: +200 درهم"
      ]
    },
    notes: {
      fr: ["Capacité maximale : 12 personnes"],
      en: ["Maximum capacity: 12 guests"],
      ar: ["السعة القصوى: 12 شخصًا"]
    },
    images: [
      "assets/img/dortoir/dortoir-01.jpg",
      "assets/img/dortoir/dortoir-02.jpg",
      "assets/img/dortoir/dortoir-03.jpg",
      "assets/img/dortoir/dortoir-04.jpg",
      "assets/img/dortoir/dortoir-05.jpg",
      "assets/img/dortoir/dortoir-06.jpg"
    ],
    thumbs: [
      "assets/img/dortoir/dortoir-01-sm.jpg",
      "assets/img/dortoir/dortoir-02-sm.jpg",
      "assets/img/dortoir/dortoir-03-sm.jpg",
      "assets/img/dortoir/dortoir-04-sm.jpg",
      "assets/img/dortoir/dortoir-05-sm.jpg",
      "assets/img/dortoir/dortoir-06-sm.jpg"
    ]
  }
];

/* ==========================================================================
   Reservation helper — every "Réserver / Book Now / احجز الآن" goes through here
   ========================================================================== */

var Reservation = (function () {
  "use strict";

  function isConfigured() {
    var url = SITE_CONFIG.NOZOUL_RESERVATION_URL;
    return typeof url === "string" && url.indexOf("PASTE_") !== 0 && url.length > 0;
  }

  function buildUrl(params) {
    var base = SITE_CONFIG.NOZOUL_RESERVATION_URL;
    if (!SITE_CONFIG.NOZOUL_SEND_PARAMS || !params) return base;

    /* Nozoul's booking engine only understands this exact query-string
       shape: period=CHECKIN,CHECKOUT & adults=N & child=N & ages=A,B,C
       (checkin/checkout are combined into a single "period" param, and
       "child"/"ages" are only sent when there is at least one child). */
    var pairs = [];

    if (params.checkin && params.checkout) {
      pairs.push("period=" + encodeURIComponent(params.checkin + "," + params.checkout));
    }

    pairs.push("adults=" + encodeURIComponent(params.adults || "1"));

    var childCount = parseInt(params.children, 10) || 0;
    if (childCount > 0) {
      pairs.push("child=" + encodeURIComponent(childCount));
      var ages = (params.childAges || [])
        .filter(function (a) { return a !== "" && a !== undefined && a !== null; })
        .join(",");
      if (ages) pairs.push("ages=" + encodeURIComponent(ages));
    }

    if (!pairs.length) return base;
    return base + (base.indexOf("?") === -1 ? "?" : "&") + pairs.join("&");
  }

  /* Opens the Nozoul engine. `params` is optional (dates, guests, roomType). */
  function open(params) {
    if (!isConfigured()) {
      /* Nothing to open yet — tell the visitor instead of failing silently. */
      if (window.showReservationNotice) window.showReservationNotice();
      return false;
    }
    var url = buildUrl(params);
    if (SITE_CONFIG.NOZOUL_OPEN_IN_NEW_TAB) {
      window.open(url, "_blank", "noopener");
    } else {
      window.location.href = url;
    }
    return true;
  }

  return { open: open, buildUrl: buildUrl, isConfigured: isConfigured };
})();
