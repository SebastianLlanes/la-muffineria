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
 *   tags:            string[] — etiquetas para filtros adicionales
 *   featured:        boolean  — si aparece destacado en el Hero
 *   proximamente:    boolean  — si es un teaser de lanzamiento (imagen blureada, sin precio)
 *   teaserText:      string   — texto de intriga que reemplaza la descripción (solo si proximamente: true)
 * }
 */


export const products = [
  {
  id: "muf-007",
  name: "Banana Split",       // ← el nombre
  category: "especiales",
  description: "Banana en la masa, corazón de dulce de leche y frosting de coco. Un banana split que no necesita cuchara.",    // ← la descripción
  price: 2400,                         // ← el precio
  image: "/images/bananasplit-img.png",  // ← la imagen real
  available: true,                     // ← true
  tags: ["sin-gluten", "novedad" ],                // ← los tags que correspondan
  featured: false,
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
    tags: ["sin-gluten", "novedad", "almendras"],
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
    tags: [
      "sin-gluten",
      "sin-azucar-refinada",
      "harina-de-almendras",
      "especial-temporada",
    ],
    featured: false,
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
    tags: ["sin-gluten", "harina-de-almendras", "especial-temporada"],
    featured: false,
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
