function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  } else if (array.length === 2) {
    if (array[0] > array[1]) {
      let sortedArr = [];
      sortedArr[0] = array[1];
      sortedArr[1] = array[0];
      return sortedArr;
    }
    return array;
  }

  let halfLength = Math.floor(array.length / 2);
  let left = mergeSort([...array.slice(0, halfLength)]);
  let right = mergeSort([...array.slice(halfLength)]);
  let sortedArr = [];

  let sortedRightCount = 0;
  for (let i of left) {
    let leftPushed = false;
    for (let j = sortedRightCount; j < right.length; j++) {
      if (i < right[j]) {
        sortedArr.push(i);
        leftPushed = true;
        break;
      } else {
        sortedArr.push(right[j]);
        sortedRightCount += 1;
      }
    }
    if (!leftPushed) sortedArr.push(i);
  }
  if (sortedRightCount !== right.length)
    sortedArr.push(...right.slice(sortedRightCount));
  return sortedArr;
}
console.log(mergeSort([4, 2, 0, 7, 1, 9, 3]));
