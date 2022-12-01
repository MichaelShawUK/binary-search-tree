import mergeSort from './mergeSort.js';

const Node = (data, left=null, right=null) => {
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

const Tree = (array) => {
  let sortedArray = mergeSort([...new Set(array)]);
  let root = buildTree(sortedArray, 0, sortedArray.length - 1);

  const insertRec = (root, value) => {
    if (root === null) return Node(value);
      if (value < root.data) {
        root.left = insertRec(root.left, value);
      } else if (value > root.data) {
        root.right = insertRec(root.right, value);
      }
      return root;
  }

  const findSuccessor = (root) => {
    if (root.left === null) return root;
    root = findSuccessor(root.left);
    return root;
  }

  const deleteRec = (root, value) => {
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
        root = deleteRec(root, successor.data);
        root.data = successor.data;
        return root;
      }
    }
    if (value < key) {
      root.left = deleteRec(root.left, value);
    }
    else if (value > key) {
      root.right = deleteRec(root.right, value);
    }
    return root;
  }

  const findRec = (root, value) => {
    if (root === null) return null;
    let key = root.data;
    if (key === value) return root;
    if (value < key) {
      root = findRec(root.left, value);
    }
    else if (value > key) {
      root = findRec(root.right, value);
    }
    return root;
  }

  const noTransformation = data => data;

  const preorderRec = (root, output, transform) => {
    if (root === null) return;
    output.push(transform(root.data));
    preorderRec(root.left, output, transform);
    preorderRec(root.right, output, transform);
    return output;
  }

  const inorderRec = (root, output, transform) => {
    if (root === null) return;
    inorderRec(root.left, output, transform);
    output.push(transform(root.data));
    inorderRec(root.right, output, transform);
    return output;
  }

  const postorderRec = (root, output, transform) => {
    if (root === null) return;
    postorderRec(root.left, output, transform);
    postorderRec(root.right, output, transform);
    output.push(transform(root.data));
    return output;
  }

  const heightRec = (node, count, max) => {
    if (node === null) return max;
    count++;
    if (count > max) {
      max = count;
    }
    max = heightRec(node.left, count, max);
    max = heightRec(node.right, count, max);
    return max;
  }

  const depthRec = (node, root, count) => {
    if (node === root) return count;
    if (node.data < root.data) {
      count = depthRec(node, root.left, ++count);
    } else {
      count = depthRec(node, root.right, ++count);
    }
    return count;
  }

  const isBalancedRec = (root) => {
    if (root === null) return 0;
    let difference = heightRec(root.left, 0, 0) - heightRec(root.right, 0, 0);
    difference = Math.abs(difference);
    if (difference > 1) return difference;
    difference = isBalancedRec(root.left);
    if (difference > 1) return difference;
    difference = isBalancedRec(root.right);
    if (difference > 1) return difference;
    return difference;
  }
  
  return {
    root,

    insert(value) {
      insertRec(this.root, value);
    },

    delete(value) {
      deleteRec(this.root, value);
    },

    find(value) {
      return findRec(this.root, value);
    },

    levelOrder(transform = noTransformation) {
      let queue = [this.root];
      let output = [];
      while (queue.length > 0) {
        let current = queue.shift();
        output.push(transform(current.data));
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
      }
      return output;
    },

    preorder(transform = noTransformation) {
      let output = [];
      preorderRec(this.root, output, transform);
      return output;
    },

    inorder(transform = noTransformation) {
      let output = [];
      inorderRec(this.root, output, transform);
      return output;
    },

    postorder(transform = noTransformation) {
      let output = [];
      postorderRec(this.root, output, transform);
      return output;
    },

    height(node = this.root) {
      let max = 0;
      let count = 0;
      return heightRec(node, count, max)-1;
    },

    depth(node) {
      return depthRec(node, this.root, 0);
    },

    isBalanced() {
      if (isBalancedRec(this.root) > 1) return false;
      else return true;
    },

    rebalance() {
      this.root = Tree(this.levelOrder()).root;
    }
  }
};

export { Tree };