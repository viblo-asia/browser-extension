const { mix } = require('laravel-mix');

mix.js('src/js/index.js', 'build/js/index.js')
   .js('src/js/extensions/background.js', 'build/js/extensions/background.js')
   .sass('src/sass/app.sass', 'build/css/app.css');
