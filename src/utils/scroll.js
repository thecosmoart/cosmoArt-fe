export const handleClick = (id) => {
    const element = document.getElementById(id);
    
    console.log('***', element);
    console.log('***', element.offsetTop);

    if (!element) {
        return;
    }

    window.scrollTo({ top: element.offsetTop - 200, behavior: 'smooth' });
};
