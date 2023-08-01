
// takes a number and a position and returns the number at that position
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// tells you how many digits are in a number
function digitCount(num) {
  if (num === 0) return 1; // log10(0) gives you -infinity so we need this special case
  return Math.floor(Math.log10(Math.abs(num))) + 1; // log10 is asking "10 to what power gives us the number?"
} 

// runs digit count on all nums in a list and keeps track of the max digits
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

// Note: we dont have to worry about recursion with radix sort
function radixSort(nums) {
    // firgure out how many digits the largest number has
    let maxDigitCount = mostDigits(nums);
    // repeat the code to sort nums into buckets as many times as max digits
    for (let k = 0; k < maxDigitCount; k++) {
        // create an array of 10 arrays (buckets)
        let digitBuckets = Array.from({length: 10}, () => []); // we're telling each element to be an empty array
        // sort all nums into buckets
        for (let i = 0; i < nums.length; i++) {
            // get the value of the kth digit
            let digit = getDigit(nums[i],k);
            // sort the number to the correct digit bucket based on digit value 
            digitBuckets[digit].push(nums[i]);
        }
        // spread all the nums from the digit buckets into an array. 
        // the spread operator will maintain correct order thus saving our progress
        nums = [].concat(...digitBuckets);
    }
    return nums;
}





