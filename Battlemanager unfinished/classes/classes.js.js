function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };
    let alignments = ['good', 'neutral', 'evil'],
        idCount = 0,
        commanders = [];


   //class Spell
    class Spell{
        constructor(name,manaCost,effect){
          this.name = name;
          this.manaCost = manaCost;
          this.effect = effect;
        }
        get name(){
            return this._name;
        }
        set name(newName){
            if(typeof newName != 'string') {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE)
            }
            if(newName.length < 2 || newName.length > 20) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH)
            }
           this._name = newName
        }
        get manaCost(){
            return this._manaCost;
        }
        set manaCost(newManaCost){
            if(typeof newManaCost != 'number'){
                throw new Error(ERROR_MESSAGES.INVALID_MANA)
            }
            if(newManaCost <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA)
            }
           
           this._manaCost = newManaCost;
        }
        get effect(){
            return this._effect;
        }
        set effect(newEffect){
            if(typeof newEffect != 'function' || newEffect.length != 1){
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT)
            }           
           this._effect = newEffect;
        }
    }
    class Unit{
        constructor(name,alignment){
             this.name = name;
             this.alignment = alignment;
        }
        get name(){
            return this._name;
        }
        set name(newName){
            if(typeof newName != 'string') {
                throw new Error()
            }
            if(newName.length < 2 || newName.length > 20) {
                throw new Error
            }
           this._name = newName
        }
        get alignment(){
            return this._alignment;
        }
        set alignment(newAligm){
            let aligmOkey = false;
            for(let i = 0; i < 3; i += 1){
                if(newAligm === alignments[i]){
                    aligmOkey = true;
                    break;
                }
            }
            if(aligmOkey){
                this._alignment = newAligm;
            } else{
                throw new Error('Alignment must be good, neutral or evil!');
            }
        }
    }
    class ArmyUnit extends Unit{
        constructor(options){
            super(options.name,options.alignment);
            this.damage = options.damage;
            this.health = options.health;
            this.count = options.count;
            this.speed = options.speed;
            this._id = idCount += 1
        }
        get damage(){
            return this._damage
        }
        set damage(newDamage){
            if(typeof newDamage != 'number' || newDamage <= 0 || newDamage > 100 || !(Number.isInteger(newDamage))){
                throw new Error();
            }
            this._damage = newDamage
        }
        get health(){
            return this._health;
        }
        set health(newHealth){
            if(typeof newHealth != 'number' || newHealth <= 0 || newHealth > 200){
                throw new Error();
            }
            this._health = newHealth;
        }
        get count(){
            return this._count
        }
        set count(newCount){
            if(typeof newCount != 'number' || newCount <= 0 || !(Number.isInteger(newCount))){
                throw new Error();
            }
            this._count = newCount;
        }
        get speed(){
            return this._speed;
        }
        set speed(newSpeed){
            if(typeof newSpeed != 'number' || newSpeed <= 0 || newSpeed > 100){
                throw new Error();
            }
            this._speed = newSpeed;
        }
        get id(){
            return this._id;
        }
    }
    class Commander extends Unit{
        constructor(name, alignment, mana){
            super(name,alignment);
            this.mana = mana;
            this._spellbook = [],
            this._army = [];
        }
        get mana(){
            return this._mana;
        }
        set mana(newMana){
            if(typeof newMana != 'number' || newMana <= 0 || !(Number.isInteger(newMana))){
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
            this._mana = newMana;
        }
        get spellbook(){
            return this._spellbook;
        }
        get army(){
            return this._army;
        }

    }
   function findCommanders(query){
       let commandersToReturn = [],
           len = commanders.length;
         
       if(query.name && query.alignment){
                  
           for(let i = 0; i < len; i += 1){
               if(commanders[i].name == query.name && commanders[i].alignments == query.alignment){
                   commandersToReturn.push(commanders[i])
               }
           } commandersToReturn.sort(function(a,b){
              
                if(a.name < b.name) {
                    return - 1
                } else if(a.name > b.name){
                    return 1
                }
              return 0
          })
          return commandersToReturn;
       }
      if(query.name && !query.alignment){

           for(let i = 0; i < len; i += 1){
               if(commanders[i].name == query.name ){
                   commandersToReturn.push(commanders[i])
               }
           } commandersToReturn.sort(function(a,b){
              
                if(a.name < b.name) {
                    return - 1
                } else if(a.name > b.name){
                    return 1
                }
              return 0
          })
          return commandersToReturn;
       }
       if(!query.name && query.alignment){
           
           for(let i = 0; i < len; i += 1){
               if(commanders[i].alignment == query.alignment ){
                   commandersToReturn.push(commanders[i])
               }
           } commandersToReturn.sort(function(a,b){
              
                if(a.name < b.name) {
                    return - 1
                } else if(a.name > b.name){
                    return 1
                }
              return 0
          })
          return commandersToReturn;
       }
    }


    const battlemanager = {
        getCommander: function(name, alignment, mana){
             return new Commander(name, alignment, mana)
        },
        getArmyUnit: function(options){
             return new ArmyUnit(options)
        },
        getSpell: function(name, manaCost, effect){
             return new Spell(name, manaCost, effect)
        },
        addCommanders: function(...comms){
            let len = comms.length;
            for(let i = 0; i < len; i += 1){
                commanders.push(comms[i])
            }
             return this;
        },
        addArmyUnitTo: function(commanderName, armyUnit){
            
        },
        addSpellsTo: function(commanderName,...spells){

        },
        findCommanders: function(query){
            return findCommanders(query)
        }
        ,
        findArmyUnitById: function(id){

        },
        findArmyUnits: function(query){

        },
        spellcast: function(casterName, spellName, targetUnitId){

        },
        battle: function(attacker, defender){

        }
    };

    return battlemanager;
}
let battlemanager = solve();
//    console.log( battlemanager.getArmyUnit({
//                     name: 'Cavalry',
//                     damage: 80,
//                     health: 80,
//                     speed: 30,
//                     count: 15,
//                     alignment: 'neutral'
//                 }))
//    console.log(battlemanager.getCommander(22,14,4))
let p = battlemanager.getCommander('Cyki', 'good', 50)
battlemanager.addCommanders(p)
console.log(battlemanager.findCommanders({ name: 'Cyki' })[0] )

module.exports = solve;