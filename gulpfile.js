const {src, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const {dest} = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const sourcemaps = require("gulp-sourcemaps");

function css(done){
    //Compilar sass
    //Pasos 1 -identificar archivo, 2- Compilar archivo 3- Guardar el css
        src('src/scss/app.scss')
            .pipe( sourcemaps.init() )
            .pipe(sass())
            .pipe(postcss( [autoprefixer()] ))
            .pipe( sourcemaps.write('.') )
            .pipe(dest('build/css'));
        done();
}

function versionWebp(done){
    src("src/img/**/*.{png,jpg}")
    .pipe( webp() )
    .pipe(dest("build/img"))
    done();
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

function imagenes(done){
    src('src/img/**/*')
    .pipe( imagemin( {optimizationLevel: 3} ) )
    .pipe( dest('build/img') );
    done();
}

exports.css = css;
exports.dev = dev; 
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;  
exports.default = series(imagenes, versionWebp, css, dev);


