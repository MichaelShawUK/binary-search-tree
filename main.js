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
  let key = root.data;
  if (key === value) {
    if (root.left === null && root.right === null) {
      return null;
    } 
    else if (root.left === null || root.right === null) {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
    }
  }
  if (value < key) {
    root.left = remove(value, root.left);
  }
  else if (value > key) {
    root.right = remove(value, root.right);
  }
  return root;
}

const a = Tree([1,2,3,4,5,6,7,8,9]);
prettyPrint(a);
remove(8, a);
remove(3, a);
prettyPrint(a);

