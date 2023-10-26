const headerBtn = document.querySelector(".header__btn");
const menu = document.querySelector(".rightside-menu");
const close = document.querySelector(".rightside-menu__close");

headerBtn.addEventListener("click", () => {
	menu.classList.toggle("rightside-menu--open");
});

close.addEventListener("click", () => {
	menu.classList.remove("rightside-menu--open");
});
