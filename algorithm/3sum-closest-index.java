import java.util.Arrays;
// Runtime: 5 ms, faster than 93.27% of Java online submissions for 3Sum Closest.
// Memory Usage: 41.5 MB, less than 69.27% of Java online submissions for 3Sum Closest.
class Solution {
    public int threeSumClosestWithIndex(int[] nums, int target) {
        int result = nums[0] + nums[1] + nums[nums.length-1];
        // Initialize Index array according to nums from 0 to nums.length-1
        int[] index = new int[nums.length];
        Arrays.sort(nums);
        // According to sort nums, update the index array
        for (int i=0; i<nums.length; i++) {
            // Find the index of nums[i] in nums
            index[i] = Arrays.binarySearch(nums, i, nums.length, nums[i]);
        }

        for (int i=0; i<nums.length-2; i++) {
            int left = i+1;
            int right = nums.length-1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == target) {
                    return sum;
                }
                if (Math.abs(sum - target) < Math.abs(result - target)) {
                    result = sum;
                }
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
}

// driver code
public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {-1, 2, 1, -4};
        int target = 1;
        System.out.println(sol.threeSumClosest(nums, target));
    }
}