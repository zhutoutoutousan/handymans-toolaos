/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumTop = function(nums, k) {
    // If it is not possible to obtain a non-empty pile after one move, we return -1.
    if (nums.length <= k) return -1;
    // If k is 0, we return the maximum element in the array.
    if (k === 0) return Math.max(...nums);
    let max = -Infinity;
    let stack = [];
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && stack[stack.length - 1] < nums[i] && k > 0) {
            stack.pop();
            k--;
        }
        stack.push(nums[i]);
        max = Math.max(max, stack[0]);
    }
    return max;
};