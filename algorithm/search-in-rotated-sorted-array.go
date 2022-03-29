// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
// You must write an algorithm with O(log n) runtime complexity.
func search(nums []int, target int) int {
	if len(nums) == 0 {
		return -1
	}
	// If target value does not exist in nums, return -1
	if target < nums[0] || target > nums[len(nums)-1] {


	left, right := 0, len(nums)-1
	for left <= right {
		mid := left + (right-left)/2
		if nums[mid] == target {
			return mid
		}
		if nums[left] <= nums[mid] {
			if nums[left] <= target && target < nums[mid] {
				right = mid - 1
			} else {
				left = mid + 1
			}
		} else {
			if nums[mid] < target && target <= nums[right] {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}
	return -1
}

// There must be a better way
// Step 1: Shift the array to the right until the pivot is in the middle
// Step 2: Search for the target value
// TODO: Fix this
// LINK: https://leetcode.com/problems/search-in-rotated-sorted-array/
func search_alt_1(nums []int, target int) int {
	if len(nums) == 0 {
		return -1
	}
	// Step 1: Shift the array to the right until the pivot is in the middle
	pivot := findPivot(nums)
	if pivot == -1 {
		return binarySearch(nums, target)
	}
	if nums[pivot] == target {
		return pivot
	}
	if nums[0] <= target {
		return binarySearch(nums[:pivot], target)
	}
	return binarySearch(nums[pivot:], target)
}

func binarySearch(nums []int, target int) int {
	left, right := 0, len(nums)-1
	for left <= right {
		mid := left + (right-left)/2
		if nums[mid] == target {
			return mid
		}
		if nums[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return -1
}

func findPivot(nums []int) int {
	left, right := 0, len(nums)-1
	for left <= right {
		mid := left + (right-left)/2
		if nums[mid] > nums[right] {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return left
}