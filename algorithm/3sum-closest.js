// Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
// Return the sum of the three integers and the solution array
// You may assume that each input would have exactly one solution.

// [x] Copilot
// []  Comprehension


// function threeSumClosest(nums, target) {
//     nums.sort((a, b) => a - b);
//     let min = Number.MAX_SAFE_INTEGER;
//     let result = 0;
    
//     for (let i = 0; i < nums.length - 2; i++) {
//         // Skip duplicates
//         if (i > 0 && nums[i] === nums[i - 1]) {
//             // console.log('skip', nums[i]);
//             continue;

//         }
//         let left = i + 1;
//         let right = nums.length - 1;
//         while (left < right) {
//             let sum = nums[i] + nums[left] + nums[right];
//             let diff = Math.abs(sum - target);
//             if (diff < min) {
//                 min = diff;
//                 result = sum;
//             }
//             if (sum < target) {
//                 left++;
//             } else {
//                 right--;
//             }
//         }
//     }
//     return result;
// }

// Also return resultArray
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let min = Number.MAX_SAFE_INTEGER;
    let result = 0;
    let resultArray = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates
        if (i > 0 && nums[i] === nums[i - 1]) {
            // console.log('skip', nums[i]);
            continue;
        }
        let left = i + 1;
        
        let right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            let diff = Math.abs(sum - target);
            if (diff < min) {
                min = diff;
                result = sum;
                resultArray = [nums[i], nums[left], nums[right]];
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return {
        result: result,
        resultArray: resultArray
    };
}

// Driver code
console.log(threeSumClosest([-1, 2, 1, -4], 1));
console.log(threeSumClosest([1, 1, 1, 0], -100));
console.log(threeSumClosest([0, 2, 1, -3], 1));
console.log(threeSumClosest([1, 2, 4, 8, 16, 32, 64, 128], 82));
console.log(threeSumClosest([-1, 2, 1, -4], 1));
console.log(threeSumClosest([-1, 2, 1, -4], 1));

// Generate 50 random test cases
let testCases = [];
for (let i = 0; i < 50; i++) {
    let nums = [];
    let target = Math.floor(Math.random() * 100);
    for (let j = 0; j < Math.floor(Math.random() * 100); j++) {
        nums.push(Math.floor(Math.random() * 100));
    }
    testCases.push({
        nums: nums,
        target: target
    });
}

// Test testCases with threeSumClosest
for (let i = 0; i < testCases.length; i++) {
    let result = threeSumClosest(testCases[i].nums, testCases[i].target);
    if (result !== testCases[i].target) {
        console.log('Test case #' + i + ' failed');
        console.log('Expected: ' + testCases[i].target);
        console.log('Got: ' + result);
    }
}


        