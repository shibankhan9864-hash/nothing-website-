const orb = document.getElementById('orb');
const stage = document.querySelector('.object-stage');
const menuButton = document.getElementById('menuButton');
const nav = document.querySelector('.nav nav');

let pointerX = 0, pointerY = 0, scrollTurn = 0;

function updateOrb() {
  const rotateY = pointerX * 18 + scrollTurn;
  const rotateX = -pointerY * 15 + Math.sin(scrollTurn * Math.PI / 180) * 5;
  orb.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

stage.addEventListener('pointermove', (event) => {
  const rect = stage.getBoundingClientRect();
  pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  updateOrb();
});
stage.addEventListener('pointerleave', () => {
  pointerX = 0; pointerY = 0; updateOrb();
});

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrollTurn = window.scrollY * 0.07;
      updateOrb();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
