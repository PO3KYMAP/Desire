const about = document.querySelector(".about");
const gallery = document.querySelector(".nav-gallery")
const contact = document.querySelector(".contact");
const blog = document.querySelector(".header-blog");

about.addEventListener("click", () => {
	about.classList.toggle("menu__list-link--active");
    gallery.classList.remove("menu__list-link--active");
    contact.classList.remove("menu__list-link--active");
    blog.classList.remove("menu__list-link--active");
});

gallery.addEventListener("click", () => {
	gallery.classList.toggle("menu__list-link--active");
	about.classList.remove("menu__list-link--active");
	contact.classList.remove("menu__list-link--active");
	blog.classList.remove("menu__list-link--active");
});
contact.addEventListener("click", () => {
	contact.classList.toggle("menu__list-link--active");
	gallery.classList.remove("menu__list-link--active");
	about.classList.remove("menu__list-link--active");
	blog.classList.remove("menu__list-link--active");
});
blog.addEventListener("click", () => {
	blog.classList.toggle("menu__list-link--active");
	gallery.classList.remove("menu__list-link--active");
	contact.classList.remove("menu__list-link--active");
	about.classList.remove("menu__list-link--active");
});
