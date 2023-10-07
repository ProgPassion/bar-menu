const storagePrefix = 'barmenu_';

const storage = {
    getUser: () => {
        return JSON.parse(window.localStorage.getItem(`${storagePrefix}user`));
    },
    setUser: (user) => {
        window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
    },
    clearUser: () => {
        window.localStorage.removeItem(`${storagePrefix}user`);
    },
}

export default storage;