package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

/*
 * Complete the 'RemainderSorting' function below (and other code for sorting if needed).
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY strArr as parameter.
 * Receives an array of strings and sorts them based on the following heuristics
 * 	The primary sort is by increasing remainder of the string's lengths, modulo 3
 *	If multiple strings have the same remainder, they should be sorted in alphabetical order
 */
func RemainderSorting(strArr []string) []string {
	// Make modulo 3 remainder array
	mod3RemArr := make([]int, len(strArr))
	for i, str := range strArr {
		mod3RemArr[i] = len(str) % 3
	}
	// Sort the modulo 3 remainder array and record its changed position
	sort(mod3RemArr, strArr)
	// Sort strArr in alphabetical order

	// Return
	return strArr
}

func sort(arr []int, strArr []string) {
	for i := 0; i < len(arr); i++ {
		for j := i + 1; j < len(arr); j++ {
			if arr[i] > arr[j] {
				swapInt(arr, i, j)
				swapString(strArr, i, j)
			}
			// If arr[i] = arr[j], sort in alphabetical order
			if arr[i] == arr[j] {
				if strArr[i] > strArr[j] {
					swapString(strArr, i, j)
					swapInt(arr, i, j)
				}
			}
		}
	}
}

func swapInt(arr []int, i int, j int) {
	temp := arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

func swapString(arr []string, i int, j int) {
	temp := arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

func main() {
	reader := bufio.NewReaderSize(os.Stdin, 16*1024*1024)

	stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
	checkError(err)

	defer stdout.Close()

	writer := bufio.NewWriterSize(stdout, 16*1024*1024)

	strArrCount, err := strconv.ParseInt(strings.TrimSpace(readLine(reader)), 10, 64)
	checkError(err)

	var strArr []string

	for i := 0; i < int(strArrCount); i++ {
		strArrItem := readLine(reader)
		strArr = append(strArr, strArrItem)
	}

	result := RemainderSorting(strArr)

	for i, resultItem := range result {
		fmt.Fprintf(writer, "%s", resultItem)

		if i != len(result)-1 {
			fmt.Fprintf(writer, "\n")
		}
	}

	fmt.Fprintf(writer, "\n")

	writer.Flush()
}

func readLine(reader *bufio.Reader) string {
	str, _, err := reader.ReadLine()
	if err == io.EOF {
		return ""
	}

	return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
