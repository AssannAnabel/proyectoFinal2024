import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

const InvoicesDetails = () => {
    const { idInvoice } = useParams();
    const { user } = useContext(UserContext);
    const [invoice, setInvoice] = useState(null);
    const [invoiceDetails, setInvoiceDetails] = useState([]);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                console.log('obtener detalles de la factura:', idInvoice); // verifica el ID de la factura
                const response = await fetch(`http://localhost:3000/invoices/${idInvoice}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`
                    }
                });

                if (response.ok) {
                    const invoiceData = await response.json();
                    setInvoice(invoiceData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo obtener la información de la factura.'
                    });
                }
            } catch (error) {
                console.error('Error fetching invoice', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al obtener la información de la factura.'
                });
            }
        };

        const fetchInvoiceDetails = async () => {
            try {
                console.log('obtener detalles de la facturaaa:', idInvoice); // verifica el id de la facrtura
                const response = await fetch(`http://localhost:3000/invoices-details/${idInvoice}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`
                    }
                });

                if (response.ok) {
                    const detailsData = await response.json();
                    setInvoiceDetails(detailsData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudieron obtener los detalles de la factura.'
                    });
                }
            } catch (error) {
                console.error('Error fetching invoice details', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al obtener los detalles de la factura.'
                });
            }
        };

        fetchInvoice();
        fetchInvoiceDetails();
    }, [idInvoice, user.access_token]);

    if (!invoice) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="invoice-detail-container">
            <h2>Detalles de la Factura</h2>
            <div className="invoice-info">
                <p>ID de Factura: {invoice.idInvoice}</p>
                <p>Fecha: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                <p>Total sin IVA: ${invoice.total_without_iva}</p>
                <p>Total con IVA: ${invoice.total_with_iva}</p>
                <p>Nombre: {user.name}</p> 
            </div>
            <h3>Detalles de los Productos</h3>
            <ul className="invoice-details-list">
                {invoiceDetails.map((detail) => (
                    <li key={detail.idinvoicesDetails} className="invoice-detail-item">
                        <p>ID de Producto: {detail.idProductIdProduct}</p>
                        <p>Cantidad Vendida: {detail.amount_sold}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoicesDetails;
