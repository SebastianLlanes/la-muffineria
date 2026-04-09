import { useState } from 'react'
import SplashScreen from './components/SplashScreen/SplashScreen'
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
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = () => {
    setSplashDone(true);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  function openCart() {
    setIsCartOpen(true);
  }
  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <CartProvider>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
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
  );
}

export default App
