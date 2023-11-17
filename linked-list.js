class LinkedList {
  size = 0;
  head = null;
  tail = null;
  constructor(...values) {
    values.forEach((value) => {
      this.append(value);
    });
  }
  get head() {
    return this.head;
  }
  get tail() {
    return this.tail;
  }
  get size() {
    return this.size;
  }
  append(value) {
    if (this.tail === null) {
      const node = new Node(value);
      this.tail = node;
      this.head = node;
    } else {
      const node = new Node(value);
      node.previousNode = this.tail;
      this.tail.nextNode = node;
      this.tail = node;
    }
    this.size += 1;
  }
  prepend(value) {
    if (this.head === null) {
      const node = new Node(value);
      this.head = node;
      this.tail = node;
    } else {
      const node = new Node(value);
      node.nextNode = this.head;
      this.head.previousNode = node;
      this.head = node;
    }
    this.size += 1;
  }
  at(index) {
    if (index === null || index > this.size - 1 || index < 0)
      throw new Error("Index out of range");
    let copyNode = this.head;
    for (let i = 0; i < index && copyNode !== null; i++) {
      copyNode = copyNode.nextNode;
    }
    return copyNode;
  }
  insertAt(value, index) {
    if (index === null || index > this.size - 1 || index < 0)
      throw new Error("Index out of range");
    let copyNode = this.head;
    for (let i = 0; i < index && copyNode !== null; i++) {
      copyNode = copyNode.nextNode;
    }
    if (!copyNode.previousNode) {
      this.prepend(value);
    } else {
      const node = new Node(value);
      copyNode.previousNode.nextNode = node;
      node.previousNode = copyNode.previousNode;
      copyNode.previousNode = node;
      node.nextNode = copyNode;
      this.size += 1;
    }
  }
  removeAt(index) {
    if (index === null || index > this.size - 1 || index < 0)
      throw new Error("Index out of range");
    let copyNode = this.head;
    for (let i = 0; i < index && copyNode !== null; i++) {
      copyNode = copyNode.nextNode;
    }
    if (!copyNode.previousNode) {
      this.shift();
    } else if (!copyNode.nextNode) {
      this.pop();
    } else {
      const nextNode = copyNode.nextNode;
      const previousNode = copyNode.previousNode;
      nextNode.previousNode = previousNode;
      previousNode.nextNode = nextNode;
      this.size -= 1;
    }
  }
  pop() {
    if (this.tail === null) {
      console.log("The list is empty");
    } else {
      if (this.tail.previousNode) {
        this.tail = this.tail.previousNode;
        this.tail.nextNode = null;
      } else {
        this.tail = null;
        this.head = null;
      }
      this.size -= 1;
    }
  }
  shift() {
    if (this.head === null) {
      console.log("The list is empty");
    } else {
      if (this.head.nextNode) {
        this.head = this.head.nextNode;
        this.head.previousNode = null;
      } else {
        this.head = null;
        this.head = null;
      }
      this.size -= 1;
    }
  }
  contains(value) {
    let copyNode = this.head;
    while (copyNode !== null) {
      if (copyNode.value === value) return true;
      copyNode = copyNode.nextNode;
    }
    return false;
  }
  findIndex(value) {
    let index = 0;
    let copyNode = this.head;
    while (copyNode !== null) {
      if (copyNode.value === value) return index;
      copyNode = copyNode.nextNode;
      index += 1;
    }
    return null;
  }
  toString() {
    let string = "";
    let copyNode = this.head;
    while (copyNode !== null) {
      const value = copyNode.value.toString();
      string += `( ${value} ) -> `;
      copyNode = copyNode.nextNode;
    }
    string += "null";

    return string;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
    this.previousNode = null;
  }
}
