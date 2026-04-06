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
 *   id:            string   — único, para el carrito
 *   name:          string   — nombre del sabor
 *   category:      string   — 'clasicos' | 'integrales' | 'sin-gluten' | 'especiales'
 *   description:   string   — descripción corta (1-2 frases)
 *   price:         number   — precio en ARS (con harinas alternativas estándar)
 *   priceGlutenFree: number | null — precio variante sin TACC (si aplica)
 *   image:         string   — ruta relativa desde /public/images/
 *   available:     boolean  — si está disponible para pedir
 *   tags:          string[] — etiquetas para filtros adicionales
 *   featured:      boolean  — si aparece destacado en el Hero
 * }
 */

export const CATEGORIES = [
  { id: 'todos',      label: 'Todos' },
  { id: 'clasicos',   label: 'Clásicos' },
  { id: 'integrales', label: 'Integrales' },
  { id: 'sin-gluten', label: 'Sin TACC' },
  { id: 'especiales', label: 'Especiales' },
]

export const products = [
  {
    id: 'muf-001',
    name: 'Arándanos & Avena',
    category: 'clasicos',
    description: 'El hit de la casa. Arándanos frescos con avena entera y un toque de vainilla.',
    price: 1200,
    priceGlutenFree: 1600,
    image: '/images/arandanos-avena.jpg',
    available: true,
    tags: ['sin-gluten-disponible'],
    featured: true,
  },
  {
    id: 'muf-002',
    name: 'Chocolate & Cacao',
    category: 'clasicos',
    description: 'Para los chocolateros. Chips de cacao amargo y harina de almendra.',
    price: 1300,
    priceGlutenFree: 1700,
    image: '/images/chocolate-cacao.jpg',
    available: true,
    tags: ['sin-gluten-disponible', 'vegano'],
    featured: true,
  },
  {
    id: 'muf-003',
    name: 'Banana & Nuez',
    category: 'integrales',
    description: 'Con plátano maduro natural y nueces enteras. Sin azúcar refinada.',
    price: 1150,
    priceGlutenFree: null,
    image: '/images/banana-nuez.jpg',
    available: true,
    tags: ['sin-azucar-refinada'],
    featured: false,
  },
  {
    id: 'muf-004',
    name: 'Zanahoria & Coco',
    category: 'integrales',
    description: 'Zanahoria rallada, coco deshidratado y canela. Dulce natural y esponjoso.',
    price: 1150,
    priceGlutenFree: 1550,
    image: '/images/zanahoria-coco.jpg',
    available: true,
    tags: ['sin-gluten-disponible', 'vegano'],
    featured: false,
  },
  {
    id: 'muf-005',
    name: 'Limón & Semillas de Amapola',
    category: 'sin-gluten',
    description: 'Fresco, cítrico, y con esa textura única de las semillas de amapola. 100% sin TACC.',
    price: 1600,
    priceGlutenFree: null, // este ya es sin gluten
    image: '/images/limon-amapola.jpg',
    available: true,
    tags: ['sin-gluten', 'sin-lactosa'],
    featured: true,
  },
  {
    id: 'muf-006',
    name: 'Manzana & Canela',
    category: 'sin-gluten',
    description: 'Manzana verde caramelizada con canela y harina de arroz. Irresistible.',
    price: 1600,
    priceGlutenFree: null,
    image: '/images/manzana-canela.jpg',
    available: true,
    tags: ['sin-gluten'],
    featured: false,
  },
  {
    id: 'muf-007',
    name: 'Brownie de Remolacha',
    category: 'especiales',
    description: 'El especial de temporada. Remolacha asada, chocolate amargo y aceite de oliva.',
    price: 1450,
    priceGlutenFree: 1850,
    image: '/images/brownie-remolacha.jpg',
    available: true,
    tags: ['sin-gluten-disponible', 'vegano', 'especial-temporada'],
    featured: true,
  },
  {
    id: 'muf-008',
    name: 'Matcha & Almendra',
    category: 'especiales',
    description: 'Matcha japonés de calidad ceremonial con harina de almendra. Delicado y único.',
    price: 1550,
    priceGlutenFree: null,
    image: '/images/matcha-almendra.jpg',
    available: false, // temporalmente sin stock
    tags: ['sin-gluten', 'sin-lactosa'],
    featured: false,
  },
]

/**
 * Filtra el catálogo por categoría.
 * @param {string} categoryId
 * @returns {Array}
 */
export function getProductsByCategory(categoryId) {
  if (categoryId === 'todos') return products
  return products.filter(p => p.category === categoryId)
}

/**
 * Devuelve solo los productos destacados para el Hero.
 * @returns {Array}
 */
export function getFeaturedProducts() {
  return products.filter(p => p.featured && p.available)
}
