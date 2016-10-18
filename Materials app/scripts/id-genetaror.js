let data = [];
let idGen = (function(){
    let id = 0;
    function newId(){
        id += 1;
        return id
    } 
    return {
        newId
    }
}())

