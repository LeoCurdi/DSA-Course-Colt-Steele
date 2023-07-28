
// use built in js function to time how long a function takes
    function addUpTo(n) {
        var sum = 0
        for (var i = 0; i < n; i++) {
            sum += i
        }
        return sum
    }
    function addUpToFast(n) {
        return (n * (n + 1)) / 2
    }

    var t1 = performance.now()
    addUpTo(1000000000)
    var t2 = performance.now()
    console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`) 
    t1 = performance.now()
    addUpToFast(1000000000)
    t2 = performance.now()
    console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`) 
    // you can see that the first function takes linearly longer as n goes up O(n), but the second function is constant O(1)
    // tracking time is not reliable however since it is not 100% consistent across machines or even the same machine
    // basically, we need to be able to calculate whats faster without timing it

// counting operations
    function addUpToFast(n) {
        return (n * (n + 1)) / 2 // *, +, / = 3 operations so O(3)
    } // total is O(3)
    function addUpTo(n) {
        var sum = 0 // = is 1 op so O(1)
        for (var i = 0; i < n; i++) { // = is 1 op that happens once so O(1) and <,++(+,=) is 3 ops that happen n times so O(3n)
            sum += i // +,= is 2 ops times n so O(2n)
        }
        return sum
    } // total is O(5n + 2)
    // counting ops isnt really important though bc we just care about the big picture
    // so we simplify to 1,n,n^2 etc 


// space complexity
    // there are 2 things that take up space: the algorithm and the input
    // we only care about 'auxiliary space' which is the space of the algorithm as n grows, without the space n will take
    function sum(array) { // array takes up space but we exclude the input
        var total = 0 // integer takes up constant space
        for (var i = 0; i < array.length; i++) {  // another int i takes constant space
            total += array[i]
        }
        return total
    } // total space is O(2) = constant. space taken up by the algo will always be 2 no matter the size of the input array
    function double(array) {
        var newArray = []
        for (var i = 0; i < array.length; i++) { 
            newArray.push(array[i]) // new array will be the size of the input array so thats O(n)
        }
    } // total is linear o(n)


// many array methods are o(n) - insert at front etc. 
// object methods are typically constant because object members arent indexed - which has advantages and disadvantages


