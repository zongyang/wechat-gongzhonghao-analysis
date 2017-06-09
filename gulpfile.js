var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var bourbon = require('node-bourbon');
var colors = require('colors')

//html
gulp.task('html:tpl', function() {
	return gulp.src([
			'client/**/*.html',
			'!client/tpls/app.html',
			'!client/tpls/login.html'
		])
		.pipe(plugins.plumber())
		.pipe(plugins.rename(function(path) {
			path.dirname = "/tpls";
		}))
		.pipe(gulp.dest('dest'));
})
gulp.task('html:app', function() {
	return gulp.src(['client/tpls/app.html','client/tpls/login.html'])
		.pipe(gulp.dest('dest'))
})

gulp.task('html', ['html:tpl', 'html:app'])

//sass
gulp.task('sass', function() {
	return gulp
		.src([
			'client/**/*.sass'
		])
		.pipe(plugins.plumber())
		.pipe(plugins.sass({
			includePaths: bourbon.with('client/style')
		}))
		.pipe(plugins.concat('style.css'))
		.pipe(plugins.autoprefixer())
		.pipe(gulp.dest('dest'))
})

//js
gulp.task('js', function() {
	return gulp
		.src('client/**/*.js')
		.pipe(plugins.plumber())
		.pipe(plugins.concat('app.js', {
			newLine: ';'
		}))
		.pipe(plugins.jsbeautifier())
		.pipe(gulp.dest('dest'))
})

//server
gulp.task('server', function() {
	return plugins.nodemon({
		watch: ['app.js', 'server/**/*.js'],
		script: 'app.js',
		env: {
			"NODE_ENV": "development"
		}
	}).on('start', function() {
		console.log('server start!')
	})
})

//clean
gulp.task('clean', function(cb) {
	del([
		'dest/**',
		'!dest',
		'!dest/bower/**'
	]).then(function() {
		cb()
	});
})

//watch
gulp.task('watch', function() {
	//start all tasks
	runSequence('clean', ['html', 'js', 'sass'], 'server');
	//watch client side
	gulp.watch('client/**', ['html', 'js', 'sass']).on('change', change);
	//watch server side
	gulp.watch(['app.js', 'server/**']).on('change', change);
})

function change(event) {
	console.log(colors.green(event.path + ' was ' + event.type));
}