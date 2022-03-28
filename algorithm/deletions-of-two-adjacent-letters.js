
// Determine if input string A can be converted to B by deleting two adjacent characters.
function deletionsOfTwoAdjacentLetters(A, B) {
  // Write your code here
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    if (A[i] !== B[i]) {
      count++;
    }
  }
  return count <= 2;
}


// Generate test cases
const testCases = [
    {
        input: ['aabcc', 'ccdee'],
        output: true
    },
    {
        input: ['aabcc', 'ccdde'],
        output: false
    },
    {
        input: ['aabcc', 'ccdeee'],
        output: false
    },
    {
        input: ['aabcc', 'ccdeee'],
        output: false
    }
]

// Run test cases
for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const result = deletionsOfTwoAdjacentLetters(...testCase.input);
    const correct = result === testCase.output;
    console.log(`Testing deletionsOfTwoAdjacentLetters(${testCase.input[0]}, ${testCase.input[1]}): ${correct}`);
    console.log(`Test case ${i + 1}: ${correct ? 'PASS' : 'FAIL'}`);
}
