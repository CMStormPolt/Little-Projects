SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'app': '../scripts/app.js',
        'jquery': '../bower_components/jquery/dist/jquery.js',
        'handlebars': '../bower_components/handlebars/handlebars.js',
        'navigo': './bower_components/navigo/lib/navigo.js',
        'functions': '../scripts/functions.js',
        'tloader': '../scripts/template-loader.js',
        'sha1': '../bower_components/js-sha1/src/sha1.js',
        'validator': '../scripts/validator.js',
        'lodash': '../node_modules//lodash/lodash.js'
    }
})
System.import('app');