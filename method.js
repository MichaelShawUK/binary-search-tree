import mergeSort from './mergeSort.js';
import prettyPrint from './prettyPrint.js';

function Node(data, left=null, right=null) {
  return {data, left, right}
};

function buildTree(array, start, end) {
  if (start > end) return null;
  let mid = parseInt((start + end) / 2);
  let root = Node(array[mid]);
  root.left = buildTree(array, start, mid - 1)
  root.right = buildTree(array, mid + 1, end);
  return root;
}

function Tree(array) {
  let sortedArray = mergeSort([...new Set(array)]);
  let root = buildTree(sortedArray, 0, sortedArray.length - 1);
  return {
    root,

    insert(value) {
      this.insertRec(this.root, value);
    },

    insertRec(root, value) {
      if (root === null) return Node(value);
      if (value < root.data) {
        root.left = this.insertRec(root.left, value);
      } else if (value > root.data) {
        root.right = this.insertRec(root.right, value);
      }
      return root;
    }
  }
};

const a = Tree([1,2,3]);
console.log(a.root);
a.insert(4);
a.insert(6);
a.insert(7);
a.insert(10);
a.insert(-4);
a.insert(6);
a.insert(2);
a.insert(-5);
console.log(a.root);
prettyPrint(a.root);