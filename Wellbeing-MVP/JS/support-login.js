// Simple client-side behaviour
const form = document.getElementById('loginForm');
const guestBtn = document.getElementById('guestBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: Replace with real auth. For now, simulate and redirect.
  window.location.href = './Index.html';
});

guestBtn.addEventListener('click', () => {
  window.location.href = './Index.html';
});
