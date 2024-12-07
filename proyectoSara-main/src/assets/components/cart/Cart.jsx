import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Función para eliminar duplicados y agrupar productos
  const normalizeCart = (items) => {
    const groupedCart = items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        // Si ya existe, incrementamos la cantidad
        existingItem.quantity += item.quantity;
      } else {
        // Si no existe, lo agregamos
        acc.push({ ...item });
      }
      return acc;
    }, []);
    return groupedCart;
  };

  // Cargar el carrito desde localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const normalizedCart = normalizeCart(storedCart); // Elimina duplicados y agrupa cantidades
    setCartItems(normalizedCart);
  }, []);

  // Guardar el carrito en localStorage
  const saveCartToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  // Incrementar cantidad
  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item; // Retornamos el resto sin cambios
    });
    setCartItems([...updatedCart]); // Actualizamos con una copia inmutable
    saveCartToLocalStorage(updatedCart);
  };

  // Disminuir cantidad
  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item; // Retornamos el resto sin cambios
    });
    setCartItems([...updatedCart]); // Actualizamos con una copia inmutable
    saveCartToLocalStorage(updatedCart);
  };

  // Eliminar un producto
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems([...updatedCart]); // Actualizamos con una copia inmutable
    saveCartToLocalStorage(updatedCart);
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Calcular el precio total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className='text-light fw-bold mb-5'>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p className='text-light'>Tu carrito está vacío</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
             <div className='d-flex flex-column m-3 justify-content-center align-items-center'>
                <img className='m-2' src={item.images}  width="100" onError={(e) => {
                      e.target.src = "ruta_de_imagen_placeholder.jpg"; // Imagen de respaldo
                    }} 
                />
                <div className='m-2 text-light fw-bold h5'>{item.title}</div>
                <div className='text-light fw-bold h5'> Precio: {item.price} USD</div>
                <div className='d-flex justify-content-center align-items-center'>
                <button
                  className="btn btn-light m-2"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className='text-light'>{item.quantity}</span>
                <button
                  className="btn btn-light m-2"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              
              </div>
                </div>
             
              <button
                className="btn btn-light"
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
              <div className='mt-2'>----------------------------------------------------------------------</div>
            </div>
          ))}
    
          <h3 className='text-light mt-4'>Total: {totalPrice} USD</h3>
          <button className="btn btn-light" onClick={clearCart}>
            Limpiar carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
