import Jquery from 'jquery';
import Handlebars from 'handlebars';

const templateLoader = (function(){
    const cache = {};
    function get(templateName){
        let promise = new Promise(function(resolve,reject){
            if(cache[templateName]){
                resolve(cache[templateName])
            } else{
                $.ajax(`../templates/${templateName}.handlebars`,{
                    method: 'GET',
                    contentType: 'aplication/json',
                    success: function(data){
                       let template = Handlebars.compile(data);
                       cache[templateName] = template;
                       resolve(template);
                    },
                    error: function(err){
                        reject(err)
                    }
                })
            }
        })
        return promise;
    }
 return {
     get
 }
}())
export {templateLoader};