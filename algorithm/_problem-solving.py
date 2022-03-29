# TODO: https://www.hackerrank.com/challenges/find-second-maximum-number-in-a-list/problem?isFullScreen=true&h_r=next-challenge&h_v=zen
if __name__ == '__main__':
    n = int(input())
    arr = map(int, input().split())
    arr = list(arr)

    # Sort the array in descending order, return the second max value
    arr.sort(reverse=True)
    for i in range(len(arr)):
        if arr[i] != arr[0]:
            print(arr[i])
            break