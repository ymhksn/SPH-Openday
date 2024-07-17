// Your JavaScript code goes here
console.log("Hello, world!");

// Add event listener to scroll links
document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        const targetOffsetTop = targetElement.offsetTop - 128;

        window.scrollTo({
            top: targetOffsetTop,
            behavior: 'smooth'
        });
    });
});


const offcanvasElementList = document.querySelectorAll('.offcanvas');
const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl));

const offcanvasElement = document.getElementById('offcanvasResponsive');
const closeOffCanvasLinks = document.querySelectorAll('.closeOffCanvas');

closeOffCanvasLinks.forEach(link => {
    link.addEventListener('click', (event) => {

        // Close the offcanvas menu and overlay using Bootstrap methods
        const offcanvasElement = document.getElementById('offcanvasResponsive');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        offcanvasInstance.hide();

        const overlayElement = document.querySelector('.offcanvas-overlay');
        overlayElement.classList.remove('show');

        const targetElement = document.querySelector(this.getAttribute('href'));
        const targetOffsetTop = targetElement.offsetTop - 100;

        window.scrollTo({
            top: targetOffsetTop,
            behavior: 'smooth'
        });
    });
});
