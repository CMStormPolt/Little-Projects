/* globals module */

"use strict";

function solve(){
    let costSum = 0,
        typesToReturn = []
    class Product{
        constructor(productType,name,price){
     
                this._productType = productType;   
                 this._name = name;  
                 this._price = price;
            
        }
       get productType(){
           return this._productType;
       } 
       set productType(newType){
           if(typeof newType == 'string'){
               this._productType = newType
           }
       }
       get name(){
           return this._name;
       } 
       set name(newName){
           if(typeof newName == 'string'){
               this._name = newName;
           }
       }
       get price(){
           return this._price;
       } 
       set price(newPrice){
           if(typeof newPrice == 'number'){
               this._price = newPrice;
           }
       }
    }

    class ShoppingCart {
      constructor(){
          this._products = [];      
    }
    get products(){
        return this._products;
    }
    add(product){
        this._products.push(product)
        return this;
    }
    remove(product){
        let len = this._products.length;  
        for(let i = 0; i < len; i += 1){
            if(this.products[i].name == product.name && this.products[i].productType == product.productType &&
            this.products[i].price == product.price){
                this._products.splice(i,1)
                return;
            }
        }
        throw 'I am throwing you'
    }
    showCost(){
    let len = this._products.length;  
        for(let i = 0; i < len; i += 1){
           costSum += this._products[i].price;
        }
        return costSum;
    }
    showProductTypes(){
        let len = this._products.length;
          for(let i = 0; i < len; i += 1){
              let toBeAdded = true;
    
              for(let j = 0; j < typesToReturn.length; j += 1){
                  if(this._products[i].productType == typesToReturn[j]){
                      console.log(this.products[i].productType);
                      toBeAdded = false
                  }
              }
              if(toBeAdded){
                  typesToReturn.push(this._products[i].productType)
              }
          }
          typesToReturn.sort(function(a,b){
              
                if(a < b) {
                    return - 1
                } else if(a > b){
                    return 1
                }
              return 0
          })
          return typesToReturn;
    }
    getInfo(){
      let products = [],
          totalPrice = 0,
          len = this.products.length;
          for(let i = 0; i < len; i += 1){
             let toBeAdded = true,
                 elToBeAdded = {
                     name: 'notYet',
                     totalPrice: 0,
                     quanity: 0
                 },
                 elToAdd;
             for(let j = 0; j < products.length; j += 1){
                 if(this.products[i].name == products[j].name){
                     toBeAdded = false;
                     elToAdd = products[j];
                     break;
                 }
             }
             if(toBeAdded){
                elToBeAdded.name = this.products[i].name;
                elToBeAdded.totalPrice = this.products[i].price;
                elToBeAdded.quanity = 1;
                totalPrice += this.products[i].price;
                products.push(elToBeAdded);

             } else {
                elToAdd.totalPrice += this.products[i].price;
                elToAdd.quanity += 1; 
                totalPrice += this.products[i].price;
             }
          }
          return {
              totalPrice: totalPrice,
              products: products
          }
    }

    
    }
    return {
        Product, ShoppingCart
    };
}

module.exports = solve