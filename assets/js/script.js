const navLinks = document.querySelector('.nav-links');
    
function onToggleMenu(e) {
    if (e.name === 'menu-sharp') {
        e.name = 'close';
    } else {
        e.name = 'menu-sharp';
    }

    navLinks.classList.toggle('top-0');
    navLinks.classList.toggle('top-[-100%]');

}