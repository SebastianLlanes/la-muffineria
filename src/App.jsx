import { useState } from 'react'
import { CartProvider } from '@context/CartContext'
import Navbar      from '@components/layout/Navbar/Navbar'
import Footer      from '@components/layout/Footer/Footer'
import Hero        from '@components/sections/Hero/Hero'
import About       from '@components/sections/About/About'
import Contact     from '@components/sections/Contact/Contact'
import ProductGrid from '@features/products/ProductGrid/ProductGrid'
import CartDrawer  from '@features/cart/CartDrawer/CartDrawer'
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
          <Hero />
          <ProductGrid />
          <About />
          <Contact />
        </main>

        <Footer />

        <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      </div>
    </CartProvider>
  )
}

export default App
