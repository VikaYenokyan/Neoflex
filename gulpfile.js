// Определяем переменную "preprocessor"
let preprocessor = 'scss'; // Выбор препроцессора в проекте - sass или less

// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');
 
// Подключаем Browsersync
const browserSync = require('browser-sync').create();

// Подключаем gulp-concat
const concat = require('gulp-concat');
 
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));
 
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
 
// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем compress-images для работы с изображениями
const imagecomp = require('compress-images');

 
// Подключаем модуль del
const del = require('del');

let project_folder = "build";
let source_folder = "src";
let shop = "shop";
let cart = "cart";



let path = {
	src: {
		html: source_folder + "/**/*.{html, htm}",
		pdf: source_folder + "/**/*.pdf",

		icons: {
            shop: source_folder + '/icons/shop/**/*',
			cart: source_folder + '/icons/cart/**/*'
		},

		js: {
			shop: source_folder + "/js/" + shop + ".js",
			cart: source_folder + "/js/" + cart + ".js"
		},
		img: {
			src: {
				shop: source_folder + "/img/" + source_folder + "/" + shop + "/",
				cart: source_folder + "/img/" + source_folder + "/" + cart + "/"
			},
			build: {
				all: source_folder + "/img/" + project_folder + "/",
				shop: source_folder + "/img/" + project_folder + "/" + shop + "/",
				cart: source_folder + "/img/" + project_folder + "/" + cart + "/"
			}
			
		},
		scss: {
			shop: source_folder + "/scss/" + shop + "/*.scss",
			cart: source_folder + "/scss/" + cart + "/*.scss"
		},
		font: source_folder + "/css/font.css",
		min: {
			css: {
				cart: source_folder + "/css/" + cart + "/*.min.css",
			},
			js: {
				shop: source_folder + "/js/" + shop + "*.min.js",
				cart: source_folder + "/js/" + cart + "*.min.js"
			}
		}
	},
	build: {
		html: project_folder + "/",
		css: {
			shop: project_folder + "/css/" + shop + "/",
			cart: project_folder + "/css/" + cart + "/"
		},
		js: {
			shop: project_folder + "/js/" + shop + "/",
			cart: project_folder + "/js/" + cart + "/"
		},
		img: {
			shop: project_folder + "/img/" + shop + "/",
			cart: project_folder + "/img/" + cart + "/"
		}
	}
};

//подключаем gulp-file-include
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');

// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: project_folder }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
};

//Создадим функцию scripts() для экспорта задач
function scriptsshop() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.shop // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(shop + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function scriptscart() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.cart // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(cart + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}


//обработка стилей
function stylesshop() {
	return src('src/' + preprocessor + '/' + shop + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(shop + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + shop + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function stylescart() {
	return src('src/' + preprocessor + '/' + cart + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(cart + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + cart + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}


//обработка изображений
async function imagesshop() {
	imagecomp(
		path.src.img.src.shop, // Берём все изображения из папки источника
		path.src.img.build.shop, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

async function imagescart() {
	imagecomp(
		path.src.img.src.cart + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', // Берём все изображения из папки источника
		path.src.img.build.cart, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

//функция сборки проекта
function buildcopy() {
	return src([ // Выбираем нужные файлы
		path.src.pdf,
		path.src.icons.cart,
		path.src.min.css.shop + "/*",
		path.src.min.css.cart,
		path.src.min.js.shop + "/*",
		path.src.min.js.cart + "/*",
		path.src.img.src.shop + "/**/*",
		path.src.img.src.cart + "/**/*",
		path.src.font
		], { base: source_folder }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest(project_folder)) // Выгружаем в папку с финальной сборкой
}

//функция очистки папки dest
function cleanimg() {
	return del(path.src.img.build.all, { force: true }) // Удаляем все содержимое папки "app/images/dest/"
}

//функция очистки папки собранного файла
function cleandist() {
	return del(project_folder + '/**/*', { force: true }) // Удаляем все содержимое папки "dist/"
}

function html(){
	return src(path.src.html)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		  }))
		.pipe(dest(project_folder))
		.pipe(browserSync.stream())
}

//при сохранении скриптов, происходит автоматическое обновление страницы в браузере
function startwatch() {
 
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch([path.src.js.shop], scriptsshop);
	watch([path.src.js.cart], scriptscart);

	// Мониторим файлы препроцессора на изменения
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylesshop);
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylescart);



	// Мониторим файлы HTML на изменения
	watch(path.src.html).on('change', browserSync.reload);

	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch(path.src.img.src.shop, imagesshop);
	watch(path.src.img.src.cart, imagescart);
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

exports.startwatch = startwatch;

// Экспортируем функцию scripts() в таск scripts
exports.scriptsshop = scriptsshop;
exports.scriptscart = scriptscart;

// Экспортируем функцию styles() в таск styles
exports.stylesshop = stylesshop;
exports.stylescart = stylescart;

// Экспорт функции images() в таск images
exports.imagesshop = imagesshop;
exports.imagescart = imagescart;

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

exports.cleandist = cleandist;

exports.html = html;

exports.buildcopy = buildcopy;


// Создаем новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, html, 
					   stylesshop, stylescart,
					   scriptsshop, scriptscart,
					   imagesshop, imagescart, 
					   buildcopy);

// Экспортируем дефолтный таск с нужным набором функций
exports.default = series( 
	parallel(
	  html,
	  stylesshop, stylescart,
	  scriptsshop, scriptscart,
	  imagesshop, imagescart,
	), 
	parallel(
	  browsersync,
	  startwatch
	)
  );