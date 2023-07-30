

/*
    Frequency counter - same frequency
    Given two positive integers, find out if the two numbers have the same frequency of digits.
*/
    function sameFrequency(n1, n2) {
        // we will need to get each digit individually, so the easiest way is to turn the nums into strings
        let s1 = n1.toString(), s2 = n2.toString()

        // first, they must have the same amount of digits
        if (s1.length !== s2.length) return false

        // count frequencies of each
        let f1 = {}, f2 = {}
        for (let i = 0; i < s1.length; i++) {
            if (f1[s1[i]]) f1[s1[i]]++
            else f1[s1[i]] = 1
        }
        for (let i = 0; i < s2.length; i++) {
            f2[s2[i]] = (f2[s2[i]] || 0) + 1
        }

        // compare frequencies
        for (let key in f1) {
            if (!f2[key] || f2[key] !== f1[key]) return false
        }

        // if we make it this far we have a match
        return true
    }


/* 
    frequency counter / mulitple pointers - are there duplicates
    Implement a function called, areThereDuplicates which accepts a variable number of 
    arguments, and checks whether there are any duplicates among the arguments passed in.  
    You can solve this using the frequency counter pattern OR the multiple pointers pattern.
*/
    function areThereDuplicates() {
        // in js, all arguments that are passed into a function call are given to us in an object called arguments
        // so we need to compute the freqency of each argument to determine if there are dupes
        // time: o(n), space: o(n) since were creating an object of n pairs
        let freq = {}
        for (let arg in arguments) {
            //console.log(arg)
            //console.log(arguments[arg])
            // even though arguments is an object, arg is an index and arguments[arg] is the value
            freq[arguments[arg]] = (freq[arguments[arg]] || 0) + 1
        }

        // now check if any frequencies are more than 1
        for (let val in freq) if (val > 1) return true

        return false
    }
    // alt solution using multiple pointers
    function areThereDuplicates2(...args) {
        // the multiple ptrs approach will start with 2 ptrs on the left side which will traverse to the right
        // and compare values each time. this will only work if the array is sorted
        // time: o(n log n) since we have to sort, space: o(1) since we dont need a freq table

        // since arguments is not an array, it doesnt have access to methods like sort. so we need the args in an array
        // sort the arguments
        args.sort((a,b) => a > b) // this is saying to sort in ascending order. you could sort in descending order with args.sort((a, b) => a > b ? -1 : 1)

        // set up pointers
        let l = 0, r = 1

        // set up a loop to traverse arguments
        while (r < args.length) {
            // compare values. if compared values are equal, we have a dupe. return true
            if (args[l] === args[r]) return true

            // shift right
            l++, r++
        }

        // else we have no dupes return false
        return false
    }


/* 
    Multiple pointers - average pair
    Given a sorted array of integers and a target average, determine if there is a 
    pair of values in the array where the average of the pair equals the target average. 
    There may be more than one pair that matches the average target.
*/
    function averagePair(arr, n) {
        // should we determine if there are multiple pairs that match? answer: no based on examples given
        // since the array is sorted, we dont need to check every pair
        // Note: pair members wont necessarily be sitting next to eachother, so we have to move the pointers dynamically
        // best way to move pointers will be toward the middle. left to right doesnt work because you may miss the pair
        // toward middle works because you know exactly which pointer to adjust

        // short circuit: check if array doesnt have at least 1 pair
        if (arr.length < 2) return false

        // set up ptrs
        let l = 0, r = arr.length - 1

        // loop towards middle
        while (l < r) {
            // check pair
            let avg = (arr[l] + arr[r]) / 2

            // if we have a match
            if (avg === n) return true

            // move r ptr if above avg
            else if (avg > n) r--

            // move l ptr if below avg
            else l++

        }

        // if l and r meet in middle, its a false
        return false
    }
    ([1,3,3,5,6,6.5,9,10,12,19],8)


