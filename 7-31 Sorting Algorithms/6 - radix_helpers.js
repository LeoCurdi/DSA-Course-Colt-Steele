
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

mostDigits([23,567,89,12234324,90])










