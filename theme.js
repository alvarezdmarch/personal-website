document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // The theme itself is applied by the inline script in <head> to avoid a flash.
    // The sun/moon icons follow data-theme via CSS, so only the label needs updating here.
    function currentTheme() {
        return htmlElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function updateLabel() {
        toggleButton.setAttribute('aria-label',
            currentTheme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }

    updateLabel();

    toggleButton.addEventListener('click', function () {
        const newTheme = currentTheme() === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) { }
        updateLabel();
    });

    // Mobile Menu Toggle (the bars/close icons follow aria-expanded via CSS)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });
    }
});
