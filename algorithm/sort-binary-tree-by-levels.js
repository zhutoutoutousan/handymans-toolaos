class Node { 
    constructor(value, left = null, right = null) {
      this.value = value;
      this.left  = left;
      this.right = right;
    }
}

function treeByLevels (rootNode) {
    // Return empty array if root is null.
    if (rootNode === null) {
        return [];
    }
    let queue = [];
    let result = [];
    queue.push(rootNode);
    while (queue.length) {
        let node = queue.shift();
        result.push(node.value);
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    return result;
}