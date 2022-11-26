import mergeSort from './mergeSort.js';
import prettyPrint from './prettyPrint.js';

function Node(data=null, left=null, right=null) {
  return {data, left, right}
};

function Tree(array) {
  let sortedArray = mergeSort([...new Set(array)]);
  let root = buildTree(sortedArray, 0, sortedArray.length - 1);
  return root;  
};

function buildTree(array, start, end) {
  if (start > end) return null;
  let mid = parseInt((start + end) / 2);
  let root = Node(array[mid], null, null);
  root.left = buildTree(array, start, mid - 1)
  root.right = buildTree(array, mid + 1, end);
  return root;
}

function insert(value, root) {
  let key = root.data;
  if (key === value) return;
  else {
    if (value < key) {
      if (root.left === null) {
        root.left = Node(value, null, null);
        return;
      }
      insert(value, root.left);
    } else if (value > key) {
      if (root.right === null) {
        root.right = Node(value, null, null);
        return;
      }
      insert(value, root.right);
    }
  }
}

function remove(value, root) {
  console.log(root);
  let key = root.data;
  if (key === value && root.left === null && root.right === null) {
    console.log(`Before: ${root}`);
    root = null;
    console.log(`After: ${root}`);
    return;
  }
  if (value < key) remove(value, root.left);
  else if (value > key) remove(value, root.right);
}

const a = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(a);
insert(6, a);
prettyPrint(a);
// remove(3, a);
// prettyPrint(a);

// const b = Tree([1,2,3,4,5]);
// prettyPrint(b);
// insert(6, b);
// prettyPrint(b);

// insert(6, b);
// prettyPrint(b);
// insert(0, b);
// prettyPrint(b);
// insert(7, b);
// prettyPrint(b);
// insert(8, b);
// prettyPrint(b);
// insert(-10, b);
// prettyPrint(b);
// insert(-5, b);
// prettyPrint(b);