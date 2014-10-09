var browserSync  = require('browser-sync'),
    cache        = require('gulp-cached'),
    changed      = require('gulp-changed'),
    clean        = require('gulp-clean'),
    csso         = require('gulp-csso'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    jshint       = require('gulp-jshint'),
    less         = require('gulp-less'),
    minifyHtml   = require('gulp-minify-html'),
    plumber      = require('gulp-plumber'),
    prefix       = require('gulp-autoprefixer'),
    replace      = require('gulp-replace'),
    rev          = require('gulp-rev'),
    runSequence  = require('run-sequence'),
    size         = require('gulp-size'),
    stylish      = require('jshint-stylish'),
    uglify       = require('gulp-uglify'),
    usemin       = require('gulp-usemin'),
    using        = require('gulp-using'),
    util         = require('gulp-util'),
    zip          = require('gulp-zip'),
    paths        = {
                src: {
                    root: 'app',
                    html: 'app/**/*.html',
                    js: 'app/scripts/**/*.js',
                    less: 'app/styles/**/*.less',
                    images: 'app/images/**/*',
                    fonts: 'app/fonts/**/*'
                },
                dest: {
                    root: 'dist',
                    html: 'dist/*.html',
                    js: 'dist',
                    css: 'dist'
                },
                tmp: {
                    root: 'tmp',
                    css: 'tmp'
                }
    };

gulp.task('clean', function() {
    return gulp.src([paths.dest.root, paths.tmp.root], {
            read: false
        })
        .pipe(plumber())
        .pipe(clean());
});

gulp.task('lint', function() {
    return gulp.src(paths.src.js)
        .pipe(plumber())
        .pipe(cache('linting'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .on('error', util.log);
});

gulp.task('less', function() {
    return gulp.src(paths.src.less)
        .pipe(plumber())
        .pipe(changed(paths.tmp.css, {extension: '.css'}))
        .pipe(using())
        .pipe(less())
        .pipe(prefix('last 1 version', '> 1%', 'ie 9', 'ie 8'))
        .pipe(size({
            showFiles: true,
            title: 'less'
        }))
        .pipe(gulp.dest(paths.tmp.css))
        .pipe(browserSync.reload({
            stream: true
        }))
        .on('error', util.log);
});

gulp.task('html', function() {
    return gulp.src(paths.src.html)
        .pipe(plumber())
        .pipe(usemin({
            css: [csso(), rev()],
            js: [uglify(), rev()],
            html: [minifyHtml({
                comments: true,
                conditionals: true,
                empty: true,
                quotes: true,
                spare: true
            })]
        }))
        .pipe(gulp.dest(paths.dest.root));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ['dist', 'app', 'tmp', './']
        }
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('watch', function() {
    gulp.watch([paths.src.less], ['less']);
    gulp.watch([paths.src.js], ['lint', 'bs-reload']);
    gulp.watch([paths.src.html], ['bs-reload']);
});

gulp.task('inline', function() {
    return gulp.src(paths.dest.html)
        .pipe(plumber())
        .pipe(replace(new RegExp('<link rel="stylesheet" href="(.*?)">', 'g'), function(match, src) {
            return '<style>' + fs.readFileSync(paths.dest.root + '/' + src, 'utf8') + '</style>';
        }))
        .pipe(replace(new RegExp('<script src="(.*?)"><\/script>', 'g'), function(match, src) {
            return '<script>' + fs.readFileSync(paths.dest.root + '/' + src, 'utf8') + '</script>';
        }))
        .pipe(gulp.dest(paths.tmp.root));
});

gulp.task('zip', function () {
    return gulp.src(paths.dest.root + '/*')
        .pipe(plumber())
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest(paths.tmp.root));
});

gulp.task('build', function() {
    runSequence('clean', [
            'lint',
            'less'
        ],
        'html',
        'inline',
        'browser-sync',
        'zip');
});

gulp.task('default', function() {
    runSequence('clean', [
            'lint',
            'less',
            'watch'
        ],
        'browser-sync');
});