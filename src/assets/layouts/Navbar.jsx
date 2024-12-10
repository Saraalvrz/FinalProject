import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Cart from '../components/cart/Cart'
import CartIcon from '../img/cartIcon.png'
import './Navbar.css'

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);


    return (
        <>
            <nav>
                <ul className='lista'>
                    <Link to="/" className='enlaces'>Inicio</Link>
                    <Link to="/Products" className='enlaces'>Productos</Link>

                    <div className='categories h6' onClick={toggleDropdown}>Categorías</div>
                    {isDropdownOpen && (
                        <ul className='secciones'>
                            <Link to="/bycategory/Ropa" className='section'>Ropa</Link>
                            <Link to="/byCategory/Shoes" className='section'>Electrónicos</Link>
                            <Link to="/byCategory/Miscellaneous" className='section'>Variedades</Link>
                        </ul>
                    )}
                    <li className="nav-item mt-3 cart-icon position-fixed " onClick={toggleModal}>
                        <img src={CartIcon} alt="Cart" className="cart-icon-img" />
                    </li>
                </ul>
            </nav>

             {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay carrito">
          <div className="modal-content">
            <button className="close-modal bg-light text-dark" onClick={toggleModal}>X</button>
            <Cart /> {/* Renderizamos el componente Cart dentro del modal */}
          </div>
        </div>
      )}
        </>
    )
}

export default Navbar   