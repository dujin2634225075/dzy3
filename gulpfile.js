let gulp = require("gulp");
let sass = require("gulp-sass");
let mincss = require("gulp-clean-css");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let webserver = require("gulp-webserver");
let htmlminify = require('gulp-html-minify');
var imagemin = require('gulp-imagemin');
//编译sass
gulp.task("devcss", () => {
        return gulp.src("./src/sass/**/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./build/css"))
    })
    //  //编译js
gulp.task("devjs", () => {
        return gulp.src("./src/js/index.js")
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest("./build/js"))

    })
    //启动静态服务
gulp.task("server", () => {
        return gulp.src("./src")
            .pipe(webserver({
                port: 8080,
                open: true,
                livereload: true
            }))
    })
    //监听
gulp.task("watch", () => {
        return gulp.watch(["./src/sass/**/*.scss", "./src/js/index.js"], gulp.series("devcss", "devjs"))
    })
    //启动
gulp.task("default", gulp.series("devcss", "devjs", "server", "watch"));


//压缩css
gulp.task("mincss", () => {
    return gulp.src("./build/css/**/*.css")
        .pipe(mincss())
        .pipe(gulp.dest("./build/css"))
});

//压缩js
gulp.task("minjs", () => {
    return gulp.src("./build/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"))
});
//压缩html
gulp.task("minhtml", () => {
    return gulp.src('./src/index.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('./build'))
});
//压缩image
gulp.task("minimage", () => {
    return gulp.src('./src/img/*.{jpg,png,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
});