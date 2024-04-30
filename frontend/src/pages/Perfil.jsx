import React, { useState, useContext } from 'react';
import { updateUserById, deleteUser } from '../service/userService';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx'



function Perfil() {
    const { user,handleLogout} = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();

    

  // Estado local para almacenar los datos del formulario
  const [userUpdate, setUserUpdate] = useState({
    phone: user.telefono,
    email: user.email,
    password: user.password,
  });

  function handleChange(e) {
    e.preventDefault();
    
    setUserUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return userUpdate
}

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos actualizados al backend
    // Por ejemplo, podrías llamar a una función updateUser con los datos formData
    updateUserById(user.id,userUpdate);
    console.log("id",user.id);
    navigate('/')
  };

  const handleDeleteProfile = () => {
    deleteUser(user);
    handleLogout(); // Eliminar sesión del usuario
    navigate('/register');
};

  return (
   <>
   <div>
    <h2>{user.name}</h2>    
    <p>{user.email}</p>
    <p>{user.rol}</p>
   </div>







   <div className="container"> {/* Agrega la clase 'container' al div principal */}
   <h2>Editar perfil</h2>
                <form className="form" onSubmit={handleSubmit}> {/* Agrega la clase 'form' al formulario */}
                  
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' onChange={handleChange} />

                    <label htmlFor='phone'>Telefono</label>
                    <input type='phone' name='phone' id='phone' onChange={handleChange} />

                   
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' name='password' id='password' onChange={handleChange} />
                                    

                    <button className='btn-guardar' type='submit'>Guardar</button>
                    <button className='btn-delete' onClick={handleDeleteProfile}>Eliminar perfil</button>
                </form>
            </div>
   </>
  );
}

export default Perfil;
