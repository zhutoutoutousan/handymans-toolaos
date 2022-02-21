// Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
// Return the sum of the three integers.
// You may assume that each input would have exactly one solution.

// Define INT_MAX
#define INT_MAX 2147483647

// Define cmp
int cmp(const void *a, const void *b)
{
    return *(int *)a - *(int *)b;
}

int threeSumClosest(int* nums, int numsSize, int target) {
    int i, j, k, min, sum, diff;
    int min_diff = INT_MAX;
    int min_sum = 0;
    qsort(nums, numsSize, sizeof(int), cmp);
    for (i = 0; i < numsSize - 2; i++) {
        j = i + 1;
        k = numsSize - 1;
        while (j < k) {
            sum = nums[i] + nums[j] + nums[k];
            diff = abs(sum - target);
            if (diff < min_diff) {
                min_diff = diff;
                min_sum = sum;
            }
            if (sum < target) {
                j++;
            } else {
                k--;
            }
        }
    }
    return min_sum;
}

// Driver code
int main()
{
    int nums[] = {-1, 2, 1, -4};
    int numsSize = sizeof(nums) / sizeof(int);
    int target = 1;
    printf("%d", threeSumClosest(nums, numsSize, target));
    return 0;
}
