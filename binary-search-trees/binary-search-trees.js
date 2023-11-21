function createTree(array) {
  let root = buildTree(array);

  return {
    root,
    traverseInLevelOrder,
    traverseInLevelOrderRecursion,
    traverseInPreOrderRecursion,
    traverseInOrderRecursion,
    traversePostOrderRecursion,
    getHeight,
    getDepth,
    isBalanced,
    reBalance,
    findNode,
    insertNode,
    deleteNode,
  };
}

function createNode(data) {
  return {
    left: null,
    right: null,
    data,
  };
}

function buildTree(array) {
  const sortedArray = array.toSorted((a, b) => a - b);
  const unique = [];
  const filteredArray = sortedArray.filter((number) => {
    if (unique.includes(number)) {
      return false;
    }
    unique.push(number);
    return true;
  });
  if (filteredArray.length === 0) return null;
  const mid = Math.floor(filteredArray.length / 2);
  const root = createNode(filteredArray[mid]);
  const queue = [
    [root, [0, mid - 1]],
    [root, [mid + 1, filteredArray.length - 1]],
  ];
  while (queue.length > 0) {
    const [parent, [left, right]] = queue.shift();
    if (left <= right && parent !== null) {
      const mid = Math.floor((left + right) / 2);
      const child = createNode(filteredArray[mid]);

      if (child.data < parent.data) parent.left = child;
      else parent.right = child;

      queue.push([child, [left, mid - 1]]);
      queue.push([child, [mid + 1, right]]);
    }
  }
  return root;
}
function insertNode(data) {
  let copyRoot = this.root;
  const node = createNode(data);
  if (copyRoot === null) {
    this.root = node;
    return;
  }
  while (copyRoot !== null) {
    if (node.data === copyRoot.data) throw new Error("Already in tree");
    else if (node.data > copyRoot.data) {
      if (copyRoot.right !== null) {
        if (node.data < copyRoot.right.data) {
          node.right = copyRoot.right;
          copyRoot.right = node;
          break;
        } else {
          copyRoot = copyRoot.right;
        }
      } else {
        copyRoot.right = node;
        break;
      }
    } else {
      if (copyRoot.left !== null) {
        if (copyRoot.left !== null && node.data > copyRoot.left.data) {
          node.left = copyRoot.left;
          copyRoot.left = node;
          break;
        } else {
          copyRoot = copyRoot.left;
        }
      } else {
        copyRoot.left = node;
        break;
      }
    }
  }
}
function deleteNode(data, node = this.root) {
  if (node === null) {
    throw new Error("The tree is empty");
  }
  if (node.data === data) {
    if (node.right && node.left) {
      this.root = getNextBiggestNode(node);
    } else if (!node.right && !node.left) this.root = null;
    else this.root = node.right ? node.right : node.left;
    return;
  }

  while (node !== null) {
    if (data > node.data) {
      if (node.right && node.right.data === data) {
        node.right = getNextBiggestNode(node.right);
        return;
      } else {
        node = node.right;
        continue;
      }
    }
    if (data < node.data) {
      if (node.left && node.left.data === data) {
        node.left = getNextBiggestNode(node.left);
        return;
      } else {
        node = node.left;
        continue;
      }
    }
  }
  throw new Error("Node not in the tree");
}

