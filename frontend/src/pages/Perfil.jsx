import React, { useState, useContext, useEffect } from 'react';
import { getUserPurchases } from '../service/purchase';
import { updateUserById, deleteUser } from '../service/userService';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import '../styles/Perfil.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Swal from 'sweetalert2';

function Perfil() {
  const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [userUpdate, setUserUpdate] = useState({
    phone: user ? user.telefono : '',
    email: user ? user.email : '',
    password: user ? user.password : '',
  });

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      setUserUpdate({
        phone: user.telefono,
        email: user.email,
        password: user.password,
      });

      async function fetchPurchaseHistory() {
        try {
          const purchases = await getUserPurchases(user.id);
          setPurchaseHistory(purchases);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }

      fetchPurchaseHistory();
    }
  }, [user]);

  function handleChange(e) {
    e.preventDefault();
    setUserUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserById(user.id, userUpdate);
    navigate('/');
  };

  const handleDeleteProfile = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Si elimina su cuenta perdera sus datos y tendrá que volver a registrarse",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e01717',
      cancelButtonColor: '#126606',
      confirmButtonText: 'Sí, eliminarla'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user);
        handleLogout();
        navigate('/register');
        Swal.fire(
          '¡Eliminada!',
          'Tu cuenta ha sido eliminada.',
          'success'
        )
      }
    });
  };

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <>
      <div className='container-perfil'>
        <Nav />
         <Tabs className='content'>
          <TabList>
            <Tab>Perfil</Tab>
            <Tab>Historial de Compras</Tab>
          </TabList>

          <TabPanel>
            <div className='user-profile'>
              <h2>Bienvenido/a {user.name}</h2>
              <p>Su cuenta: {user.email}</p>
              <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Ocultar perfil' : 'Mostrar perfil'
                }
              </button>
              {showForm && (
                <form className="form" onSubmit={handleSubmit}>
                  <label htmlFor='email'>Email</label>
                  <input type='text' name='email' id='email' value={userUpdate.email || ''} onChange={handleChange} />
                  <label htmlFor='phone'>Teléfono</label>
                  <input type='phone' name='phone' id='phone' value={userUpdate.phone || ''} onChange={handleChange} />
                  <label htmlFor='password'>Contraseña</label>
                  <input type='password' name='password' id='password' value={userUpdate.password || ''} onChange={handleChange} />
                  <button className='btn-guardar' type='submit'>Guardar</button>
                  <button className='btn-delete' type='button' onClick={handleDeleteProfile}>Eliminar perfil</button>
                </form>
              )}
            </div>
          </TabPanel>

          <TabPanel>
            <div className='purchase-history'>
              <h3>Historial de Compras</h3>
              {loading && <p>Cargando...</p>}
              {error && <p>Aún no tiene compras realizadas</p>}
              <div className='puserchase'>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Fecha de Factura</th>
                      <th>Total Sin IVA</th>
                      <th>Total Con IVA</th>
                      <th>Producto</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseHistory.map((invoice) => (
                      <tr key={invoice.idInvoice}>
                        <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                        <td>${invoice.total_without_iva}</td>
                        <td>${invoice.total_with_iva}</td>
                        <td>
                          {invoice.invoiceDetails.map((detail) => (
                            <p key={detail.id}>{detail.product.product}</p>
                          ))}
                        </td>
                        <td>
                          {invoice.invoiceDetails.map((detail) => (
                            <p key={detail.id}>{detail.product.description}</p>
                          ))}
                        </td>
                        <td>
                          {invoice.invoiceDetails.map((detail) => (
                            <p key={detail.id}>${detail.product.price}</p>
                          ))}
                        </td>
                        <td>
                          {invoice.invoiceDetails.map((detail) => (
                            <p key={detail.id}>{detail.amount_sold}</p>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
        </Tabs>
        <Footer />
      </div>
    </>
  );
}

export default Perfil;
