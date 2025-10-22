export function set(key, data, expiration = 86400) {
    localStorage.setItem(
        key,
        JSON.stringify({
            data,
            expiration,
            createdAt: Date.now()
        })
    );
}

export function get(key) {
    try {
        const entryObject = JSON.parse(localStorage.getItem(key));
        const { data, expiration, createdAt } = entryObject;
        const MILLISECONDS_TO_SECONDS = 1000;

        if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
            localStorage.removeItem(key);

            return null;
        }

        return data;
    } catch {
        return null;
    }
}

export function remove(key) {
    localStorage.removeItem(key);
}

export const browserStorage = {
    get,
    set,
    remove
};

