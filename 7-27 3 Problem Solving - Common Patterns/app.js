
// Note: these patterns will not solve all problems, but they will help sove some of the most frequent ones


// Frequency Counters
    // use any time you have 2 pieces of data and need to compare them
	// uses objects or sets to collect values or frequencies of values
	// can avoid nested loops

    /* 
        write a function that accepts 2 arrays and returns true if every value in the array has
        its corresponding value squared in the second array. the frequency of values must be the same
    
        ex: [1,2,3]: [4,1,9] true
        ex: [1,2,3]: [1,9] false
        ex: [1,2,1]: [4,4,1] false: freq must be same
    */
    // Naive solution: o(n^2)
    function same(arr1, arr2){
        if(arr1.length !== arr2.length){
            return false;
        }
        for(let i = 0; i < arr1.length; i++){
            let correctIndex = arr2.indexOf(arr1[i] ** 2) // this is n^2 bc indexOf loops over the whole array and were in a loop
            if(correctIndex === -1) {
                return false;
            }
            //console.log(arr2);
            arr2.splice(correctIndex,1)
        }
        return true;
    }
    same([1,2,3,2], [9,1,4,4])
        
    // refactored solution: o(3n)
    function same(arr1, arr2){
        if(arr1.length !== arr2.length){
            return false;
        }
        let frequencyCounter1 = {}
        let frequencyCounter2 = {}
        for(let val of arr1){
            frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
        }
        for(let val of arr2){
            frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1        
        }
        console.log(frequencyCounter1);
        console.log(frequencyCounter2);
        for(let key in frequencyCounter1){
            if(!(key ** 2 in frequencyCounter2)){
                return false
            }
            if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
                return false
            }
        }
        return true
    }
    same([1,2,3,2,5], [9,1,4,4,11])
    
    /*
        Anagram problem: check if string2 can be made of the characters in string1 with no repeats and using all of string1
        Ex: 'rat', 'car': true, 'rat', 'ra': false
        ***in an interview you should ask "are there numbers / other non alpha chars? do we care about case?" etc
    */
   // my solution
    function isAnagram(s1, s2) {
        // initial filter
        if (s1.length !== s2.length) return false

        // set up frequency tracking objects
        let f1 = {}
        let f2 = {}

        // loop through first string and record freqs
        for (let val of s1) f1[val] = (f1[val] || 0) + 1 // add 1 to freq of given char, or set it to 0 if the key doesnt yet exist

        // loop through second string and record freqs
        for (let val of s2) f2[val] = (f2[val] || 0) + 1

        // loop to compare freqs
        for (let key in f1) { // iterate through f1
            // note: we already know both freq tables have the same total number of chars
            // if fail return false, else true by default
            //if (!f2[key]) return false
            if (!f2[key] || f1[key] !== f2[key]) return false // we could have an error though if f2[key] is undefined so we need to check that above
        }

        // return true
        return true
    }
    // Colt's solution: only uses 1 freq table but still same o(n) as mine so im ok
    function validAnagram(first, second) {
        if (first.length !== second.length) {
          return false;
        }
      
        const lookup = {};
      
        for (let i = 0; i < first.length; i++) {
          let letter = first[i];
          // if letter exists, increment, otherwise set to 1
          lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
        }
        console.log(lookup)
      
        for (let i = 0; i < second.length; i++) {
          let letter = second[i];
          // can't find letter or letter is zero then it's not an anagram
          if (!lookup[letter]) {
            return false;
          } else {
            lookup[letter] -= 1;
          }
        }
      
        return true;
      }
      // {a: 0, n: 0, g: 0, r: 0, m: 0,s:1}
      validAnagram('anagrams', 'nagaramm')


// Multiple Pointers
    // looking at 2 indexes in an array, starting from either side and going toward 
        // eachother or both starting on the same side etc

    /* 
      take an assorted array of integers and find the first pair where the sum is 0
      ex: [-2,-1,0,1,2]: [-2,2]
    */
    // naive solution: o(n^2)
    function sumZero(arr){
        for(let i = 0; i < arr.length; i++){
            for(let j = i+1; j < arr.length; j++){
                if(arr[i] + arr[j] === 0){
                    return [arr[i], arr[j]];
                }
            }
        }
        // return nothing if undefined
    }
    sumZero([-4,-3,-2,-1,0,1,2,5])
    // refactored solution: time - o(n), space - were not creating an array so o(1)
    function sumZero(arr){
        // we know array is sorted so negs are on left and poss are on right side
        // so start with a left side ptr and a right side ptr
        let l = 0, r = arr.length - 1, sum

        // iterate inwards until we find sol or we hit end
        while (l < r) {// if l = r, we didnt find a sol
            // calc sum
            sum = arr[l] + arr[r]
            
            // if we got it, return the pair
            if (sum === 0) return [arr[l], arr[r]]

            // else determine which pointer to move
            // if sum is pos, we must move the right ptr to get a smaller num
            else if (sum > 0) r--

            // if sum is neg, we must move left ptr to get a bigger num
            else l++
        }

        // no solution, return nothing
    }

    /* 
        count unique values: takes a sorted array and determines how many unique numbers are in there
    */
    // my solution: o(n)
    function countUniqueValues(arr){
        // check if empty
        if (arr.length === 0) return 0

        // make 2 pointers. start with both on left side, at index 0 and 1
        let l = 0, r = 1, result = 1 // we know there is at least 1 unique

        // iterate until right reaches end
        while (r < arr.length) {
            // check if the left one is unique
            if (arr[l] !== arr[r]) result++

            // slide both ptrs
            l++, r++
        }

        // return answer
        return result
    }
    // Colt's slightly better solution: using the array index to track result and save on a variable.
    // requires altering the array
    function countUniqueValues(arr){
        if(arr.length === 0) return 0;
        var i = 0;
        for(var j = 1; j < arr.length; j++){
            if(arr[i] !== arr[j]){
                i++;
                arr[i] = arr[j]
            }
        }
        return i + 1;
    }
    countUniqueValues([1,2,2,5,7,7,99])
    




// Sliding Window

    /*
        given an array and a number n, calculate the largest sum of n consecutive elements in the array
    */
    // Naive
    function maxSubarraySum(arr, num) {
        if ( num > arr.length){
          return null;
        }
        var max = -Infinity;
        for (let i = 0; i < arr.length - num + 1; i ++){
          temp = 0;
          for (let j = 0; j < num; j++){
            temp += arr[i + j];
          }
          if (temp > max) {
            max = temp;
          }
        }
        return max;
      }
      maxSubarraySum([2,6,9,2,1,8,5,6,3],3)
      
      // refactored
      function maxSubarraySum(arr, num){
        let maxSum = 0;
        let tempSum = 0;
        if (arr.length < num) return null;
        for (let i = 0; i < num; i++) {
          maxSum += arr[i];
        }
        tempSum = maxSum;
        for (let i = num; i < arr.length; i++) {
          tempSum = tempSum - arr[i - num] + arr[i];
          maxSum = Math.max(maxSum, tempSum);
        }
        return maxSum;
      }
      
      maxSubarraySum([2,6,9,2,1,8,5,6,3],3)
      



// Divide and Conquer
      // basically just recursion: dividing a data set into smaller chunks then repeating the process with the subset of data
      // can tremendously reduce the time complexity of an algo, may increase space complexity (nested function calls etc)
      
      
      