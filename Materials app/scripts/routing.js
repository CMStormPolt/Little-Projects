import Navigo from 'navigo';
import {data} from 'functions';
let router = (function(){
    let navigo;
    function init(){
        navigo = new Navigo(null,false);
    
    navigo
        .on('/new-material', function(){
            data.loaders.loadNewMat();
        })
        .on('/materials/:id', function(){
            data.loaders.loadSingleMaterial();
        })
        .on('/profiles/:username', function(){
            data.loaders.loadUser();
        })
        .on('/home/:searchParams', function(){
            data.loaders.loadSearchResult();
        })
        .on('/home', function(){
            data.loaders.loadHome();
        })
        .on('/login', function(){
            data.loaders.loadLogin()
        })
        .on('/', function(){
            window.location = '#/home';
        }) 
         .resolve();   
    }
return {
    init
}
}())
export {router};