import Jquery from 'jquery';
import 'lodash';
import {templateLoader} from 'tloader';
import {validator} from 'validator';

let data = (function(){
    //Loaders
        //login Loader 
    function loadLogin(){
        templateLoader.get('register')
        .then(function(template){
                let html = template();
                $('#content').html(html);
                $('#login-btn').on('click',function(ev){
                    login()
                        .then(function(data){
                            openSession(data.result.authKey);
                            $('#nav-login').addClass('hidden');
                            $('#nav-logout').removeClass('hidden');
                            window.location = "#/home";
                        })
                })
                $('#reg-button').on('click',function(ev){
                    registration();
                })
            })
        }
    function loadHome(){
        Promise.all([getMaterials(),templateLoader.get('home')])
            .then(function([data,template]){
                let html = template(data);
                $('#content').html(html);
                checkIfLoggedIn();
                $('#nav-logout').on('click',function(ev){
                       closeSession();              
                       })            
                
                    })
         }
    function loadSingleMaterial(){
        let id = window.location.hash.slice(-36);
        Promise.all([getSingleMaterial(id),templateLoader.get('single-material')])
            .then(function([data,template]){
                let html = template(data);
                $('#content').html(html);
                $('#nav-logout').on('click',function(ev){
                       closeSession();              
                       })            
                    })
                }
    function loadUser(){
        let usernameStart = window.location.hash.lastIndexOf('/') + 1;
        let name = window.location.hash.slice(usernameStart);
        Promise.all([getUser(name),templateLoader.get('single-user')])
            .then(function([data,template]){
                let html = template(data);
                $('#content').html(html);
                $('#nav-logout').on('click',function(ev){
                       closeSession();              
                       })            
                    })
                }
    function loadNewMat(){
        templateLoader.get('material-maker')
        .then(function(template){
                let html = template();
                $('#content').html(html);
                $('#sumbit-material').on('click',function(ev){
                  createNewMaterial();
                  window.location = '#/home'
                })
            })
    }
    function loadSearchResult(){
        Promise.all([getMaterialsFilter(),templateLoader.get('home')])
            .then(function([data,template]){
                let html = template(data);
                $('#content').html(html);
                checkIfLoggedIn();
                $('#nav-logout').on('click',function(ev){
                       closeSession();              
                       })            
                    })
    }
// controller functions
    //login and registration
    function registration(){
        let user = {
            username : $('#form-name').val(),
            password : $('#login-pass').val()
        }
        console.log(user);
        return new Promise(function(resolve,reject){
             $.ajax('api/users',{
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function(data){
                    console.log(data);
                    resolve(data)
                },
                error: function(err){
                    reject(err)
                }
            })
        })
    }

    function login(){
         let user = {
            username : $('#form-name').val(),
            password : $('#login-pass').val()
        }
        return new Promise(function(resolve,reject){
            $.ajax('api/users/auth',{
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function(data){
                    resolve(data)
                },
                error: function(err){
                    reject(err)
                }
            })
        })
    }
    function openSession(authKey){
        sessionStorage.setItem('CookiesKey', authKey);
         $('#new-material').removeClass('hidden');
         $('#add-comment').css('display','block');
    };
    function closeSession(){
        sessionStorage.removeItem('CookiesKey');
      $('#nav-login').removeClass('hidden');
      $('#new-material').addClass('hidden')
      $('#nav-logout').addClass('hidden');  
      $('.add-comment').css('display','none');
    };
    function checkIfLoggedIn(){
          if(sessionStorage.getItem('CookiesKey')){
              $('.add-comment').removeClass('maybe-hidden')
                    .on('click', function(ev){
                        let targetId = findMatParrent(ev);
                        $('.cust-form-add').css('display','block');
                    $('#sumbit-comment').on('click',function(){
                      createNewComment(targetId);
                      let $this = $(this);
                      $this.parents('.cust-form-add').css('display','none')
                      window.location = `http://localhost:3001/?#/materials/${targetId}`;
                        })
                      })
                    }
                    $('#sumbit-search').on('click',function(ev){
                        let target = $('#search-text').val()
                        window.location = `#/home/${target}`
                    })
    }

    // get materials
    function getMaterials(){
        let promise = new Promise(function(resolve,reject){
            $.ajax('api/materials',{
                method: 'GET',
                contentType: 'application/json',
                success: function(data){
                    resolve(data)
                },
                error: function(err){
                    reject(err);
                }
            })
        })
        return promise  
    }
    function getMaterialsFilter(){
      let pattern = $('#search-text').val();   
        let promise = new Promise(function(resolve,reject){
            $.ajax(`api/materials/?filter=${pattern}`,{
                method: 'GET',
                contentType: 'application/json',
                success: function(data){
                    console.log(data);
                    resolve(data)
                },
                error: function(err){
                    reject(err);
                }
            })
        })
        return promise  
    }
    function getSingleMaterial(id){
        let promise = new Promise(function(resolve,reject){
            $.ajax(`api/materials/${id}`,{
                method: 'GET',
                contentType: 'application/json',
                success: function(data){
                    resolve(data)
                },
                error: function(err){
                    reject(err);
                }
            })
        })
        return promise
    }

    //users controller functions 
    function getUser(name){
      let promise = new Promise(function(resolve,reject){
            $.ajax(`api/profiles/${name}`,{
                method: 'GET',
                contentType: 'application/json',
                success: function(data){
                    resolve(data)
                },
                error: function(err){
                    reject(err);
                }
            })
        })
        return promise   
    }
   function createNewMaterial(){
       let postBody = {
            title: $('#mat-title').val(),
            description: $('#mat-desc').val(),
            img: $('pic-source').val()
        }
        return new Promise(function(resolve,reject){
        $.ajax('/api/materials',{
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postBody),
            headers: {
                'x-auth-key': sessionStorage.getItem('CookiesKey')
            },
            success: function(data){
                console.log(data);
                resolve(data)
            },
            error: function(err){
                reject(err)
            }
       })
     })
   }
  function createNewComment(target){
      let postBody = {
            commentText: $('#comm-text').val()
        }
        return new Promise(function(resolve,reject){
        $.ajax(`/api/materials/${target}/comments`,{
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(postBody),
            headers: {
                'x-auth-key': sessionStorage.getItem('CookiesKey')
            },
            success: function(data){
                resolve(data)
            },
            error: function(err){
                reject(err)
            }
       })
     })
  }
  function findMatParrent(button){
   let target = $(button.target);
   let parent =  target.parents('.container');
          return parent.attr('id');
  }

    return {
        loaders: {
            loadLogin,
            loadHome,
            loadSingleMaterial,
            loadUser,
            loadNewMat,
            loadSearchResult
        },
        user: {
            registration,
            login
        }
    }
}())
export {data}

