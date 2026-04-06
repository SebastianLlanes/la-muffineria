import { useState, useEffect, useRef } from 'react'
import { useCart } from '@hooks/useCart'
import styles from './Navbar.module.css'

/*
 * Navbar — Mobile-first
 *
 * Mobile:  [Logo]              [cart-icon + badge]
 * Desktop: [Logo] [nav-links]  [cart-icon + badge]
 *
 * Props:
 *   onCartClick  fn   — abre el CartDrawer
 */

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio'   },
  { label: 'Productos', href: '#productos' },
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Contacto',  href: '#contacto'  },
]

export default function Navbar({ onCartClick }) {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeLink, setActiveLink] = useState('#inicio')
  const menuRef = useRef(null)

  // Sombra al hacer scroll
  useEffect(function handleScroll() {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return function cleanup() {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Cerrar menú mobile al hacer click fuera
  useEffect(function handleClickOutside() {
    if (!menuOpen) return
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return function cleanup() {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [menuOpen])

  // Cerrar menú mobile al hacer scroll
  useEffect(function closeMenuOnScroll() {
    if (!menuOpen) return
    function onScroll() { setMenuOpen(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return function cleanup() {
      window.removeEventListener('scroll', onScroll)
    }
  }, [menuOpen])

  // Bloquear scroll del body cuando el menú mobile está abierto
  useEffect(function lockBodyScroll() {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return function cleanup() {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function handleNavClick(href) {
    setActiveLink(href)
    setMenuOpen(false)
  }

  function handleCartClick() {
    setMenuOpen(false)
    onCartClick()
  }

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        ref={menuRef}
      >
        <div className={styles.inner}>

          {/* ── Hamburger (solo mobile) ── */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={function() { setMenuOpen(!menuOpen) }}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>

          {/* ── Logo / Marca ── */}
          <a href="#inicio" className={styles.logo} onClick={function() { handleNavClick('#inicio') }}>
            <span className={styles.logoIcon}>🧁</span>
            <span className={styles.logoText}>La Muffinería</span>
          </a>

          {/* ── Nav links (desktop) ── */}
          <nav className={styles.desktopNav} aria-label="Navegación principal">
            <ul className={styles.navList}>
              {NAV_LINKS.map(function(link) {
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`${styles.navLink} ${activeLink === link.href ? styles.navLinkActive : ''}`}
                      onClick={function() { handleNavClick(link.href) }}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ── Cart button ── */}
          <button
            className={styles.cartButton}
            onClick={handleCartClick}
            aria-label={`Carrito de compras${itemCount > 0 ? `, ${itemCount} items` : ''}`}
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

        </div>

        {/* ── Menú mobile (dropdown) ── */}
        <nav
          id="mobile-menu"
          className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
          aria-hidden={!menuOpen}
          aria-label="Menú mobile"
        >
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(function(link) {
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${styles.mobileNavLink} ${activeLink === link.href ? styles.mobileNavLinkActive : ''}`}
                    onClick={function() { handleNavClick(link.href) }}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className={styles.mobileDivider} />

          <p className={styles.mobileCatchphrase}>
            <em>De otra semilla. Del mismo amor.</em>
          </p>
        </nav>
      </header>

      {/* Overlay detrás del menú mobile */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={function() { setMenuOpen(false) }}
          aria-hidden="true"
        />
      )}
    </>
  )
}

/* ── Icono del carrito como componente interno ── */
function CartIcon() {
  return (
    <svg
      className={styles.cartIcon}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}
