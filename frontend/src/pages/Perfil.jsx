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
    currentPassword: '',
    newPassword: '',
  });


  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFormEditPerfil, setShowFormEditPerfil] = useState(false);
  const [showFormEditContraseña, setShowFormEditContraseña] = useState(false);



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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showFormEditContraseña) {
      // Simulación de la lógica de validación de contraseña en el frontend

      // Actualización de la nueva contraseña
      try {
        const response = await updateUserById(user.id, {
          email: userUpdate.email,
          phone: userUpdate.phone,
          password: userUpdate.newPassword,  // Enviar la nueva contraseña al servidor
        });

        if (response) {
        Swal.fire('¡Contraseña actualizada!', 'Su contraseña ha sido cambiada exitosamente.', 'success');
         
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al cambiar la contraseña.', 'error');
      }
    } else {
      // Lógica para actualizar otros datos del perfil
      try {
        await updateUserById(user.id, {
          email: userUpdate.email,
          phone: userUpdate.phone,
        });
        Swal.fire('¡Perfil actualizado!', 'Su perfil ha sido actualizado exitosamente.', 'success');

      } catch (error) {
        Swal.fire('Error', 'Hubo un error al actualizar su perfil.', 'error');
      }
    }
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
              <button className='btn-mostrar' onClick={() => setShowFormEditPerfil(!showFormEditPerfil)}>
                {showFormEditPerfil ? 'Ocultar perfil para editar' : 'Editar perfil'
                }
              </button>
              {showFormEditPerfil && (
                <form className="form-perfil" onSubmit={handleSubmit}>
                  <label htmlFor='email' className='label-perfil'>Email</label>
                  <input type='text' name='email' id='email' className='input-perfil' placeholder='Email' value={userUpdate.email || ''} onChange={handleChange} />

                  <label htmlFor='phone' className='label-perfil'>Teléfono</label>
                  <input type='phone' name='phone' id='phone' className='input-perfil' placeholder='Teléfono' value={userUpdate.phone || ''} onChange={handleChange} />

                  <label htmlFor='address' className='label-perfil'>Dirección</label>
                  <input type='text' name='address' id='address' className='input-perfil' placeholder='Dirección' value={userUpdate.address || ''} onChange={handleChange} />


                  <button className='btn-guardar-perfil' type='submit'>Guardar</button>
                 
                </form>
              )}
              <button className='btn-mostrar' onClick={() => setShowFormEditContraseña(!showFormEditContraseña)}>
                {showFormEditContraseña ? 'Ocultar editar contraseña' : 'Editar contraseña'
                }
              </button>
              {showFormEditContraseña && (
                <form className="form-perfil" onSubmit={handleSubmit}>

                  <label htmlFor='newPassword' className='label-perfil'>Contraseña nueva</label>
                  <input
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    className='input-perfil'
                    placeholder='Contraseña nueva'
                    value={userUpdate.newPassword}
                    onChange={handleChange}
                  />

                  <button className='btn-guardar-perfil' type='submit'>Guardar</button>

                </form>
              )}
               <button className='btn-delete-perfil' type='button' onClick={handleDeleteProfile}>Eliminar perfil</button>

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
