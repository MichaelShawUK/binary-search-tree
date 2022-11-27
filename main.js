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
    else {
      let successor = findSuccessor(root.right);
      root = remove(successor.data, root);
      root.data = successor.data;
      return root;
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

function findSuccessor(root) {
  if (root.left === null) return root;
  root = findSuccessor(root.left);
  return root;
}

function find(value, root) {
  if (root === null) return root;
  if (root.data === value) return root;
  if (value < root.data) {
    root = find(value, root.left);
  } else {
    root = find(value, root.right);
  }
  return root;
}

function levelOrder(root, transformNode = originalNode) {
  let queue = [root];
  let arr = [];
  while (queue.length > 0) {
    let current = queue.shift();
    arr.push(transformNode(current.data));
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
  return arr;
}

function originalNode(data) {
  return data;
}

// const a = Tree([1,2,3,4,5,6,7,8,9]);
// prettyPrint(a);
// console.log(levelOrder(a));

const test = Tree([58,41,48]);
insert(52,test);
insert(51,test);
insert(49,test);
insert(50,test);
insert(53,test);
insert(62,test);
insert(59,test);
insert(60,test);
insert(64,test);
prettyPrint(test);

remove(62, test);
prettyPrint(test);

console.log(find(48, test));
remove(48,test);
console.log(find(49,test));
prettyPrint(test);
console.log(levelOrder(test));

function minusFifty(value) {return value - 50;}
console.log(levelOrder(test, minusFifty));



