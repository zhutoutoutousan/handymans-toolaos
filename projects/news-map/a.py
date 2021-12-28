#  Given a number of points on a plane, your task is to find two points with the smallest distance between them in linearithmic O(n log n) time.

#  Example

#  For points = [[1, 1], [2, 2], [3, 3]], the output should be
#  closestPoints(points) = [[1, 1], [2, 2]].

#  Input/Output

#  [execution time limit] 4 seconds (js)

#  [input] array.array.integer points

#  An array of points.

#  Guaranteed constraints:
#  1 ≤ points.length ≤ 100,
#  points[i].length = 2,
#  -1000 ≤ points[i][j] ≤ 1000.

#  [output] array.array.integer

#  An array of two points with the smallest distance between them.
#  Calculate a pair of closest points in linearithmic time
def closest_pair(points):
    # convert points from tuples to lists
    points = [list(p) for p in points]
    # convert points from lists to tuples
    points = [tuple(p) for p in points]
    points.sort(key=lambda x: x[0])
    return closest_pair_rec(points, 0, len(points) - 1)

def closest_pair_rec(points, start, end):
    if end - start < 2:
        return (float('inf'), (0, 0))
    if end - start == 2:
        return (distance(points[start], points[start + 1]), (points[start], points[start + 1]))
    mid = (start + end) // 2
    left = closest_pair_rec(points, start, mid)
    right = closest_pair_rec(points, mid + 1, end)
    cross = closest_cross(points, start, end)
    return min(left, right, cross, key=lambda x: x[0])
def closest_cross(points, start, end):
    min_dist = float('inf')
    min_pair = (0, 0)
    for i in range(start, end):
        for j in range(i + 1, end + 1):
            dist = distance(points[i], points[j])
            if dist < min_dist:
                min_dist = dist
                min_pair = (points[i], points[j])
    return (min_dist, min_pair)

def distance(p1, p2):
    return ((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2) ** 0.5