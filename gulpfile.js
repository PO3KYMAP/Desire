const { src, dest, watch, parallel, series } = require("gulp"),
	scss = require("gulp-sass")(require("sass")),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify-es").default,
	browserSync = require("browser-sync").create(),
	autoprefixer = require("gulp-autoprefixer"),
	clean = require("gulp-clean"),
	avif = require("gulp-avif"),
	webp = require("gulp-webp"),
	imagemin = require("gulp-imagemin"),
	newer = require("gulp-newer"),
	fonter = require("gulp-fonter"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	include = require("gulp-include"),
	svgSprite = require("gulp-svg-sprite");

function styles() {
	return src("app/styles/scss/main.scss")
		.pipe(autoprefixer({ overrideBrowserlist: ["last 5 version"] }))
		.pipe(concat("main.min.css"))
		.pipe(scss({ outputStyle: "compressed" }))
		.pipe(dest("app/styles/css"))
		.pipe(browserSync.stream());
}

function scripts() {
	return src([
		"node_modules/mixitup/dist/mixitup.min.js",
		"node_modules/jquery/dist/jquery.js",
		"node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
		"app/js/*.js",
		"!app/js/main.min.js",
	])
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(dest("app/js"))
		.pipe(browserSync.stream());
}

function watching() {
	browserSync.init({
		server: {
			baseDir: "app/",
		},
	});
	watch(["app/styles/scss/main.scss"], styles);
	watch(["app/styles/scss/blocks/*.scss"], styles);
	watch(["app/images/src"], images);
	watch(["app/images/gallery-src"], gallery_images);
	watch(["app/js/main.js", "app/js/rightside-menu.js", "app/js/gallery.js"], scripts);
	watch(["app/components/*", "app/pages/*"], pages);
	watch(["app/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
	return src("dist").pipe(clean());
}

function images() {
	return src(["app/images/src/*.*", "!app/images/src/*.svg"])
		.pipe(newer("app/images"))
		.pipe(avif({ quality: 50 }))

		.pipe(src("app/images/src/*.*"))
		.pipe(newer("app/images"))
		.pipe(webp())

		.pipe(src("app/images/src/*.*"))
		.pipe(newer("app/images"))
		.pipe(imagemin())

		.pipe(dest("app/images"));
}

function gallery_images() {
	return src(["app/images/gallery-src/*.*"])
		.pipe(newer("app/images/gallery"))
		.pipe(avif({ quality: 50 }))

		.pipe(src("app/images/gallery-src/*.*"))
		.pipe(newer("app/images/gallery"))
		.pipe(webp())

		.pipe(src("app/images/gallery-src/*.*"))
		.pipe(newer("app/images/gallery"))
		.pipe(imagemin())

		.pipe(dest("app/images/gallery"));
}

function sprite() {
	return src("app/images/dist/*.svg")
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: "../sprite.svg",
						example: true,
					},
				},
			})
		)
		.pipe(dest("app/images/dist"));
}

function fonts() {
	return src("app/fonts/src/*.*")
		.pipe(
			fonter({
				formats: ["woff", "ttf"],
			})
		)
		.pipe(src("app/fonts/*.ttf"))
		.pipe(ttf2woff2())
		.pipe(dest("app/fonts"));
}

function pages() {
	return src("app/pages/*.html")
		.pipe(
			include({
				includePaths: "app/components",
			})
		)
		.pipe(dest("app"))
		.pipe(browserSync.stream());
}

function building() {
	return src(
		[
			"app/styles/css/main.min.css",
			"app/js/main.min.js",
			"app/*.html",
			"app/images/*.*",
			"app/fonts/*.*",
		],
		{ base: "app" }
	).pipe(dest("dist"));
}

exports.styles = styles;
exports.scripts = scripts;
exports.pages = pages;
exports.watching = watching;
exports.images = images;
exports.gallery_images = gallery_images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.building = building;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, images, gallery_images, scripts, pages, watching);
