/*
 * data/products.js
 *
 * Source of truth del catálogo de La Muffinería.
 * Por ahora son datos locales. Cuando escale, esta
 * capa se reemplaza por una llamada a Firestore sin
 * tocar ningún componente.
 *
 * Estructura de un producto:
 * {
 *   id:              string   — único, para el carrito
 *   name:            string   — nombre del sabor
 *   category:        string   — 'clasicos' | 'integrales' | 'sin-gluten' | 'especiales'
 *   description:     string   — descripción corta (1-2 frases)
 *   price:           number   — precio en ARS (con harinas alternativas estándar)
 *   priceGlutenFree: number | null — precio variante sin TACC (si aplica)
 *   image:           string   — ruta relativa desde /public/images/
 *   available:       boolean  — si está disponible para pedir
 *   aptoDiabeticoDisponible: boolean — si el producto tiene disponible la variante sin azúcar / apto diabético
 *   tags:            string[] — etiquetas para filtros adicionales
 *   featured:        boolean  — si aparece destacado en el Hero
 *   proximamente:    boolean  — si es un teaser de lanzamiento (imagen blureada, sin precio)
 *   teaserText:      string   — texto de intriga que reemplaza la descripción (solo si proximamente: true)
 * }
 */


export const products = [
  // Agregar al array products (posición no importa, ProductGrid lo pone primero solo)
  {
    id: "muf-009",
    name: "???",
    category: "especiales",
    description: "",
    teaserText:
      "Dos versiones de un mismo secreto. Elegís bando cuando lleguen.",
    price: 0,
    image: "/images/placeholder-muffin.jpg",
    available: false,
    aptoDiabeticoDisponible: false,
    proximamente: true,
    tags: [],
    featured: false,
  },
  // {
  //   id: "muf-009",
  //   name: "Red Velvet",
  //   category: "especiales",
  //   description:
  //     "Harina de almendras a base de remolacha, con chips de chocolate blanco. No es magia. Es remolacha.",
  //   price: 3500,
  //   image: "/images/red-velvet.png",
  //   available: true,
  //   aptoDiabeticoDisponible: true,
  //   tags: ["remolacha", "harina-de-almendras", "chocolate-blanco", "novedad"],
  //   featured: true,
  // },
  // {
  //   id: "muf-010",
  //   name: "Red Velvet Dark",
  //   category: "especiales",
  //   description:
  //     "La versión intensa: chocolate amargo y avellanas como protagonistas, sin chips.",
  //   price: 4300,
  //   image: "/images/red-velvet-dark.png",
  //   available: true,
  //   aptoDiabeticoDisponible: true,
  //   tags: ["remolacha", "harina-de-almendras", "chocolate-amargo", "avellanas", "novedad"],
  //   featured: true,
  // },
  {
    id: "muf-008",
    name: "Limón, Pera & Nueces",
    category: "sin-gluten",
    description:
      "Harina de almendras, Pera jugosa, ralladura y jugo de Limón, Nueces. Suave, cítrico y con ese crunch que no falla.",
    price: 2400,
    image: "/images/limon-pera-nueces.png",
    available: true,
    aptoDiabeticoDisponible: true,
    tags: ["sin-gluten", "especial-temporada", "harina-de-almendras"],
    featured: true,
  },
  {
    id: "muf-007",
    name: "Banana Split",
    category: "especiales",
    description:
      "Banana en la masa, corazón de dulce de leche y frosting de coco. Un banana split que no necesita cuchara.",
    price: 2400,
    image: "/images/bananasplit-img.png",
    available: true,
    aptoDiabeticoDisponible: false,
    tags: ["sin-gluten"],
    featured: true,
  },
  {
    id: "muf-006",
    name: "Carrot Cake",
    category: "sin-gluten",
    description:
      "Zanahoria, ralladura de naranja, canela y almendras garrapiñadas. Cálido, con textura y ese toque cítrico que no te esperás.",
    price: 2400,
    image: "/images/carrot-cake.png",
    available: true,
    aptoDiabeticoDisponible: true,
    tags: ["sin-gluten", "almendras"],
    featured: true,
  },
  {
    id: "muf-001",
    name: "Limón & Amapola",
    category: "clasicos",
    description:
      "Cítrico, aromático y con esa textura única de las semillas de amapola.",
    price: 2400,
    image: "/images/limon-amapolas-45degree.png",
    available: true,
    aptoDiabeticoDisponible: true,
    tags: ["sin-gluten", "harina-de-almendras", "especial-temporada"],
    featured: true,
  },
  {
    id: "muf-002",
    name: "Lentejas, Cacao & Chips",
    category: "especiales",
    description:
      "El increíble. No vas a poder creer que está hecho full lentejas. Toque generoso de chips de cacao amargo.",
    price: 2400,
    image: "/images/lenteja-cacao-chips.png",
    available: true,
    aptoDiabeticoDisponible: true,
    tags: ["sin-gluten", "alto-proteico", "base-legumbres"],
    featured: true,
  },
  {
    id: "muf-003",
    name: "Limón & Arándanos",
    category: "clasicos",
    description:
      "El hit de la casa. Harina de almendras, arándanos frescos y un toque de limón.",
    price: 2400,
    image: "/images/limon-arandanos.png",
    available: true,
    aptoDiabeticoDisponible: true,
    tags: ["sin-gluten", "harina-de-almendras", "especial-temporada"],
    featured: true,
  },
  {
    id: "muf-004",
    name: "Naranja & Chips",
    category: "especiales",
    description:
      "Ralladura de naranja fresca con chips de chocolate. Esponjoso, perfumado y sin culpa.",
    price: 2400,
    image: "/images/naranja-chips.png",
    available: true,
    aptoDiabeticoDisponible: true,
    tags: ["sin-gluten", "harina-de-almendras", "especial-temporada"],
    featured: true,
  },
  {
    id: "muf-005",
    name: "Lentejas, Cacao & Nueces",
    category: "sin-gluten",
    description:
      "Base de lentejas con cacao puro y nueces enteras. Húmedo e intenso.",
    price: 2400,
    image: "/images/lentejas-cacao-nueces.png",
    available: true,
    aptoDiabeticoDisponible: true,
    tags: ["sin-gluten", "alto-proteico", "base-legumbres"],
    featured: true,
  },
];

/**
 * Devuelve solo los productos destacados para el Hero.
 * @returns {Array}
 */
export function getFeaturedProducts() {
  return products.filter(p => p.featured && p.available)
}