/* 
    Multiple pointers - is subsequence
    Write a function called isSubsequence which takes in two strings and checks whether 
    the characters in the first string form a subsequence of the characters in the second 
    string. In other words, the function should check whether the characters in the first 
    string appear somewhere in the second string, without their order changing.
    ex: 'hello', 'hello world': true
        'sing', 'sting': true
        'abc', 'acb': false
*/
    function isSubsequence(s1, s2) {
        // short circuit: if s2 is empty return false. code may break without this when checking index 0 of an empty string
        if (!s2) return false

        // start with a pointer at the first char of each string
        let p1 = 0, p2 = 0

        // iterate through the first string
        while (p1 < s1.length) {
            // compare the values
            // if they match, move p1
            if (s1[p1] === s2[p2]) p1++

            // move the second one either way as to search for the match
            p2++

            // if we reach end of string 2 and havent finished string 1, we dont have a subsequence
            if (p2 === s2.length) return false
        }

        // if we make it to the end of s1, we have a subsequence
        return true
    }


/* 
    Sliding window - max sub array sum
    Given an array of integers and a number, write a function called maxSubarraySum, which 
    finds the maximum sum of a subarray with the length of the number passed to the function.
    Note that a subarray must consist of consecutive elements from the original array. 
    Constraints: time o(n), space o(1)
*/
    function maxSubarraySum(arr, n) {
        // given the constraints, we cant sort the array
        // we dont need to sort however since the sub array must be consecutive lol

        // short circuit to prevent code from breaking
        if (arr.length < n) return null

        // start with 2 ptrs left oriented with n-1 space between them
        let l = 0, r = n - 1

        // make a result and temp variable
        let result, temp = 0

        // add the total value of the first subarray
        for (let i = 0; i < n; i++) {
            temp += arr[r] 
        }
        result = temp // the first sub array is currently the largest

        // now iterate to the final subarray
        while (r < arr.length) {
            // add the next element
            r++
            // calculate the new subarray
            temp += arr[r] - arr[l]
            // drop the prev element
            l++

            // calculate if the new subarray is greater
            if (temp > result) result = temp
        }

        // return the result
        return result
    }


/* 
    Sliding window - min sub array length
    Write a function called minSubArrayLen which accepts two parameters - an array of 
    positive integers and a positive integer.
    This function should return the minimal length of a contiguous subarray of which the 
    sum is greater than or equal to the integer passed to the function. If there isn't one, 
    return 0 instead.
*/
    function minSubArrayLen(arr, n) {
        // no sorting - must be o(n)

        // start with 2 ptrs at index 0
        let l = 0, r = 0, result = Infinity, sum = 0

        // traverse until end of array
        while (l < arr.length) {
            // if the window is less than n, make it bigger and adjust sum
            if (sum < n && r < arr.length) { // short circuit
                sum += arr[r]
                r++
            }

            // if the window is >= n, make it smaller and adjust sum
            else if (sum >= n) {
                // update result
                if (r - l < result) result = r - l

                sum -= arr[l]
                l++
            }

            // in case sum is less than n and we reach end of array
            else {
                break
            }
        }

        // check if result is real before returning it
        return result === Infinity ? null : result // if result was never modified, we didnt find a subarray
    }


/*
    sliding window - find longest substring
    Write a function called findLongestSubstring, which accepts a string and returns 
    the length of the longest substring with all distinct characters.
*/
    function findLongestSubstring(string) {
        // cant sort
        // gonna need an object to track frequency
        // increase the window until we get the logest substring, then only increase it when we get a new long substring
        // so we never need to shrink the window
        let freq = {}
        let longest = 0
        let l = 0, r = 0

        // traverse through the string
        while (r < string.length) { // when r reaches end, we're done because shrinking the window would give us a smaller substring then the current longest
            // if the next char doesnt exist in frequency table, increase length of substring
            if (!freq[string[r]]) {
                freq[string[r]] = 1
                r++
                // update result
                if (r - l > longest) longest = r - l
            }

            // else decrease length of substring. this can be refactored out somehow since we shouldnt need to decrease size of window ever
            else {
                freq[string[l]]--
                l++
            }
        }

        return longest
    }

