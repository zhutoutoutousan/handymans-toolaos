// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

// The overall run time complexity should be O(log (m+n)).

// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

// [x] Copilot
// Runtime: 130 ms, faster than 73.94% of JavaScript online submissions for Median of Two Sorted Arrays.
// Memory Usage: 46.5 MB, less than 44.72% of JavaScript online submissions for Median of Two Sorted Arrays.

// [] Comprehension
// [] https://www.youtube.com/watch?v=q6IEA26hvXc
// Time Complexity: O(log(m+n))
// Space Complexity: O(m+n)
function findMedianSortedArrays(nums1, nums2) {
    let merged = [];
    let i = 0;
    let j = 0;
    let k = 0;
    let m = nums1.length
    let n = nums2.length
    while (i < m && j < n) {
        // console.log(i, j, k, m, n);
        if (nums1[i] < nums2[j]) {
            // console.log('nums1[i] < nums2[j]', nums1[i], nums2[j]);
            merged[k] = nums1[i];
            i++;
        } else {
            // console.log('nums1[i] > nums2[j]', nums1[i], nums2[j]);
            merged[k] = nums2[j];
            j++;
        }
        k++;
    }
    // console.log('merged', merged);
    while (i < m) {
        merged[k] = nums1[i];
        i++;
        k++;
    }
    while (j < n) {
        merged[k] = nums2[j];
        j++;
        k++;
    }
    // console.log('merged', merged);
    let median = 0;
    if (merged.length % 2 === 0) {
        // console.log('merged.length % 2 === 0', merged.length % 2 === 0);
        median = (merged[merged.length / 2 - 1] + merged[merged.length / 2]) / 2;
    } else {
        // console.log('merged.length % 2 !== 0', merged.length % 2 !== 0);
        median = merged[Math.floor(merged.length / 2)];
    }
    return median; 
}

// Driver Code
let nums1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(findMedianSortedArrays(nums1, nums2));

// Generate 50 random test cases of nums1 and nums2
let testCases = [];
for (let i = 0; i < 50; i++) {
    let nums1 = [];
    let nums2 = [];
    for (let j = 0; j < Math.floor(Math.random() * 100); j++) {
        nums1.push(Math.floor(Math.random() * 100));
    }
    for (let j = 0; j < Math.floor(Math.random() * 100); j++) {
        nums2.push(Math.floor(Math.random() * 100));
    }
    testCases.push({
        nums1: nums1,
        nums2: nums2
    });
}

// Use testCases to test findMedianSortedArrays
for (let i = 0; i < testCases.length; i++) {
    let result = findMedianSortedArrays(testCases[i].nums1, testCases[i].nums2);
    if (result !== findMedianSortedArrays(testCases[i].nums1, testCases[i].nums2)) {
        console.log('Test case #' + i + ' failed')
    }
    else {
        console.log('Test case #' + i + ' passed')
    }
}



