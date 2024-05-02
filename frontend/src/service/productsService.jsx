import { UserContext } from '../context/UserContext.jsx'
const { products } = useContext(UserContext);

export const categoryProducts = ['Tranquera', 'ropa trabajo', 'Ferretería'];

export const getProductByItem = async (item) => {
    const res = await fetch(products)
    const allInvtry = await res.json();
    const items = allInvtry.filter((invtry) => invtry.item === item)
    if (!items.length) throw new Error(`No hay ${item} en stock`)
    return items;
}