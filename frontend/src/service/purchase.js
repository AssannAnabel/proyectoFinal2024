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
            const { value: formValues } = await Swal.fire({
                imageUrl: logo,
                title: '¡Detalles de la compra!',
                width: '80%', // Ajusta el ancho del SweetAlert
                html: `
                    <div class="purchase-details">
                        
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
                    <div class="form-group">
                        <label for="paymentMethod">Método de Pago</label>
                        <select id="paymentMethod" class="swal2-input custom-select">
                            <option value="credit_card">Tarjeta de Crédito</option>
                            <option value="debit_card">Tarjeta de Débito</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cardNumber">Número de Tarjeta</label>
                        <input id="cardNumber" class="swal2-input custom-input" type="text" placeholder="Número de Tarjeta">
                    </div>
                    <div class="form-group">
                        <label for="cardExpiry">Fecha de Expiración</label>
                        <input id="cardExpiry" class="swal2-input custom-input" type="text" placeholder="MM/AA">
                    </div>
                    <div class="form-group">
                        <label for="cardCVV">CVV</label>
                        <input id="cardCVV" class="swal2-input custom-input" type="text" placeholder="CVV">
                    </div>
                    <div class="form-group">
                        <label for="deliveryMethod">Método de Entrega</label>
                        <select id="deliveryMethod" class="swal2-input custom-select">
                            <option value="store_pickup">Retirar en Tienda</option>
                            <option value="home_delivery">Envío a Domicilio</option>
                        </select>
                    </div>
                    <div class="form-group" id="addressGroup" style="display: none;">
                        <label for="address">Dirección de Envío</label>
                        <input id="address" class="swal2-input custom-input" type="text" placeholder="Dirección de Envío">
                    </div>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Confirmar Compra',
                customClass: {
                    popup: 'custom-popup',
                    title: 'custom-title',
                    image: 'custom-image',
                    htmlContainer: 'custom-html-container',
                    confirmButton: 'custom-confirm-button',
                    cancelButton: 'custom-cancel-button'
                },
                didOpen: () => {
                    const deliveryMethodSelect = Swal.getPopup().querySelector('#deliveryMethod');
                    deliveryMethodSelect.addEventListener('change', (event) => {
                        const addressGroup = Swal.getPopup().querySelector('#addressGroup');
                        if (event.target.value === 'home_delivery') {
                            addressGroup.style.display = 'block';
                        } else {
                            addressGroup.style.display = 'none';
                        }
                    });
                },
                preConfirm: () => {
                    const paymentMethod = Swal.getPopup().querySelector('#paymentMethod').value;
                    const cardNumber = Swal.getPopup().querySelector('#cardNumber').value;
                    const cardExpiry = Swal.getPopup().querySelector('#cardExpiry').value;
                    const cardCVV = Swal.getPopup().querySelector('#cardCVV').value;
                    const deliveryMethod = Swal.getPopup().querySelector('#deliveryMethod').value;
                    const address = Swal.getPopup().querySelector('#address').value;

                    if (!paymentMethod || !cardNumber || !cardExpiry || !cardCVV || !deliveryMethod || (deliveryMethod === 'home_delivery' && !address)) {
                        Swal.showValidationMessage(`Por favor, complete todos los campos requeridos`);
                    }
                    return { paymentMethod, cardNumber, cardExpiry, cardCVV, deliveryMethod, address };
                }
            });

            if (formValues) {
                // Aquí puedes realizar la lógica adicional para procesar el método de pago, entrega y detalles de la tarjeta
                console.log('Método de Pago:', formValues.paymentMethod);
                console.log('Número de Tarjeta:', formValues.cardNumber);
                console.log('Fecha de Expiración:', formValues.cardExpiry);
                console.log('CVV:', formValues.cardCVV);
                console.log('Método de Entrega:', formValues.deliveryMethod);
                console.log('Dirección de Envío:', formValues.address);

                Swal.fire({
                    title: 'Compra Confirmada',
                    text: 'Gracias por tu compra. Recibirás un correo con los detalles.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.location.reload(); // Recarga la página después de que el usuario haga clic en "Ok"
                });
            }
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
  
