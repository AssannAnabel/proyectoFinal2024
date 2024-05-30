import Swal from 'sweetalert2';
import logo from '/agrotech-logo.png';

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
            Swal.fire({
                imageUrl: logo,
                title: '¡Compra realizada con éxito!',
                html: `
                    <div class="purchase-details">
                        <h3>Detalles de la compra</h3>
                        <ul>
                            ${cart.map(
                                (product) => `
                                    <li key=${product.idProduct}>
                                        <div class="product-info">
                                            <p><strong>Producto:</strong> ${product.product}</p>
                                            <p><strong>Cantidad:</strong> ${product.quantity}</p>
                                            <p><strong>Precio:</strong> $${product.price}</p>
                                            <p><strong>Total:</strong> $${(product.price * product.quantity).toFixed(2)}</p>
                                        </div>
                                    </li>
                                `
                            ).join('')}
                        </ul>
                        <p class="total"><strong>Total de la compra: $${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                    </div>
                `,
                confirmButtonText: 'Ok',
                showConfirmButton: true,
                customClass: {
                    image: 'custom-image-class',
                },
               
            }).then(() => {
                window.location.reload(); // Recarga la página después de que el usuario haga clic en "Ok"
            });
           
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la compra',
                text: "No hay stock del producto seleccionado",
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
  
