// First Version
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




// Version with ES2015 Syntax
function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}

pivot([4,8,2,1,5,7,6,3])


