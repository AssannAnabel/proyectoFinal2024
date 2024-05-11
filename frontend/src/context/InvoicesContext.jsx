import React, { createContext, useState, useContext } from 'react';


export const InvoiceContext = createContext();


export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);

    
    const addInvoice = (newInvoice) => {
        setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
    };

    const getAllInvoices = () => {
        return invoices;
    };

    return (
        <InvoiceContext.Provider value={{ invoices, addInvoice, getAllInvoices }}>
            {children}
        </InvoiceContext.Provider>
    );
};

// Función personalizada para utilizar el contexto
export const useInvoiceContext = () => {
    return useContext(InvoiceContext);
};
