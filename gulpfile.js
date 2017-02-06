var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'build';
elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix.webpack('index.js');
});
