import { Navigate, Outlet } from "react-router-dom";//importa dos elementos de la biblioteca de react, para la navegación y enrutamiento


export const RutasProtegidas = ({ isAllowed, redirectPath = "/", children }) => {//isAllowed, valor booleano que indica si el usuario tiene permiso,redirecpath donde se dirige el usuario si no tiene permiso,sera en Login,clhildren son los componentes hijos que se renderizaran si el usuario tiene permiso
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
//Si isAllowed es verdadero, el componente verifica si hay componentes hijos (children). Si hay componentes hijos, se renderizan. De lo contrario, se renderiza el componente Outlet, que es un punto de salida para que otros componentes se rendericen según la ruta actual en React Router.
//En resumen, el componente "RutasProtegidas" se utiliza para proteger rutas en una aplicación y redirigir al usuario si no tiene permiso. Si el usuario tiene permiso, se renderizan los componentes hijos o se renderiza el componente Outlet para permitir que otros componentes se rendericen según la ruta actual.