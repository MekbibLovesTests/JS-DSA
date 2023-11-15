function recursiveFib(n) {
  if (n === 1) return [0];
  if (n === 2) {
    return [0, 1];
  } else {
    let list = [...recursiveFib(n - 1)];
    return [...list, list[list.length - 2] + list[list.length - 1]];
  }
}

console.log(recursiveFib(10));
