

export const url_users = 'http://localhost:3001/user'

const controller = new AbortController();

export const getUsers = async (url_users) => {
    try {
        const res = await fetch(url_users, {
            method: 'GET',
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const getUserById = async (id) => {
    try {
        const res = await fetch(`${url_users}${id}`, {
            method: "GET",
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const addUser = async (user) => {
    try {
        const res = await fetch(url_users, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!res.ok) throw new Error(`Response not OK`)
        const parsed = res.json()
        console.log("user",user);

        return parsed;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteUser = async (user) => {
    try {
        const res = await fetch(`${url_users}/${user.id}`, {
            method: 'DELETE',
             headers: {'Authorization': `Bearer ${user.access_token}`,
              'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`Response not OK`)
        const parsed = await res.json();
        window.location.reload();
           
    return parsed
    } catch (err) {
        throw new Error(err);
    }
}

export const updateUserById = async (id, updatedUser) => {
    try {
        const res = await fetch(`${url_users}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });
        console.log("USUARIO NUEVO", updatedUser);
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw new Error(err);
    }
}

export const itemsInvtry = ['Tranquera', 'ropa trabajo', 'Ferretería'];

export const getUserByItem = async (item) => {
    const res = await fetch(url_users)
    const allUsers = await res.json();
    const items = allUsers.filter((user) => user.item === item)
    if (!items.length) throw new Error(`No hay ${item} en stock`)
    return items;
}


