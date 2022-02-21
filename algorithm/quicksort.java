// Perform quick sort on an array of numbers
// Time complexity: O(n log n)
// Space complexity: O(n)

// quicksort function
// @param: array of numbers
// @return: sorted array of numbers
// java code
public class quicksort {
    public static void main(String[] args) {
        int[] arr = {5, 2, 4, 6, 3, 1};
        quicksort(arr, 0, arr.length - 1);
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }

    // partition method
    // @param: array of numbers, left index, right index
    // @return: index of pivot
    // java code
    public static int partition(int[] arr, int low, int high) {
        // pivot is the last element of the array
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j <= high - 1; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        return i;
    }    

    // swap method
    // @param: array of numbers, index1, index2
    // @return: none
    // java code
    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // quicksort method
    // @param: array of numbers, left index, right index
    // @return: sorted array of numbers
    public static int[] quicksort(int[] arr, int left, int right) {
        if (left < right) {
            int pivot = partition(arr, left, right);
            quicksort(arr, left, pivot - 1);
            quicksort(arr, pivot + 1, right);
        }
        return arr;
    }

}



