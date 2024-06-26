import useCartStore from '../store/cartStore';
import { computeTotal } from '../utils/cartUtils'
import checkIcon from '../assets/images/checkout/icon-order-confirmation.svg'
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext'
import {useNavigate} from 'react-router-dom';

export default function Confirmation() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const {overallTotal } = computeTotal(cart);
  const { isConfirmationOpen, setIsConfirmationOpen, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsConfirmationOpen(false)
    closeModal()
    clearCart()
    navigate('/Audiophile/')
  }

  return (
    <div className={isConfirmationOpen ? 'confirmation-modal active' : 'confirmation-modal'}>
      <div className="confirmation">
        <p><img src={checkIcon} alt="check icon" /></p>
        <h2 className="title-02">THANK YOU<br/>FOR YOUR ORDER</h2>
        <p className="text-02 text-dark-gray">You will receive an email confirmation shortly.</p>
        <div className="purchase">
          <ul className='purchase-list'>
            {cart.map((item) => (
              <li key={item.id} className='item'>
                <div className="flex-01">
                  <div className=" flex-01">
                    <p className='item-image'><img src={item.cartImage} alt={item.name} /></p>
                    <div>
                    <p className='text-02 text-black'>{item.shortName}</p>
                    <p className='text-02 text-dark-gray'>${item.price}</p>
                  </div>
                  </div>
                  <div className="text-02 text-dark-gray">x{item.quantity}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="purchase-total">
          <p className='text-02 text-gray'>GRAND TOTAL</p>
            <p className='title-06'>${overallTotal}</p>
          </div>
        </div>
        <button className='btn btn-orange btn-full' onClick={handleSubmit}>BACK TO HOME</button>
      </div>
    </div>
  )
}
