// Define Tree type
type Tree = {
    [key: string]: Tree | string | number;
};

/**
 * 
 * @param {Tree} oldTree 
 * @param {Tree} newTree 
 * @returns 
 */
function treeDiff(oldTree: Tree, newTree: Tree): Tree {
    // Create a new object to store the diff
    const diff: Tree = {};

    // Loop through the old tree
    for (const key in oldTree) {
        // If the key is not in the new tree, add it to the diff
        if (!(key in newTree)) {
            diff[key] = undefined;
        }
    }

    // Loop through the new tree
    for (const key in newTree) {
        // If the key is not in the old tree, add it to the diff
        if (!(key in oldTree)) {
            diff[key] = newTree[key];
        } else {
            // If the key is in both trees, check if the value is an object
            if (typeof oldTree[key] === 'object' && typeof newTree[key] === 'object') {
                // If the value is an object, recursively call treeDiff
                diff[key] = treeDiff(oldTree[key], newTree[key]);
            } else {
                // If the value is not an object, check if the value is different
                if (oldTree[key] !== newTree[key]) {
                    diff[key] = newTree[key];
                }
            }
        }
    }

    // Return the diff
    return diff;
}

// export
export { treeDiff, Tree};