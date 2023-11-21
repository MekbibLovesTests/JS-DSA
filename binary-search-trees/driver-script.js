const BST = require("./binary-search-trees");
const testList = [];
for (let i = 0; i < 10; i++) {
  testList.push(Math.floor(Math.random() * 100));
}
for (let i = 0; i < 10; i += 2) {
  testList.push(testList[i]);
}

const tree = BST.createTree(testList);
console.log(`Is Balanced: ${tree.isBalanced()}`);
console.log("LevelOrder");
tree.traverseInLevelOrderRecursion([tree.root], BST.handleNode);
console.log("PreOrder");
tree.traverseInPreOrderRecursion(tree.root, BST.handleNode);
console.log("PostOrder");
tree.traversePostOrderRecursion(tree.root, BST.handleNode);
console.log("InOrder");
tree.traverseInOrderRecursion(tree.root, BST.handleNode);

for (let i = 0; i < 10; i++) {
  tree.insertNode(Math.floor(Math.random() * 1000));
}

console.log(`Is Balanced: ${tree.isBalanced()}`);
tree.reBalance();
console.log(`Is Balanced: ${tree.isBalanced()}`);
console.log("LevelOrder");
tree.traverseInLevelOrderRecursion([tree.root], BST.handleNode);
console.log("PreOrder");
tree.traverseInPreOrderRecursion(tree.root, BST.handleNode);
console.log("PostOrder");
tree.traversePostOrderRecursion(tree.root, BST.handleNode);
console.log("InOrder");
tree.traverseInOrderRecursion(tree.root, BST.handleNode);
