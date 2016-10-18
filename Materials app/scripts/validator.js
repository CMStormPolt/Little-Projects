let validator = (function(){
    function lenght(text,min,max){
        return new Promise(function(resolve,reject){
            if(text.lenght >= min && text.lenght <= max){
                resolve('okey')
            } else {
                reject('error')
            }
        })
    }
    function passHash(password){
        return sha1(password)
    }


    return {
        lenght,
        passHash
    }
}())

export {validator}