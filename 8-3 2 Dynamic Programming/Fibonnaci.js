
// write a recursive function to calculate the nth number in the fibonnaci sequence
function fib(n) {
    if (n < 3) return 1
    return fib(n - 1) + fib(n - 2)
}
/* 
    the plain recursive solution above is not very efficent, given the 
    repetition of the overlapping subproblems. 
    (fib(5) = fib(4) + fib(3), fib(4) = fib(3) + fib(2)) where fib(3) is computed twice etc
    so every time we add 1 to n, we're doubling what we have to calculate and essentially just calculating the same thing over and over again
    This comes out to O(2^N) exponential time - terrible. Technically it's O(1.6^N) for math nerds but either way its bad
    If you try to call fib(n) in the browser it will work until somewhere around 45, after that it will crash the browser
    We need to come up with a better algorithm that removes the duplication
*/



/* 
    we're going to use an array to keep track of all values in the fib 
    sequence that we've already calculated, such that we eliminate duplication
*/
function fib2(n, memory = []) {
    // if we've already calculated it, just return it (this is where we really save on time)
    if (memory[n] !== undefined) return memory[n]
    // base case
    if (n < 3) return 1
    // recursive case
    let result = fib2(n - 1, memory) + fib2(n - 2, memory)
    memory[n] = result // save our work
    return result
}
/* 
    This new version is O(N) linear time, because each time we add 1 to n,
    we just have to look up 2 values in an array - easy work.
    We can now calculate all the way up until the result hits infinity
    Note: we will reach a point at like fib(10,000) where we hit max call stack size and get a stack overflow error
*/

// rewrite fib2 but cut back on code
function fib3(n, memory = [undefined, 1, 1]) { // build the base case into the array
    if (memory[n] !== undefined) return memory[n]
    let result = fib3(n - 1, memory) + fib3(n - 2, memory)
    memory[n] = result
    return result
}



// tabulated (non recursive) version
// this version will save us from the stack overflow error, letting us go even higher than fib(10,000)
// space complexity is better than the recursive version. we have an array of size n vs a call stack of size n
function fib4(n) {
    if (n < 3) return 1
    let fibNums = [0,1,1]
    // iterate
    for (let i = 3; i <= n; i++) {
        fibNums[i] = fibNums[i - 1] + fibNums[i - 2]
    }
    return fibNums
}

