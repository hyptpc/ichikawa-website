// ① スクロールで要素をフェードイン
const fadeElems = document.querySelectorAll('section');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElems.forEach(el => fadeObserver.observe(el));

// ② スクロールでヘッダー色変更
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ③ ページトップボタン
const topBtn = document.createElement('button');
topBtn.innerText = "↑ Top";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
