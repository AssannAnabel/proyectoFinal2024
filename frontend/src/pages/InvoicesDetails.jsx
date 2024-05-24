import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import { Logo } from '../components/Logo';
import { CartContext } from '../context/CartContext';

const InvoicesDetails = () => {
    const { idInvoice } = useParams();
    const { user } = useContext(UserContext);
    const [invoice, setInvoice] = useState(null);
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const { cart, clearCart } = useContext(CartContext);

    // useEffect(() => {
    //     const fetchInvoice = async () => {
    //         try {
    //             console.log('obtener detalles de la factura 16:', idInvoice);
    //             const response = await fetch(`http://localhost:3000/invoices/${user.id}`, {
                   
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${user.access_token}`
    //                 }
    //             });

    //             if (response.ok) {
    //                 const invoiceData = await response.json();
    //                 setInvoice(invoiceData);
    //             } else {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Error',
    //                     text: 'No se pudo obtener la información de la factura.'
    //                 });
    //             }
    //         } catch (error) {
    //             console.error('Error fetching invoice', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Error',
    //                 text: 'Hubo un error al obtener la información de la factura.'
    //             });
    //         }
    //     };

    //     const fetchInvoiceDetails = async () => {
    //         try {
    //             console.log('obtener detalles de la facturaaaaa:', idInvoice);
    //             const response = await fetch(`http://localhost:3000/invoices-details`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${user.access_token}`
    //                 }
    //             });

    //             if (response.ok) {
    //                 const detailsData = await response.json();
    //                 console.log('Detalles de la factura ver consola:', detailsData);
    //                 setInvoiceDetails(detailsData);
    //             } else {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Error',
    //                     text: 'No se pudieron obtener los detalles de la factura.'
    //                 });
    //             }
    //         } catch (error) {
    //             console.error('Error fetching invoice details', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Error',
    //                 text: 'Hubo un error al obtener los detalles de la factura.'
    //             });
    //         }
    //     };

    //     if (idInvoice) {
    //         fetchInvoice();
    //         fetchInvoiceDetails();
    //     } else {
    //         console.error('ID de factura no válido:', idInvoice);
    //     }
    // }, [idInvoice, user.access_token]);

    // if (!invoice) {
    //     return <div>Cargando...</div>;
    // }
//-------------------------------------------------------------------------------------------------------
   



console.log(cart)


return (
        <>

            <Logo />
            <div className="invoice-detail-container">
                <h2>Detalles de la Factura</h2>
                <div className="invoice-info">
                    {/* <p>ID de Factura: {invoice.idInvoice}</p>
                    <p>Fecha: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                    <p>Total sin IVA: ${invoice.total_without_iva}</p>
                    <p>Total con IVA: ${invoice.total_with_iva}</p> */}
                    <p>Nombre: {user.name}</p>
                    <p>Número de Cliente: {user.id}</p>
                </div>
                <h3>Detalles de los Productos</h3>
                <ul className="invoice-details-list">
                    {cart.map((detail) => (
                        <li key={detail.idProduct} className="invoice-detail-item">
                            <p>Nombre del Producto: {detail.product}</p>
                            <p>Cantidad Vendida: {detail.amount_sold}</p>
                            <p>Precio: {detail.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default InvoicesDetails;
