

function countDown(n) {
    // base case
    if (n <= 0) return

    console.log(n)

    countDown(n - 1)
}


function sumRange(n) {
    if(n === 1) return 1
    return n + sumRange(n - 1)
}


function nFactorial(n) {
    let total = 1
    for (let i = n; i > 1; i--) {
        total *= i
    }
    return total
}
function nFactorial2(n) {
    if (n === 1) return 1
    return n * nFactorial2(n - 1)
}


// recursive helper methods
function collectOddValues(arr){
    
    // result must not be contained within the recursive method because it would be reset each call
    let result = [];

    // this is the recursive function
    function helper(helperInput){
        if(helperInput.length === 0) {
            return;
        }
        
        if(helperInput[0] % 2 !== 0){
            result.push(helperInput[0])
        }
        
        helper(helperInput.slice(1))
    }
    
    helper(arr)

    return result;
}
collectOddValues([1,2,3,4,5,6,7,8,9])

// same thing without helper method (pure recursion)
function collectOddValues2(arr) {
    // were defining this new array every time the function is called
    let newArr = []

    // base case
    if (arr.length === 0) {
        return newArr
    }

    if (arr[0] % 2 !== 0) {
        newArr.push(arr[0])
    }

    // all arrays created are concattonated at the end
    return newArr.concat(collectOddValues2(arr.slice(1)))
}

