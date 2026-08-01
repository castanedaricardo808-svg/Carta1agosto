const heartsBg = document.getElementById('heartsBg');
const heartSymbols = ['♥', '♡', '❤', '💕', '💗'];

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (14 + Math.random() * 18) + 'px';
  heart.style.animationDuration = (9 + Math.random() * 8) + 's';
  heart.style.animationDelay = Math.random() * 5 + 's';
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), 18000);
}

for (let i = 0; i < 12; i++) createHeart();
setInterval(createHeart, 1400);

let isOpen = false;

function openEnvelope() {
  if (isOpen) return;
  isOpen = true;

  document.getElementById('envelope').classList.add('opened');
  document.getElementById('instruction').classList.add('hidden');
  document.getElementById('footerMsg').classList.add('visible');

  // Reproducir música al abrir
  const musica = document.getElementById('musica');
  musica.volume = 0.55;
  musica.play().catch(function(e) {
    console.log("Audio bloqueado por el navegador:", e);
  });

  createHeartExplosion();
}

function createHeartExplosion() {
  const envelope = document.getElementById('envelope');
  const rect = envelope.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const hearts = ['❤️', '💕', '💗', '💖', '💘', '💝', '♡', '♥'];

  for (let i = 0; i < 28; i++) {
    const heart = document.createElement('div');
    heart.className = 'sparkle';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    document.body.appendChild(heart);

    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';
    heart.style.fontSize = (14 + Math.random() * 16) + 'px';

    const angle = (Math.PI * 2 * i) / 28 + (Math.random() * 0.4);
    const distance = 80 + Math.random() * 140;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance - 40;

    heart.animate([
      { transform: 'translate(0, 0) scale(0.3) rotate(0deg)', opacity: 1 },
      { transform: `translate(${endX}px, \( {endY}px) scale(1.2) rotate( \){Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: 1100 + Math.random() * 600,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards'
    });

    setTimeout(() => heart.remove(), 1800);
  }
}