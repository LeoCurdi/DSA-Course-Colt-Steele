
function pivot(arr, start = 0, end=arr.length - 1) {
  function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // pick the pivot
  var pivot = arr[start];
  var swapIndex = start;

  // partition the array
  for(var i = start + 1; i <= end; i++) {
    if(pivot > arr[i]){
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }

  // make sure to swap the pivot
  swap(arr, start, swapIndex);
  return swapIndex;
}


function quickSort(arr, left = 0, right = arr.length - 1) {
    // base case: if subarray is 1 or 0 elements (left === right), do nothing and return
    if(left < right) {
        // partition the array, then call quick sort on the 2 sub arrays
        let pivotIndex = pivot(arr, left, right)
        // sort left
        quickSort(arr, left, pivotIndex - 1);
        // sort right
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;             
} 
           
quickSort([100,-3,2,4,6,9,1,2,5,3,23])


// [4,6,9,1,2,5,3]
// [3,2,1,4,6,9,5]
//        4
//  3,2,1    6,9,5
//      3      6
//  2,1      5  9
//    2
//  1




