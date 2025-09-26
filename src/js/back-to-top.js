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

  window.topFunction = function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For chrome, firefox, ie and opera
  };
}
