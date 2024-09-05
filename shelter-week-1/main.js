const burgerIcon = document.getElementById('burger-icon');
const burgerMenu = document.getElementById('burger-menu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    burgerIcon.classList.toggle('open');
    burgerMenu.classList.toggle('open');
    overlay.classList.toggle('open');
    if (burgerMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    burgerIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('open');
      burgerIcon.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });