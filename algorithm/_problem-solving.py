# The first line contains integers n and m separated by a space.
# The second line contains  integers, the elements of the array.
# The third and fourth lines contain m integers, set A and set B, respectively.
# Output a single integer, your total happiness.
if __name__ == '__main__':
    n, m = map(int, input().split())
    arr = list(map(int, input().split()))
    A = set(map(int, input().split()))
    B = set(map(int, input().split()))
    happiness = 0
    for i in arr:
        if i in A:
            happiness += 1
        elif i in B:
            happiness -= 1
    print(happiness)
