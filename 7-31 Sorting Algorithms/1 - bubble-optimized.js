// Optimized BubbleSort with noSwaps
/* 
  were short circuiting our code with the noSwaps variable, so as soon as the array is sorted
  but the loop hasnt finished, it will see that no swaps were made on the most recent pass 
  and will stop looping
*/
function bubbleSort(arr){
  var noSwaps;
  for(var i = arr.length; i > 0; i--){
    noSwaps = true;
    for(var j = 0; j < i - 1; j++){
      if(arr[j] > arr[j+1]){
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        noSwaps = false;         
      }
    }
    if(noSwaps) break;
  }
  return arr;
}

bubbleSort([8,1,2,3,4,5,6,7]);