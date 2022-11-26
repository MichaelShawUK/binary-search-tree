export default function mergeSort(arr) {

  if (arr.length === 1) return arr;
  let left = arr.slice(0, Math.floor(arr.length/2));
  let right = arr.slice(Math.floor(arr.length/2));

  left = mergeSort(left);
  right = mergeSort(right);

  let result = [];

  while (left.length > 0 || right.length > 0) {

    if (left.length === 0) {
      result.push(right.shift());
    }
    else if (right.length === 0) {
      result.push(left.shift());
    }
    else {
      if (left[0] < right[0]) {
        result.push(left.shift());
      }
      else {
        result.push(right.shift());
      }
    }
  }
  return result;
}