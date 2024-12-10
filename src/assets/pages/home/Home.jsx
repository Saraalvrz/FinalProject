import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import Footer from '../../layouts/footer';
import ApiComponent from '../../components/Api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);

    const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

    useEffect(() => {
        const loadData = async () => {
            try {
                const { products, users } = await ApiComponent();
                if (Array.isArray(products) && Array.isArray(users)) {
                    setProducts(products);
                    setUsers(users);
                } else {
                    throw new Error('Formato de datos incorrecto');
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError(true);
            }
        };
        loadData();
    }, []);

    const displayedProducts = products.slice(0, 6);
    const displayedUsers = users.slice(0, 3);

    // Esta función redirige a la página de productos cuando se hace clic
    const handleSeeMore = () => {
        navigate('/products');
    };

    return (
        <div>
            <main>
                <div className="header-container">
                    <div className="header-image-container">
                        <img 
                            src="src\assets\img\homeImage.jpg" 
                            alt="Logo Maxfit" 
                            className="header-image" 
                        />
                       
                    </div>
                </div>
                <h1 className='m-5'>Productos Destacados</h1>
                {error ? (
                    <p>Error al cargar los productos. Por favor, inténtelo más tarde.</p>
                ) : (
                    <div className="products-container d-flex flex-wrap wrap center">
                        {displayedProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img 
                                    src={product.images?.[0] || 'https://via.placeholder.com/300'} 
                                    alt={product.title || 'Producto sin título'} 
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h2 className="product-title">{product.title || 'Sin título'}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                   <button onClick={handleSeeMore} className='boton'>Ver más productos</button>
                </div>

                <h2>¿Quiénes somos?</h2>
                {error ? (
                    <p>Error al cargar los usuarios. Por favor, inténtelo más tarde.</p>
                ) : (
                    <div className="users-container">
                        {displayedUsers.map((user) => (
                            <div key={user.id} className="user-image-container">
                                <img 
                                    src={user.avatar || 'https://via.placeholder.com/150'} 
                                    alt={user.name || 'Usuario sin nombre'} 
                                    className="user-image"
                                />
                                <div className="user-info">
                                    <h2 className="user-name">{user.name || 'Sin nombre'}</h2>
                                    <p className="user-description">{user.email || 'No disponible'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
};

export default Home;
