import 'jquery';
import {router} from './routing.js';

// start the app
    $(document).ready(function(ev){
        if(sessionStorage.getItem('CookiesKey')){
            $('#nav-login').addClass('hidden');
            $('#nav-logout').removeClass('hidden');
            $('#new-material').removeClass('hidden');        
        } 
    })
// start routing
   router.init()