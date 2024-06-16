import Swal from 'sweetalert2';
import logo from '/agrotech.png';
import "../styles/Custom-styles.css"



export const handlePurchase = async (user, cart, clearCart) => {
    const data = cart.map((product) => ({
        idProduct: product.idProduct,
        amount: product.quantity,
    }));

    try {
        const response = await fetch(`http://localhost:3000/invoices/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access_token}`,
            },
            body: JSON.stringify({ products: data }),
        });

        if (response.ok) {
            clearCart();

            
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la compra',
                text: 'No hay stock del producto seleccionado',
            });
        }
    } catch (error) {
        console.error('Error al realizar la compra', error);
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error al realizar la compra',
            text: 'Por favor, inténtelo nuevamente.',
        });
    }
};








export async function getUserPurchases(userId) {
    try {
      const response = await fetch(`http://localhost:3000/invoices/user/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener el historial de compras');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
