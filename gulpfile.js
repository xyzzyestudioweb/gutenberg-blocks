//Dependencias
const { src, dest, parallel, watch } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const minifyCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const stripCssComments = require("gulp-strip-css-comments");

const gcmq = require("gulp-group-css-media-queries");
const pot = require("gulp-wp-pot");
const streamqueue = require("streamqueue");
const concat = require("gulp-concat");

/*
 * Directories here
 */
const paths = {
	src_scss: "./assets/src/scss/",
	dist_scss: "./assets/build/css/",
	src_js: "./assets/src/js/",
	dist_js: "./assets/build/js/",
	src_img: "./assets/src/img/",
	dist_img: "./assets/build/img/",
	src_components: "./assets/src/js/Components/",
	dist_components: "./assets/build/js/Components/",
	src_lib: "./assets/src/lib/",
	dist_lib: "./assets/build/lib/",
};

/*
 * CSS tasks
 */
function cssApp() {
	return streamqueue(
		{ objectMode: true },
		src([paths.src_scss + "editor/editor-and-front.scss"])
			.pipe(sass().on("error", sass.logError))
			.pipe(concat("editor-and-front.min.css")),
		src([paths.src_scss + "editor/editor-only.scss"])
			.pipe(sass().on("error", sass.logError))
			.pipe(concat("editor-only.min.css")),
		src([paths.src_scss + "editor/front-only.scss"])
			.pipe(sass().on("error", sass.logError))
			.pipe(concat("front-only.min.css")),
		src([paths.src_scss + "components/block-latest-posts.scss"])
			.pipe(sass().on("error", sass.logError))
			.pipe(concat("block-latest-posts.min.css"))
	)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 15 versions"],
				cascade: false,
			})
		)
		.pipe(stripCssComments())
		.pipe(gcmq())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write(".", ""))
		.pipe(minifyCss())
		.pipe(dest(paths.dist_scss));
}

/*
 * JS tasks
 */
function jsApp() {
	return streamqueue(
		{ objectMode: true },
		src([paths.src_js + "main.js"]).pipe(rename("main.min.js")),
		src([paths.src_js + "block-latest-posts.js"]).pipe(rename("block-latest-posts.min.js")),
		src([paths.src_js + "counters.js"]).pipe(rename("counters.min.js")),
	)
		.pipe(babel())
		.pipe(uglify())
		.pipe(dest(paths.dist_js));
}

/*
 * Images tasks
 * Copy all from paths.src_img to paths.dist_img
 */
function distImg() {
	return src(paths.src_img + "**/*").pipe(dest(paths.dist_img));
}

function components() {
	return streamqueue(
		{ objectMode: true },
		src(paths.src_components + "*.js"),
	)
		.pipe(babel())
		.pipe(dest(paths.dist_components));
}

/*
 * Copy all from lib src folder to lib dist folder
 */
function lib() {
	return streamqueue(
		{ objectMode: true },
		src(paths.src_lib + "**/*"),
	)
		.pipe(dest(paths.dist_lib));
}

/*
 * Watch for changes
 */
function app() {
	distImg();
	lib();
	cssApp();
	jsApp();
	watch(
		[paths.src_scss + "*.scss", paths.src_scss + "**/*.scss"],
		parallel(cssApp)
	);
	watch(paths.src_js + "*.js", parallel(jsApp));
	watch([paths.src_components + "*.js"], parallel(components));
}

exports.css = cssApp;
exports.js = jsApp;
exports.default = app;