function getNextBiggestNode(node) {
  if (node.right && node.right.left === null) {
    node.right.left = node.left;
    return node.right;
  } else if (!node.right) {
    return node.left ? node.left : null;
  } else {
    const nextBiggestNode = node.right.left;
    if (nextBiggestNode.right) {
      const nextNextBiggestNode = getNextBiggestNode(nextBiggestNode);
      node.right.left = nextNextBiggestNode;
      nextBiggestNode.right = node.right;
      nextBiggestNode.left = node.left;
      return nextBiggestNode;
    } else {
      node.right.left = nextBiggestNode.left;
      nextBiggestNode.right = node.right;
      nextBiggestNode.left = node.left;
      return nextBiggestNode;
    }
  }
}
function findNode(data) {
  let copyNode = this.root;
  while (copyNode !== null) {
    if (copyNode.data === data) return copyNode;
    else if (copyNode.data > data) {
      copyNode = copyNode.left;
    } else {
      copyNode = copyNode.right;
    }
  }

  return copyNode;
}
function traverseInLevelOrder(handleNode = null) {
  let copyNode = this.root;
  if (copyNode === null) {
    if (handleNode) {
      handleNode([]);
      return;
    } else {
      return [];
    }
  }
  const queue = [copyNode];
  const levelOrderList = [];
  while (queue.length > 0) {
    const node = queue.shift();

    levelOrderList.push(node);
    if (handleNode) handleNode(node);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  if (!handleNode) return levelOrderList;
}
function traverseInLevelOrderRecursion(queue = [this.root], handleNode = null) {
  if (queue.length <= 0 || queue[0] === null) return [];
  else {
    const node = queue.shift();
    const levelOrderList = [node];
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    if (handleNode) {
      handleNode(node);
      traverseInLevelOrderRecursion(queue, handleNode);
    } else {
      levelOrderList.push(...traverseInLevelOrderRecursion(queue));
      return levelOrderList;
    }
  }
}

function traverseInPreOrderRecursion(root = this.root, handleNode = null) {
  if (root === null) return [];
  else {
    if (handleNode) {
      handleNode(root);
      traverseInPreOrderRecursion(root.left, handleNode);
      traverseInPreOrderRecursion(root.right, handleNode);
    } else {
      const preOrderList = [root];
      preOrderList.push(...traverseInPreOrderRecursion(root.left));
      preOrderList.push(...traverseInPreOrderRecursion(root.right));
      return preOrderList;
    }
  }
}
function traverseInOrderRecursion(root = this.root, handleNode) {
  if (root === null) return [];
  else {
    if (handleNode) {
      traverseInOrderRecursion(root.left, handleNode);
      handleNode(root);
      traverseInOrderRecursion(root.right, handleNode);
    } else {
      const inOrderList = [];
      inOrderList.push(...traverseInOrderRecursion(root.left));
      inOrderList.push(root);
      inOrderList.push(...traverseInOrderRecursion(root.right));
      return inOrderList;
    }
  }
}
function traversePostOrderRecursion(root = this.root, handleNode) {
  if (root === null) return [];
  else {
    if (handleNode) {
      traversePostOrderRecursion(root.left, handleNode);
      traversePostOrderRecursion(root.right, handleNode);
      handleNode(root);
    } else {
      const postOrderList = [];
      postOrderList.push(...traversePostOrderRecursion(root.left));
      postOrderList.push(...traversePostOrderRecursion(root.right));
      postOrderList.push(root);
      return postOrderList;
    }
  }
}
function getHeight(node = this.root) {
  if (node === null || (node.left === null && node.right === null)) return 0;
  else {
    let height = 1;
    height += Math.max(getHeight(node.left), getHeight(node.right));
    return height;
  }
}
function getDepth(node) {
  if (node === null) {
    throw new Error("Node not in tree");
  }
  let copyNode = this.root;
  if (copyNode === null) {
    throw new Error("The tree is empty");
  }
  let depth = 0;
  while (copyNode !== null) {
    if (copyNode.data === node.data) break;
    else if (copyNode.data > node.data) {
      copyNode = copyNode.left;
    } else {
      copyNode = copyNode.right;
    }
    depth += 1;
  }
  return depth;
}
function isBalanced() {
  const root = this.root;
  if (root === null) {
    throw new Error("The tree is empty");
  }
  const leftHeight = getHeight(root.left);
  const rightHeight = getHeight(root.right);
  const difference = leftHeight - rightHeight;
  console.log(`difference ${difference}`);
  if (difference < -1 || difference > 1) return false;
  else return true;
}
function reBalance() {
  const nodeList = this.traverseInOrderRecursion();
  const dataList = nodeList.map((node) => node.data);
  this.root = buildTree(dataList);
}
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function handleFoundNode(foundNode) {
  if (foundNode) {
    console.log("Found: ", foundNode.data);
  } else {
    console.log("Node Not found");
  }
}

function handleNodes(nodes) {
  nodes.forEach((node) => console.log(node.data));
}

function handleNode(node) {
  console.log(node.data);
}

module.exports = { createTree, handleNode };
