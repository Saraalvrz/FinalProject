// Home.jsx
import React, { useState, useEffect } from 'react';
import Footer from '../../layouts/footer';
import ApiComponent from '../../components/Api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);

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

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 6); 
    };

    return (
        <div>
            <main>
                <div className="header-container">
                    <div className="header-image-container">
                        <img 
                            src="https://via.placeholder.com/1500x800" 
                            alt="Logo Maxfit" 
                            className="header-image" 
                        />
                        <h1 className="header-title">Bienvenido a Maxfit</h1>
                    </div>
                </div>
                <h2>Productos Destacados</h2>
                {error ? (
                    <p>Error al cargar los productos. Por favor, inténtelo más tarde.</p>
                ) : (
                    <div className="products-container">
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

                <h2>Quienes somos</h2>
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
