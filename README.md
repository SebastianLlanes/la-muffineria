# La Muffinería 🧁

> *De otra semilla. Del mismo amor.*

E-commerce de muffins artesanales con pedidos vía WhatsApp.

---

## Stack

- **React 18** + **Vite 5**
- **CSS Modules** + `variables.css` (design tokens)
- Sin librerías de estado externas (Context + useReducer)
- Mobile-first

---

## Setup

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build producción
npm run build
```

---

## Estructura

```
src/
├── styles/
│   ├── variables.css      ← TODOS los design tokens (paleta, tipografía, espaciados)
│   └── global.css         ← Reset + base styles + animaciones globales
│
├── assets/
│   ├── images/            ← Imágenes de productos y marca
│   └── icons/             ← SVGs de iconos
│
├── context/
│   └── CartContext.jsx    ← Estado global del carrito (useReducer + localStorage)
│
├── hooks/
│   ├── useCart.js         ← Hook para consumir CartContext
│   └── useScrollReveal.js ← Animaciones al hacer scroll
│
├── data/
│   └── products.js        ← Catálogo de productos (source of truth)
│
├── utils/
│   ├── whatsapp.js        ← buildWhatsAppURL() — genera el link del pedido
│   └── formatPrice.js     ← Formato de precios en ARS
│
├── components/
│   ├── layout/
│   │   ├── Navbar/        ← Sticky, con badge del carrito (bottom nav en mobile)
│   │   ├── Footer/
│   │   └── Layout/        ← Wrapper con container
│   ├── ui/                ← Componentes atómicos reutilizables
│   │   ├── Button/
│   │   ├── Badge/
│   │   └── Modal/
│   └── sections/          ← Secciones de la página
│       ├── Hero/
│       ├── About/
│       └── Contact/
│
├── features/
│   ├── cart/              ← Todo lo del carrito
│   │   ├── CartDrawer/    ← Bottom sheet (mobile) / sidebar (desktop)
│   │   ├── CartItem/      ← Item individual en el carrito
│   │   └── CartSummary/   ← Resumen + botón de pedido WhatsApp
│   └── products/          ← Todo lo del catálogo
│       ├── ProductCard/   ← Tarjeta de producto
│       ├── ProductGrid/   ← Grilla con filtros
│       └── CategoryFilter/← Filtro por categoría
│
├── App.jsx
└── main.jsx
```

---

## Aliases de importación

Configurados en `vite.config.js`:

```js
import { useCart }       from '@hooks/useCart'
import { formatPrice }   from '@utils/formatPrice'
import { products }      from '@data/products'
import { CartProvider }  from '@context/CartContext'
```

---

## Paleta de colores

| Token              | Valor     | Uso                        |
|--------------------|-----------|----------------------------|
| `--brand-primary`  | Verde Oliva `#6B7A4E` | Color identidad, CTAs       |
| `--brand-secondary`| Rosa Viejo `#B8735A`  | Acento, highlights          |
| `--brand-warm`     | Trigo `#C9B070`       | Bordes, fondos cálidos      |
| `--brand-dark`     | Cacao `#7A5240`       | Textos oscuros              |
| `--brand-bg`       | Crema `#FDF8F0`       | Background principal        |

---

## Variables de entorno

Actualizar el número de WhatsApp en `src/utils/whatsapp.js`:

```js
const WHATSAPP_NUMBER = '5493482608105' // ← número real aquí
```

---

## Roadmap

- [x] Paso 1: Scaffold + variables + CartContext + utils
- [ ] Paso 2: Navbar (mobile-first con badge)
- [ ] Paso 3: ProductCard + ProductGrid
- [ ] Paso 4: CategoryFilter
- [ ] Paso 5: CartDrawer (bottom sheet)
- [ ] Paso 6: CartSummary + WhatsApp order
- [ ] Paso 7: Hero, About, Contact
- [ ] Paso 8: Polish y animaciones
