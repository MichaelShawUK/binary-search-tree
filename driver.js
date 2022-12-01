import prettyPrint from './prettyPrint.js';
import { Tree } from './tree.js';

function randomArray(elements) {
  let output = [];
  for (let i = 0; i < elements; i++) {
    let randomNum = Math.ceil(Math.random()*100);
    if (output.includes(randomNum)) {
      i--;
      continue;
    }
    output.push(randomNum);
  }
  return output;
}

const t = Tree(randomArray(10));
prettyPrint(t.root);
console.log(`Tree is balanced:  ${t.isBalanced()}`);
console.log(`Level-order:       ${t.levelOrder()}`);
console.log(`Pre-order:         ${t.preorder()}`);
console.log(`In-order:          ${t.inorder()}`);
console.log(`Post-order:        ${t.postorder()}`);

console.log('\nInserting numbers..');
t.insert(141);
t.insert(108);
t.insert(162);
t.insert(199);

prettyPrint(t.root);
console.log(`Tree is balanced:  ${t.isBalanced()}`);

console.log('\nRebalancing tree..');
t.rebalance();

prettyPrint(t.root);
console.log(`Tree is balanced:  ${t.isBalanced()}`);
console.log(`Level-order:       ${t.levelOrder()}`);
console.log(`Pre-order:         ${t.preorder()}`);
console.log(`In-order:          ${t.inorder()}`);
console.log(`Post-order:        ${t.postorder()}`);


