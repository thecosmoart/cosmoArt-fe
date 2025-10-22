export const handleClick = (id) => {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    window.scrollTo({ top: element.offsetTop + 180, behavior: 'smooth' });
};
