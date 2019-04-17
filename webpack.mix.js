const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": __dirname + "/resources/js"
        }
    }
});
mix.react('resources/js/app.js', 'public/js');
mix.styles('public/dist/css/skins/_all-skins.css', 'public/dist/css/skins/_all-skins.min.css');
