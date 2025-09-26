export function initScrollToTop() {
  const mybutton = document.getElementById('myBtn');

  window.onscroll = function () {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  };

  mybutton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Плавная анимация прокрутки
    });
  });
}
