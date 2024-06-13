document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = Array.from(carousel.children);

  items.forEach((item) => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
  });
});
