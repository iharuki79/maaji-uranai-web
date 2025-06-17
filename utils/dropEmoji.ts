export function dropEmoji(content: string) {
  if (document.getElementsByClassName('choco').length > 300) {
    return;
  }

  const choco = document.createElement('div');
  choco.textContent = content;
  choco.classList.add('choco');

  const startX = Math.random() * (window.innerWidth - 10);
  choco.style.left = `${startX}px`;

  const fontSize = Math.random() * 40 + 20;
  choco.style.fontSize = `${fontSize}px`;

  const duration = Math.random() * 4.5 + 2;
  choco.style.animationDuration = `${duration}s`;

  if (Math.random() > 0.995) {
    choco.textContent = '💩';
    choco.style.fontSize = '60px';
  } else if (Math.random() > 0.99) {
    choco.textContent = '💰';
    choco.style.fontSize = '60px';
  } else if (Math.random() > 0.98) {
    choco.textContent = '💖';
    choco.style.fontSize = '60px';
  }

  choco.addEventListener('animationend', () => {
    choco.remove();
  });

  document.body.appendChild(choco);
}
