import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '/Audiophile/images/shared/desktop/logo.svg'
import cartIcon from '/Audiophile/images/shared/desktop/icon-cart.svg'
import burgerMenu from '/Audiophile/images/shared/tablet/icon-hamburger.svg'
import burgerMenuClose from '/Audiophile/images/shared/tablet/icon-close-menu.svg'
import CategoryList from './CategoryList'
import { NavContext } from '../context/NavContext'
import { ModalContext } from '../context/ModalContext'
import Modal from '../components/Modal'
import useCartStore from '../store/cartStore'

export default function Header() {
  const [activeLink, setActiveLink] = useState('home')
  const { isNavOpen, navToggle, closeNav } = useContext(NavContext)
  const { isModalOpen, ModalToggle, closeModal } = useContext(ModalContext)
  const cart = useCartStore((state) => state.cart)

  const handleClick = (link) => {
    setActiveLink(link)
    closeModal()
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
          <div className="menu hide-on-tablet"><img onClick={() => {navToggle(); closeModal()}} src={!isNavOpen ? burgerMenu : burgerMenuClose} alt="menu icon" /></div>
          <div className="logo"><Link to="/Audiophile/" onClick={() => { closeModal(); closeNav() }}><img src={logo} alt="audiophile logo" /></Link></div>
          <div className='pc-only'>
            <ul className="nav-links">
              <li><Link className={activeLink === 'home' ? 'active' : ''} onClick={() => handleClick('home')} to="/Audiophile/">HOME</Link></li>
              <li><Link className={activeLink === 'headphones' ? 'active' : ''} onClick={() => handleClick('headphones')} to="/Audiophile/category/headphones">HEADPHONES</Link></li>
              <li><Link className={activeLink === 'speakers' ? 'active' : ''} onClick={() => handleClick('speakers')} to="/Audiophile/category/speakers">SPEAKERS</Link></li>
              <li><Link className={activeLink === 'earphones' ? 'active' : ''} onClick={() => handleClick('earphones')} to="/Audiophile/category/earphones">EARPHONES</Link></li>
            </ul>
          </div>
          <div className="cart-btn" onClick={() => {ModalToggle(); closeNav()}}>{cart.length ? <span className='cart-count'>{cart.length}</span> : ''}<img src={cartIcon} alt="cart icon" /></div>
        </div>
      </div>
      {isNavOpen ?  <div className="menu-wrap"><CategoryList /></div>: null}
      {isModalOpen ? <Modal open={'openCart'}/> : null}
    </>
  )
}
