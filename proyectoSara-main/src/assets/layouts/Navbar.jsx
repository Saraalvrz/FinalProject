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
                    <Link to="/">Inicio</Link>
                    <Link to="/Products">Productos</Link>

                    <div onClick={toggleDropdown}>Categorías</div>
                    {isDropdownOpen && (
                        <ul className="secciones">
                            <Link to="/bycategory/Men">Hombre</Link>
                            <Link to="/byCategory/Women">Mujer</Link>
                            <Link to="/byCategory/accesories">Accesorios</Link>
                        </ul>
                    )}
                    <li className="nav-item cart-icon" onClick={toggleModal}>
                        <img src={CartIcon} alt="Cart" className="cart-icon-img" />
                    </li>
                </ul>
            </nav>

             {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>X</button>
            <Cart /> {/* Renderizamos el componente Cart dentro del modal */}
          </div>
        </div>
      )}
        </>
    )
}

export default Navbar