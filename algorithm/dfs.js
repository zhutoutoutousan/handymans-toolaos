// DFS
function dfs(graph, start) {
  const visited = new Set();
  const stack = [start];
  while (stack.length) {
    const node = stack.pop();
    if (!visited.has(node)) {
      visited.add(node);
      stack.push(...graph[node]);
    }
  }
  return visited;
}

// Test Trees
const tree1 = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F', 'G'],
    'D': [],
    'E': [],
    'F': [],
    'G': []
};

// Run test cases
const testCases = [
    {
        input: ['A', tree1],
        output: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    {
        input: ['B', tree1],
        output: ['B', 'D', 'E']
    },
    {
        input: ['C', tree1],
        output: ['C', 'F', 'G']
    },
    {
        input: ['D', tree1],
        output: ['D']
    },
    {
        input: ['E', tree1],
        output: ['E']
    },
    {
        input: ['F', tree1],
        output: ['F']
    }
]

// Run test cases
for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const result = dfs(...testCase.input);
    const correct = result.size === testCase.output.length;
    console.log(`Testing dfs(${testCase.input[0]}, ${testCase.input[1]}): ${correct}`);
    console.log(`Test case ${i + 1}: ${correct ? 'PASS' : 'FAIL'}`);
}
