
/* 
    Collisions: there are 2 main options to handle collisions
    - separate chaining: store all data at same index using a nested data structure. we will never run out of space in the array this way
    - linear probing: move forward in the array and store at nearest empty slot. saves us from nested data structures
    We're gonna use separate chaining
*/



class HashTable {
    constructor(size=53) {
        // this will be a 3D array: an array of arrays of key-value pairs (arrays) 
        this.hashArray = new Array(size);
    }
  
    // hash function - we dont need to pass in array size since we're using a class
    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96
            total = (total * WEIRD_PRIME + value) % this.hashArray.length;
        }
        return total;
    }

    // set - accept key and value, hash the key, store the key-value pair using separate chaining
    set(key, value) {
        // hash key
        let index = this._hash(key)
        // if slot is currently empty, create a new subarray
        if (!this.hashArray[index]) this.hashArray[index] = []
        // add the new key-value pair to the array at the index
        this.hashArray[index].push([key,value])
    }

    // get - accept a key, hash the key, retrieve the key-value pair from the table, or return undefined
    get(key) {
        // hash key
        let index = this._hash(key)
        // if there is something at the index
        if (this.hashArray[index]) {
            // iterate through the nested array until found correct key-value pair
            for (let i = 0; i < this.hashArray[index].length; i++) {
                // if we found the correct key
                if (this.hashArray[index][i][0] === key) { // Note: this is an array of arrays of arrays
                    // return the value
                    return this.hashArray[index][i][1]
                }
            }
        }
        // else return undefined
        return undefined
    }

    // keys - returns a list of all keys in the table
    keys() {
        // create an array to return all keys
        let keysArray = []
        // loop over the entire map
        for (let i = 0; i < this.hashArray.length; i++) {
            // is there anything at the index?
            if (this.hashArray[i]) {
                // loop over all pairs stored at the index
                for (let j = 0; j < this.hashArray[i].length; j++) {
                    // if the key is not a duplicate (because our hash map may have duplicate data)
                    if (!keysArray.includes(this.hashArray[i][j][0])) {
                        // add the key to the array
                        keysArray.push(this.HashTable[i][j][0])
                    }
                }
            }
        }
        // return the keys
        return keysArray
    }

    // values - returns a list of all values in the table
    values() {
        // create an array to return all values
        let valuesArray = []
        // loop over the entire map
        for (let i = 0; i < this.hashArray.length; i++) {
            // is there anything at the index?
            if (this.hashArray[i]) {
                // loop over all pairs stored at the index
                for (let j = 0; j < this.hashArray[i].length; j++) {
                    // if the value is not a duplicate (because our hash map may have duplicate data)
                    if (!valuesArray.includes(this.hashArray[i][j][1])) {
                        // add the value to the array
                        valuesArray.push(this.HashTable[i][j][1])
                    }
                }
            }
        }
        // return the values
        return valuesArray
    }
}

let ht = new HashTable(17);
ht.set("maroon","#800000")
ht.set("yellow","#FFFF00")
ht.set("olive","#808000")
ht.set("salmon","#FA8072")
ht.set("lightcoral","#F08080")
ht.set("mediumvioletred","#C71585")
ht.set("plum","#DDA0DD")
ht.set("purple","#DDA0DD")
ht.set("violet","#DDA0DD")


ht.keys().forEach(function(key){
  console.log(ht.get(key));
})

