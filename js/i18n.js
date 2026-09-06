/* ==========================================================================
   Azzaouia Resort — Multilingual system (FR · EN · AR)
   Markup opt-in:
     data-i18n="key"            -> replaces textContent
     data-i18n-html="key"       -> replaces innerHTML
     data-i18n-attr="attr:key"  -> replaces an attribute (several separated by ;)
   ========================================================================== */

var I18N = (function () {
  "use strict";

  var STORAGE_KEY = "azzaouia-lang";
  var DEFAULT_LANG = "fr";

  var LANGS = {
    fr: { label: "FR", name: "Français", dir: "ltr", locale: "fr" },
    en: { label: "EN", name: "English", dir: "ltr", locale: "en" },
    ar: { label: "ع", name: "العربية", dir: "rtl", locale: "ar" }
  };

  var DICT = {
    fr: {
      /* Nav */
      "nav.home": "Accueil",
      "nav.accommodation": "Hébergement",
      "nav.services": "Services",
      "nav.gallery": "Galerie",
      "nav.about": "À Propos",
      "nav.location": "Localisation",
      "nav.contact": "Contact",
      "nav.menuLabel": "Ouvrir le menu",
      "nav.themeLabel": "Basculer le mode sombre",
      "nav.langLabel": "Changer de langue",

      /* Global actions */
      "cta.book": "Réserver",
      "cta.discover": "Découvrir",
      "cta.viewRooms": "Découvrir nos hébergements",
      "cta.quote": "Demander un devis",
      "cta.close": "Fermer",
      "cta.prev": "Image précédente",
      "cta.next": "Image suivante",
      "cta.backTop": "Revenir en haut",

      /* Loader / hero */
      "loader.text": "Azzaouia Resort",
      "hero.eyebrow": "Bienvenue à Aïn Sahla, Taza",
      "hero.title": "Azzaouia Resort",
      "hero.slogan": "Depuis 1678 — l'authenticité marocaine aux portes du Parc National de Tazekka",
      "hero.scroll": "Défiler",

      /* Hero booking card */
      "booking.title": "Réservez votre séjour",
      "booking.checkin": "Arrivée",
      "booking.checkout": "Départ",
      "booking.adults": "Adultes",
      "booking.children": "Enfants",
      "booking.agesLabel": "Âge des enfants",
      "booking.childAge": "Âge Enfant",
      "booking.summaryTitle": "Résumé de la réservation",
      "booking.ages": "Âges",
      "booking.errDates": "Merci de sélectionner vos dates d'arrivée et de départ.",
      "booking.errOrder": "La date de départ doit être postérieure à la date d'arrivée.",
      "booking.opening": "Ouverture du moteur de réservation…",
      "booking.notConfigured": "Le moteur de réservation n'est pas encore configuré. Merci de nous contacter au +212 6 61 89 35 87.",
      "booking.adultOne": "1 Adulte",
      "booking.adultMany": "Adultes",
      "booking.childZero": "0 Enfant",
      "booking.childOne": "1 Enfant",
      "booking.childMany": "Enfants",
      "booking.ageUnder1": "Moins d'1 an",
      "booking.yearOne": "an",
      "booking.yearMany": "ans",

      /* Accommodation */
      "acc.eyebrow": "Séjournez chez nous",
      "acc.title": "Hébergement",
      "acc.sub": "Des chambres douillettes aux dortoirs conviviaux — chaque espace marie l'élégance marocaine traditionnelle au confort moderne.",
      "acc.note": "17 chambres et suites au total : 12 chambres doubles, 5 suites et 2 dortoirs.",
      "acc.from": "À partir de",
      "acc.perNight": "/ nuit",
      "acc.capacity": "Capacité",
      "acc.rates": "Tarifs",
      "acc.goodToKnow": "Bon à savoir",
      "acc.gallery": "Galerie",

      /* Services */
      "srv.eyebrow": "Services du Resort",
      "srv.title": "Nos Services",
      "srv.sub": "Chaque détail pensé pour un séjour authentique et sans souci.",
      "srv.dining": "Restauration",
      "srv.diningDesc": "Demi-pension ou pension complète, incluse et facturée par jour.",
      "srv.diningTag": "Inclus",
      "srv.events": "Événementiel",
      "srv.eventsDesc": "Organisation de vos mariages, séminaires et célébrations.",
      "srv.transport": "Transport",
      "srv.transportDesc": "Transferts et déplacements depuis Oued Amlil et la région de Taza.",
      "srv.hiking": "Randonnées",
      "srv.hikingDesc": "Sorties nature sur les sentiers du Parc National de Tazekka.",
      "srv.extra": "En supplément",
      "srv.perService": "Facturé par prestation",
      "srv.perDay": "Facturé par jour",

      /* Gallery */
      "gal.eyebrow": "Voyage Visuel",
      "gal.title": "Galerie",
      "gal.sub": "Un aperçu de la beauté et de l'authenticité d'Azzaouia Resort.",
      "gal.all": "Tout",
      "gal.rooms": "Chambres",
      "gal.suites": "Suites",
      "gal.dorms": "Dortoirs",
      "gal.grounds": "Domaine",
      "gal.capRoom": "Chambre Double",
      "gal.capSmallSuite": "Petite Suite",
      "gal.capLargeSuite": "Grande Suite",
      "gal.capFamilySuite": "Suite Familiale",
      "gal.capDorm": "Dortoir",
      "gal.capEstate": "Le Domaine",

      /* About */
      "abt.eyebrow": "Notre Histoire",
      "abt.title": "Un Sanctuaire Marocain",
      "abt.p1": "Niché au village d'Aïn Sahla, aux portes du Parc National de Tazekka, Azzaouia Resort perpétue depuis 1678 une tradition d'hospitalité marocaine authentique. Notre domaine marie l'architecture traditionnelle à un confort chaleureux, pour une expérience vraie et ressourçante.",
      "abt.p2": "Entre chambres, suites et dortoirs, chaque espace raconte une histoire de patience et de soin. Notre équipe veille à ce que chaque hôte se sente non seulement bienvenu, mais véritablement chez lui.",
      "abt.f1": "Architecture marocaine traditionnelle",
      "abt.f2": "Aux portes du Parc National de Tazekka",
      "abt.f3": "Cuisine authentique",
      "abt.f4": "Hospitalité familiale depuis 1678",
      "abt.stat1": "Chambres & Suites",
      "abt.stat2": "Catégories de services",
      "abt.since": "Depuis",

      /* Testimonials */
      "tst.eyebrow": "Avis de nos Hôtes",
      "tst.title": "Ce Que Disent Nos Hôtes",
      "tst.q1": "Un séjour authentique du début à la fin. Le calme d'Aïn Sahla et la gentillesse de l'équipe nous ont marqués. La Petite Suite était magnifique.",
      "tst.q3": "La Grande Suite était spacieuse et confortable pour toute la famille. Les enfants ont adoré les randonnées autour du parc de Tazekka. Nous reviendrons.",
      "tst.c1": "Paris, France",
      "tst.c3": "Casablanca, Maroc",

      /* Location */
      "loc.eyebrow": "Nous Trouver",
      "loc.title": "Notre Localisation",
      "loc.sub": "Idéalement situé au village d'Aïn Sahla, aux portes du Parc National de Tazekka.",
      "loc.address": "Adresse",
      "loc.addressVal": "Village Aïn Sahla, Commune Bouchfaa, Cercle Oued Amlil, Province de Taza, Maroc",
      "loc.region": "Région",
      "loc.regionVal": "Fès-Meknès, Province de Taza",
      "loc.desk": "Réception",
      "loc.deskVal": "Ouverte 24h/24, 7j/7",
      "loc.access": "Accès",
      "loc.accessVal": "Oued Amlil, Province de Taza — Transport disponible en extra",
      "loc.nearby": "À Proximité",
      "loc.nearbyVal": "Parc National de Tazekka — Randonnées et nature environnante",
      "loc.mapTitle": "Carte montrant la localisation d'Azzaouia Resort à Aïn Sahla, Taza",

      /* Contact */
      "ctc.eyebrow": "Contactez-nous",
      "ctc.title": "Contact",
      "ctc.sub": "Une question ou une demande particulière ? Notre équipe est à votre écoute.",
      "ctc.phone": "Téléphone",
      "ctc.email": "Email",
      "ctc.address": "Adresse",
      "ctc.desk": "Réception",
      "ctc.payment": "Modes de paiement",
      "ctc.paymentVal": "Espèces, virement bancaire, chèque",
      "ctc.formTitle": "Envoyez-nous un message",
      "ctc.formSub": "Questions ou demandes particulières ? Nous répondons sous 24h.",
      "ctc.name": "Nom complet",
      "ctc.message": "Message",
      "ctc.send": "Envoyer le message",
      "ctc.errFields": "Merci de renseigner votre nom et votre email.",
      "ctc.errEmail": "Merci de saisir une adresse email valide.",
      "ctc.ok": "Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h.",

      /* Footer */
      "ftr.tagline": "Depuis 1678 — l'authenticité marocaine aux portes du Parc National de Tazekka",
      "ftr.quick": "Liens Rapides",
      "ftr.services": "Services",
      "ftr.contact": "Contact",
      "ftr.rights": "Azzaouia Resort. Tous droits réservés.",
      "ftr.since": "Une histoire d'hospitalité depuis 1678"
    },

    en: {
      "nav.home": "Home",
      "nav.accommodation": "Accommodation",
      "nav.services": "Services",
      "nav.gallery": "Gallery",
      "nav.about": "About",
      "nav.location": "Location",
      "nav.contact": "Contact",
      "nav.menuLabel": "Open menu",
      "nav.themeLabel": "Toggle dark mode",
      "nav.langLabel": "Change language",

      "cta.book": "Book Now",
      "cta.discover": "Discover",
      "cta.viewRooms": "Explore our rooms",
      "cta.quote": "Request a quote",
      "cta.close": "Close",
      "cta.prev": "Previous image",
      "cta.next": "Next image",
      "cta.backTop": "Back to top",

      "loader.text": "Azzaouia Resort",
      "hero.eyebrow": "Welcome to Aïn Sahla, Taza",
      "hero.title": "Azzaouia Resort",
      "hero.slogan": "Since 1678 — Moroccan authenticity at the gateway to Tazekka National Park",
      "hero.scroll": "Scroll",

      "booking.title": "Book your stay",
      "booking.checkin": "Check-in",
      "booking.checkout": "Check-out",
      "booking.adults": "Adults",
      "booking.children": "Children",
      "booking.agesLabel": "Children's ages",
      "booking.childAge": "Child age",
      "booking.summaryTitle": "Booking summary",
      "booking.ages": "Ages",
      "booking.errDates": "Please select your check-in and check-out dates.",
      "booking.errOrder": "The check-out date must be after the check-in date.",
      "booking.opening": "Opening the booking engine…",
      "booking.notConfigured": "The booking engine is not set up yet. Please call us on +212 6 61 89 35 87.",
      "booking.adultOne": "1 Adult",
      "booking.adultMany": "Adults",
      "booking.childZero": "0 Children",
      "booking.childOne": "1 Child",
      "booking.childMany": "Children",
      "booking.ageUnder1": "Under 1 year",
      "booking.yearOne": "year",
      "booking.yearMany": "years",

      "acc.eyebrow": "Stay with us",
      "acc.title": "Accommodation",
      "acc.sub": "From cosy rooms to sociable dormitories, every space blends traditional Moroccan elegance with modern comfort.",
      "acc.note": "17 rooms and suites in total: 12 double rooms, 5 suites and 2 dormitories.",
      "acc.from": "From",
      "acc.perNight": "/ night",
      "acc.capacity": "Capacity",
      "acc.rates": "Rates",
      "acc.goodToKnow": "Good to know",
      "acc.gallery": "Gallery",


      "srv.eyebrow": "Resort Services",
      "srv.title": "Our Services",
      "srv.sub": "Every detail arranged for an authentic, worry-free stay.",
      "srv.dining": "Dining",
      "srv.diningDesc": "Half board or full board, included and charged per day.",
      "srv.diningTag": "Included",
      "srv.events": "Events",
      "srv.eventsDesc": "Planning for your weddings, seminars and celebrations.",
      "srv.transport": "Transport",
      "srv.transportDesc": "Transfers and travel from Oued Amlil and the Taza region.",
      "srv.hiking": "Hiking",
      "srv.hikingDesc": "Nature outings on the trails of Tazekka National Park.",
      "srv.extra": "Extra",
      "srv.perService": "Charged per service",
      "srv.perDay": "Charged per day",

      "gal.eyebrow": "A Visual Journey",
      "gal.title": "Gallery",
      "gal.sub": "A glimpse of the beauty and authenticity of Azzaouia Resort.",
      "gal.all": "All",
      "gal.rooms": "Rooms",
      "gal.suites": "Suites",
      "gal.dorms": "Dormitories",
      "gal.grounds": "Grounds",
      "gal.capRoom": "Double Room",
      "gal.capSmallSuite": "Small Suite",
      "gal.capLargeSuite": "Large Suite",
      "gal.capFamilySuite": "Family Suite",
      "gal.capDorm": "Dormitory",
      "gal.capEstate": "The Grounds",

      "abt.eyebrow": "Our Story",
      "abt.title": "A Moroccan Sanctuary",
      "abt.p1": "Set in the village of Aïn Sahla, at the gateway to Tazekka National Park, Azzaouia Resort has carried a tradition of authentic Moroccan hospitality since 1678. Our estate pairs traditional architecture with warm comfort, for a stay that feels true and restorative.",
      "abt.p2": "Across rooms, suites and dormitories, every space tells a story of patience and care. Our team makes sure each guest feels not only welcome, but genuinely at home.",
      "abt.f1": "Traditional Moroccan architecture",
      "abt.f2": "At the gateway to Tazekka National Park",
      "abt.f3": "Authentic cuisine",
      "abt.f4": "Family hospitality since 1678",
      "abt.stat1": "Rooms & Suites",
      "abt.stat2": "Service categories",
      "abt.since": "Since",

      "tst.eyebrow": "Guest Reviews",
      "tst.title": "What Our Guests Say",
      "tst.q1": "An authentic stay from beginning to end. The quiet of Aïn Sahla and the kindness of the team stayed with us. The Small Suite was beautiful.",
      "tst.q3": "The Large Suite was spacious and comfortable for the whole family. The children loved the hikes around Tazekka park. We will be back.",
      "tst.c1": "Paris, France",
      "tst.c3": "Casablanca, Morocco",

      "loc.eyebrow": "Find Us",
      "loc.title": "Our Location",
      "loc.sub": "Ideally set in the village of Aïn Sahla, at the gateway to Tazekka National Park.",
      "loc.address": "Address",
      "loc.addressVal": "Aïn Sahla village, Bouchfaa commune, Oued Amlil district, Taza Province, Morocco",
      "loc.region": "Region",
      "loc.regionVal": "Fès-Meknès, Taza Province",
      "loc.desk": "Front desk",
      "loc.deskVal": "Open 24/7",
      "loc.access": "Access",
      "loc.accessVal": "Oued Amlil, Taza Province — transport available as an extra",
      "loc.nearby": "Nearby",
      "loc.nearbyVal": "Tazekka National Park — hiking and surrounding nature",
      "loc.mapTitle": "Map showing Azzaouia Resort in Aïn Sahla, Taza",

      "ctc.eyebrow": "Get in touch",
      "ctc.title": "Contact",
      "ctc.sub": "A question or a special request? Our team is here to help.",
      "ctc.phone": "Phone",
      "ctc.email": "Email",
      "ctc.address": "Address",
      "ctc.desk": "Front desk",
      "ctc.payment": "Payment methods",
      "ctc.paymentVal": "Cash, bank transfer, cheque",
      "ctc.formTitle": "Send us a message",
      "ctc.formSub": "Questions or special requests? We reply within 24 hours.",
      "ctc.name": "Full name",
      "ctc.message": "Message",
      "ctc.send": "Send message",
      "ctc.errFields": "Please enter your name and email.",
      "ctc.errEmail": "Please enter a valid email address.",
      "ctc.ok": "Thank you! Your message has been sent. We will reply within 24 hours.",

      "ftr.tagline": "Since 1678 — Moroccan authenticity at the gateway to Tazekka National Park",
      "ftr.quick": "Quick Links",
      "ftr.services": "Services",
      "ftr.contact": "Contact",
      "ftr.rights": "Azzaouia Resort. All rights reserved.",
      "ftr.since": "A story of hospitality since 1678"
    },

    ar: {
      "nav.home": "الرئيسية",
      "nav.accommodation": "الإقامة",
      "nav.services": "الخدمات",
      "nav.gallery": "معرض الصور",
      "nav.about": "من نحن",
      "nav.location": "الموقع",
      "nav.contact": "اتصل بنا",
      "nav.menuLabel": "فتح القائمة",
      "nav.themeLabel": "تبديل الوضع الليلي",
      "nav.langLabel": "تغيير اللغة",

      "cta.book": "احجز الآن",
      "cta.discover": "اكتشف",
      "cta.viewRooms": "اكتشف أماكن الإقامة",
      "cta.quote": "اطلب عرض سعر",
      "cta.close": "إغلاق",
      "cta.prev": "الصورة السابقة",
      "cta.next": "الصورة التالية",
      "cta.backTop": "العودة إلى الأعلى",

      "loader.text": "منتجع الزاوية",
      "hero.eyebrow": "مرحبًا بكم في عين سهلة، تازة",
      "hero.title": "منتجع الزاوية",
      "hero.slogan": "منذ 1678 — الأصالة المغربية عند مدخل المنتزه الوطني لتازكة",
      "hero.scroll": "اسحب للأسفل",

      "booking.title": "احجز إقامتك",
      "booking.checkin": "تاريخ الوصول",
      "booking.checkout": "تاريخ المغادرة",
      "booking.adults": "البالغون",
      "booking.children": "الأطفال",
      "booking.agesLabel": "أعمار الأطفال",
      "booking.childAge": "عمر الطفل",
      "booking.summaryTitle": "ملخص الحجز",
      "booking.ages": "الأعمار",
      "booking.errDates": "يرجى تحديد تاريخي الوصول والمغادرة.",
      "booking.errOrder": "يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.",
      "booking.opening": "جارٍ فتح محرك الحجز…",
      "booking.notConfigured": "لم يتم إعداد محرك الحجز بعد. يرجى الاتصال بنا على 35 87 89 61 6 212+.",
      "booking.adultOne": "بالغ واحد",
      "booking.adultMany": "بالغين",
      "booking.childZero": "بدون أطفال",
      "booking.childOne": "طفل واحد",
      "booking.childMany": "أطفال",
      "booking.ageUnder1": "أقل من سنة",
      "booking.yearOne": "سنة",
      "booking.yearMany": "سنوات",

      "acc.eyebrow": "أقم معنا",
      "acc.title": "الإقامة",
      "acc.sub": "من الغرف الدافئة إلى المهاجع الجماعية، يجمع كل فضاء بين الأناقة المغربية التقليدية والراحة العصرية.",
      "acc.note": "17 غرفة وجناحًا في المجموع: 12 غرفة مزدوجة، 5 أجنحة ومهجعان.",
      "acc.from": "ابتداءً من",
      "acc.perNight": "/ الليلة",
      "acc.capacity": "السعة",
      "acc.rates": "الأسعار",
      "acc.goodToKnow": "معلومات مفيدة",
      "acc.gallery": "الصور",


      "srv.eyebrow": "خدمات المنتجع",
      "srv.title": "خدماتنا",
      "srv.sub": "كل تفصيل مدروس من أجل إقامة أصيلة وخالية من الهموم.",
      "srv.dining": "المطعم",
      "srv.diningDesc": "إقامة بنصف أو كامل الإعاشة، مشمولة وتُحتسب يوميًا.",
      "srv.diningTag": "مشمول",
      "srv.events": "تنظيم المناسبات",
      "srv.eventsDesc": "تنظيم الأعراس والندوات والاحتفالات.",
      "srv.transport": "النقل",
      "srv.transportDesc": "التنقلات انطلاقًا من واد أمليل وجهة تازة.",
      "srv.hiking": "الرحلات الجبلية",
      "srv.hikingDesc": "خرجات في الطبيعة على مسالك المنتزه الوطني لتازكة.",
      "srv.extra": "خدمة إضافية",
      "srv.perService": "تُحتسب لكل خدمة",
      "srv.perDay": "تُحتسب يوميًا",

      "gal.eyebrow": "جولة بالصور",
      "gal.title": "معرض الصور",
      "gal.sub": "لمحة عن جمال وأصالة منتجع الزاوية.",
      "gal.all": "الكل",
      "gal.rooms": "الغرف",
      "gal.suites": "الأجنحة",
      "gal.dorms": "المهاجع",
      "gal.grounds": "المنتجع",
      "gal.capRoom": "غرفة مزدوجة",
      "gal.capSmallSuite": "جناح صغير",
      "gal.capLargeSuite": "جناح كبير",
      "gal.capFamilySuite": "جناح عائلي",
      "gal.capDorm": "المهجع",
      "gal.capEstate": "فضاء المنتجع",

      "abt.eyebrow": "قصتنا",
      "abt.title": "ملاذ مغربي",
      "abt.p1": "يقع منتجع الزاوية في قرية عين سهلة عند مدخل المنتزه الوطني لتازكة، ويواصل منذ سنة 1678 تقليد الضيافة المغربية الأصيلة. يجمع فضاؤنا بين العمارة التقليدية والراحة الدافئة، من أجل تجربة صادقة تعيد الحيوية.",
      "abt.p2": "بين الغرف والأجنحة والمهاجع، يحكي كل فضاء قصة من الصبر والعناية. يحرص فريقنا على أن يشعر كل ضيف بأنه في بيته حقًا.",
      "abt.f1": "عمارة مغربية تقليدية",
      "abt.f2": "عند مدخل المنتزه الوطني لتازكة",
      "abt.f3": "مطبخ أصيل",
      "abt.f4": "ضيافة عائلية منذ 1678",
      "abt.stat1": "غرفة وجناحًا",
      "abt.stat2": "فئات الخدمات",
      "abt.since": "منذ",

      "tst.eyebrow": "آراء ضيوفنا",
      "tst.title": "ماذا يقول ضيوفنا",
      "tst.q1": "إقامة أصيلة من البداية إلى النهاية. هدوء عين سهلة ولطف الفريق تركا فينا أثرًا. الجناح الصغير كان رائعًا.",
      "tst.q3": "كان الجناح الكبير واسعًا ومريحًا للعائلة بأكملها. أحب الأطفال الرحلات حول منتزه تازكة. سنعود بالتأكيد.",
      "tst.c1": "باريس، فرنسا",
      "tst.c3": "الدار البيضاء، المغرب",

      "loc.eyebrow": "كيف تصل إلينا",
      "loc.title": "موقعنا",
      "loc.sub": "موقع مثالي في قرية عين سهلة، عند مدخل المنتزه الوطني لتازكة.",
      "loc.address": "العنوان",
      "loc.addressVal": "قرية عين سهلة، جماعة بوشفاعة، دائرة واد أمليل، إقليم تازة، المغرب",
      "loc.region": "الجهة",
      "loc.regionVal": "فاس مكناس، إقليم تازة",
      "loc.desk": "الاستقبال",
      "loc.deskVal": "مفتوح 24 ساعة، 7 أيام في الأسبوع",
      "loc.access": "الوصول",
      "loc.accessVal": "واد أمليل، إقليم تازة — النقل متاح كخدمة إضافية",
      "loc.nearby": "بالقرب منا",
      "loc.nearbyVal": "المنتزه الوطني لتازكة — رحلات وطبيعة محيطة",
      "loc.mapTitle": "خريطة تُظهر موقع منتجع الزاوية بعين سهلة، تازة",

      "ctc.eyebrow": "تواصل معنا",
      "ctc.title": "اتصل بنا",
      "ctc.sub": "لديكم سؤال أو طلب خاص؟ فريقنا في خدمتكم.",
      "ctc.phone": "الهاتف",
      "ctc.email": "البريد الإلكتروني",
      "ctc.address": "العنوان",
      "ctc.desk": "الاستقبال",
      "ctc.payment": "وسائل الأداء",
      "ctc.paymentVal": "نقدًا، تحويل بنكي، شيك",
      "ctc.formTitle": "أرسل لنا رسالة",
      "ctc.formSub": "أسئلة أو طلبات خاصة؟ نجيب خلال 24 ساعة.",
      "ctc.name": "الاسم الكامل",
      "ctc.message": "الرسالة",
      "ctc.send": "إرسال الرسالة",
      "ctc.errFields": "يرجى إدخال الاسم والبريد الإلكتروني.",
      "ctc.errEmail": "يرجى إدخال بريد إلكتروني صالح.",
      "ctc.ok": "شكرًا لكم! تم إرسال رسالتكم. سنجيب خلال 24 ساعة.",

      "ftr.tagline": "منذ 1678 — الأصالة المغربية عند مدخل المنتزه الوطني لتازكة",
      "ftr.quick": "روابط سريعة",
      "ftr.services": "الخدمات",
      "ftr.contact": "اتصل بنا",
      "ftr.rights": "منتجع الزاوية. جميع الحقوق محفوظة.",
      "ftr.since": "قصة ضيافة منذ 1678"
    }
  };

  var current = DEFAULT_LANG;
  var listeners = [];

  function t(key, lang) {
    var l = lang || current;
    var table = DICT[l] || DICT[DEFAULT_LANG];
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    if (Object.prototype.hasOwnProperty.call(DICT[DEFAULT_LANG], key)) return DICT[DEFAULT_LANG][key];
    return key;
  }

  /* Pick a translated value out of a data object such as { fr, en, ar } */
  function pick(obj) {
    if (!obj) return "";
    return obj[current] || obj[DEFAULT_LANG] || "";
  }

  /* Set to true to also honour the visitor's browser language on a first
     visit. French stays the site default when this is false. */
  var AUTO_DETECT_BROWSER_LANG = false;

  function detect() {
    /* 1. an explicit choice always wins, and carries across pages */
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      stored = null;
    }
    if (stored && LANGS[stored]) return stored;

    /* 2. ?lang=en in the URL, useful for campaign links */
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl && LANGS[fromUrl]) return fromUrl;

    /* 3. browser language, when enabled */
    if (AUTO_DETECT_BROWSER_LANG) {
      var nav = (navigator.language || "").slice(0, 2).toLowerCase();
      if (LANGS[nav]) return nav;
    }

    return DEFAULT_LANG;
  }

  function applyToDom(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    scope.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (rule) {
        var parts = rule.split(":");
        if (parts.length !== 2) return;
        el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  /* Change language without reloading the page. */
  function set(lang) {
    if (!LANGS[lang]) lang = DEFAULT_LANG;
    current = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private browsing — the language still applies for this session */
    }

    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", LANGS[lang].dir);
    html.setAttribute("data-lang", lang);

    applyToDom();
    listeners.forEach(function (fn) {
      fn(lang);
    });
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function get() {
    return current;
  }

  function dir() {
    return LANGS[current].dir;
  }

  return {
    LANGS: LANGS,
    t: t,
    pick: pick,
    set: set,
    get: get,
    dir: dir,
    detect: detect,
    onChange: onChange,
    applyToDom: applyToDom
  };
})();
