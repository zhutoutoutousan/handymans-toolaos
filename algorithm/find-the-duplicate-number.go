// Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
// There is only one repeated number in nums, return this repeated number.
// You must solve the problem without modifying the array nums and uses only constant extra space.
func findDuplicate(nums []int) int {
	// Step 1: Sort nums
	sort.Ints(nums)
	// Step 2: Search for the duplicate
	for i := 0; i < len(nums)-1; i++ {
		if nums[i] == nums[i+1] {
			return nums[i]
		}
	}
	return -1
}

// It's not efficient, I think you need to set a hash table
// and check if the value is in the hash table
func findDuplicateByHash(nums []int) int {
	// Step 1: Set a hash table
	hash := make(map[int]int)
	// Step 2: Check if the value is in the hash table
	for _, num := range nums {
		if hash[num] == 1 {
			return num
		}
		hash[num] = 1
	}
	return -1
}

// Hash idea is great, but it still needs non-brute-force approach