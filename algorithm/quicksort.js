// Perform quick sort on an array of numbers
// Time complexity: O(n log n)
// Space complexity: O(n)
function quickSort(array) {
    // Base case
    if (array.length <= 1) {
        return array;
    }

    // Recursive case
    let pivot = array[0];
    let left = [];
    let right = [];
    for (let i = 1; i < array.length; i++) {
console.log('pivot', pivot, 'array[i]', array[i]);
        if (array[i] < pivot) {
            left.push(array[i]);
        }
        else {
            right.push(array[i]);
        }
    }
console.log('left', left, 'right', right);
    return quickSort(left).concat(pivot, quickSort(right));
}

// Driver Code
let array = [3, 5, 2, 1, 8, 9, 7, 6, 4];
console.log(quickSort(array));

// Generate 50 random test cases of unsorted array for quick sort
let testCases = [];
for (let i = 0; i < 50; i++) {
    let array = [];
    for (let j = 0; j < Math.floor(Math.random() * 100); j++) {
        array.push(Math.floor(Math.random() * 100));
    }
    testCases.push({
        array: array,
        sorted: quickSort(array)
    });
}

// Use testCases to test quickSort
for (let i = 0; i < testCases.length; i++) {
    let array = testCases[i].array;
    let sorted = testCases[i].sorted;
    console.log('array', array, 'sorted', sorted);
    console.log(quickSort(array));
}

