const open = document.querySelector(".header_menu_burger");
const close = document.querySelector(".header_menu_close");
const modal = document.querySelector(".modal_navbar");

open.addEventListener("click", () => {
  open.classList.toggle("display_none");
  close.classList.toggle("display_none");
  modal.classList.toggle("display_none");
});

close.addEventListener("click", () => {
  open.classList.toggle("display_none");
  close.classList.toggle("display_none");
  modal.classList.toggle("display_none");
});
