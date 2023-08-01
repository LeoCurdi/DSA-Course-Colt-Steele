
/* 
    Write a recursive function called reverse which accepts a string and returns 
    a new string in reverse.
*/
function reverse(s) {
    if (s.length <= 1) return s // <= will catch an empty string
    return reverse(s.slice(1) + s[0]) // put the first char at the end and call reverse on the rest of the string
}

/* 
    Write a recursive function called isPalindrome which returns true if the string passed 
    to it is a palindrome (reads the same forward and backward). Otherwise it returns false.
*/
function isPalindrome(s) {
    // base case: if its only 1 char or 0 chars it is for sure a palindrome
    if (s.length < 2) return true

    // if first char equals end char, it passes this round, call again on inner string
    if (s[0] === s[s.length - 1]) return isPalindrome(s.slice(1, -1))

    // else it fails and is not a palindrome
    return false
}

/* 
    Write a recursive function called someRecursive which accepts an array and a callback. 
    The function returns true if a single value in the array returns true when passed to 
    the callback. Otherwise it returns false.

    // SAMPLE INPUT / OUTPUT
    // const isOdd = val => val % 2 !== 0;

    // someRecursive([1,2,3,4], isOdd) // true
    // someRecursive([4,6,8,9], isOdd) // true
    // someRecursive([4,6,8], isOdd) // false
    // someRecursive([4,6,8], val => val > 10); // false
*/
function someRecursive(arr, callback) {
    if (arr.length === 0) return false

    // as soon as we get a true, end the recursive chain
    const result = callback(arr[0])
    if (result) return true

    // if we havent gotten a true yet, keep going
    return someRecursive(arr.slice(1), callback)
}

/* 
    Write a recursive function called flatten which accepts an array of arrays and returns 
    a new array with all values flattened.

    // flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
    // flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
    // flatten([[1],[2],[3]]) // [1,2,3]
    // flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]
*/
function flatten(arr) {
    let newArr = []

    // call flatten on each element in the array, but only if its an array
    for(let i = 0; i < arr.length; i++) {
        // if its an array, call flatten on it and concattonate the result with the new array
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatten(arr[i])) // if we dont say 'newArr =', the return of concat will not be saved anywhere
        }
        // else its just a number and can be pushed to the new array
        else {
            newArr.push(arr[i])
        }
    }

    return newArr
}

/* 
    Write a recursive function called capitalizeFirst. Given an array of strings, 
    capitalize the first letter of each string in the array.
*/
function capitalizeFirst(arr) {
    if (arr.length === 1) {
        return [arr[0][0].toUpperCase() + arr[0].substr(1)] // this is how you cap the first char in a string in an array
    }

    const newArr = capitalizeFirst(arr.slice(0, -1))

    // uppercase the last string and push it to the result of the recursive call
    const string = arr.slice(arr.length - 1)[0][0].toUpperCase() + arr.slice(arr.length - 1)[0].substr(1)
    newArr.push(string)

    return newArr
}

/* 
    Write a recursive function called nestedEvenSum. Return the sum of all even 
    numbers in an object which may contain nested objects.
*/
function nestedEvenSum(obj) {
    // set up a loop to iterate through each key in the object
    // if a key is its own object do a recursive call
    // check if a key is a number and return it
    let sum = 0
    for (let key in obj) {
        // if we get an obj within the obj
        if (typeof obj[key] === 'object') sum += nestedEvenSum(obj[key])

        // if we get an even number
        else if (typeof obj[key] === 'number' && obj[key] % 2 === 0) sum += obj[key]
    }

    return sum
}

/* 
    Write a recursive function called capitalizeWords. Given an array of words, 
    return a new array containing each word capitalized.
*/
function capitalizeWords(arr) {
    // base case: return an array that has its only word capitalized
    if (arr.length === 1) {
        return [arr[0].toUpperCase()] // uppercase the whole thing
    }

    // create a new array and fill it with the recursive result
    const newArr = capitalizeWords(arr.slice(0, -1))

    // combine new array with the current capitalized string
    const string = arr.slice(arr.length - 1)[0].toUpperCase()
    newArr.push(string)

    // return the new array
    return newArr
}

/* 
    Write a function called stringifyNumbers which takes in an object and finds all of the 
    values which are numbers and converts them to strings. Recursion would be a great way 
    to solve this!
*/
function stringifyNumbers(obj) {
    // object may contain nested objects. this would be the time to do a recursive call

    // its bad practice to modify the original object, so we should create a new one
    const newObj = {}

    // traverse the object
    for (let key in obj) {
        // if nested object. we must make sure its truly an object and not an array bc js calssifies arrays as objects
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) newObj[key] = stringifyNumbers(obj[key])

        // if number
        else if (typeof obj[key] === 'number') newObj[key] = obj[key].toString()

        // else copy it over directly
        else newObj[key] = obj[key]
    }

    // return the object with numbers stringified
    return newObj
}

/* 
    Write a function called collectStrings which accepts an object and returns an array of 
    all the values in the object that have a typeof string
*/
// pure recursion way
function collectStrings(obj) {
    // create an array
    const arr = []

    // concat the array with current result + recursive result
    // traverse the object
    for (let key in obj) {
        // if nested object. dont check for array here because we can treat both the same
        if (typeof obj[key] === 'object') arr = arr.concat(collectStrings(obj[key]))

        // if string - push it to the array
        else if (typeof obj[key] === 'string') arr.push(obj[key])

        // else do nothing
    }

    // return the array
    return arr
}
// helper method way
function collectStrings(obj) {
    // create an array
    const arr = []

    function helper(obj2) {
        for (let key in obj2) {
            // if nested object. dont check for array here because we can treat both the same
            // we dont need to concat anything because we arent returning arrays in the recursive function. it is rather directly pushing to the final array
            // so we only ever need to create 1 array with this version
            if (typeof obj2[key] === 'object') return helper(obj2[key])
    
            // if string - push it to the array
            else if (typeof obj2[key] === 'string') arr.push(obj2[key])
    
            // else do nothing
        }
    }
    helper(obj)

    // return the array
    return arr
}

