import Nav from "../components/Nav"
import '../styles/Register.css' // Importa el archivo CSS con los estilos

function Register() {

    function handleSubmit(e){
        e.preventDefault()
    
        let newUser={
            name:e.target.nombre.value,// trabajar con el Email
            lastName:e.target.apellido.value,
            email:e.target.email.value,
            password:e.target.password.value,
        }
            addOneUser(newUser)
    }
    return (
        <>
            <Nav />
            <div className="container"> {/* Agrega la clase 'container' al div principal */}
                <form className="form" onSubmit={handleSubmit}> {/* Agrega la clase 'form' al formulario */}
                    <label htmlFor='nombre'>Nombre</label>
                    <input type='text' name='nombre' id='nombre' />

                    <label htmlFor='apellido'>Apellido</label>
                    <input type='text' name='apellido' id='apellido' />

                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' />

                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' name='password' id='password' />

                    <button className='btn-registrarme' type='submit'>Registrarme</button>
                </form>
            </div>
        </>
    )
}

export default Register