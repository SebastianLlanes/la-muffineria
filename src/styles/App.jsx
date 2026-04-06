import { useState } from 'react'
import { CartProvider } from '@context/CartContext'
import Navbar from '@components/layout/Navbar/Navbar'
import ProductGrid from '@features/products/ProductGrid/ProductGrid'

// import Hero     from '@components/sections/Hero/Hero'
// import About    from '@components/sections/About/About'
// import Contact  from '@components/sections/Contact/Contact'
// import CartDrawer from '@features/cart/CartDrawer/CartDrawer'

import styles from './App.module.css'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  function openCart()  { setIsCartOpen(true)  }
  function closeCart() { setIsCartOpen(false) }

  return (
    <CartProvider>
      <div className={styles.app}>

        <Navbar onCartClick={openCart} />

        <main className={styles.main}>

          {/* Placeholder Hero */}
          <section id="inicio" className={styles.heroPlaceholder}>
            <h1>La Muffinería 🧁</h1>
            <p><em>De otra semilla. Del mismo amor.</em></p>
          </section>

          {/* ✅ Paso 3: Productos */}
          <ProductGrid />

          <section id="nosotros" className={styles.sectionPlaceholder}>
            <p className={styles.comingSoon}>Sección Nosotros — próximo paso</p>
          </section>

          <section id="contacto" className={`${styles.sectionPlaceholder} ${styles.sectionAlt}`}>
            <p className={styles.comingSoon}>Sección Contacto — próximo paso</p>
          </section>

        </main>

        {/* <CartDrawer isOpen={isCartOpen} onClose={closeCart} /> */}

      </div>
    </CartProvider>
  )
}

export default App
