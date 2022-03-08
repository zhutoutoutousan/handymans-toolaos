# Input a 2-dimensional array and return the cell that is strictly greater than all its neighbors. Two cells are neighbours when they share common side or a common corner
def dominantCellls(grid):
    """
    :param grid: 2-dimensional array
    :return: the cell that is strictly greater than all its neighbors
    """
    # Initialize the maximum value
    max_value = 0
    # Initialize the coordinates of the maximum value
    max_x = 0
    max_y = 0
    # Iterate through the grid
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            # Initialize the current value
            current_value = grid[y][x]
            # Initialize the number of neighbors
            num_neighbors = 0
            # Iterate through the neighbors
            for i in range(-1, 2):
                for j in range(-1, 2):
                    # If the cell is not on the edge of the grid
                    if y + i >= 0 and y + i < len(grid) and x + j >= 0 and x + j < len(grid[0]):
                        # If the cell is not the current cell
                        if i != 0 or j != 0:
                            # If the neighbor is greater than the current cell
                            if grid[y + i][x + j] > current_value:
                                # Increment the number of neighbors
                                num_neighbors += 1
            # If the current cell is greater than all its neighbors
            if num_neighbors == 0:
                # If the current cell is greater than the maximum value
                if current_value > max_value:
                    # Update the maximum value
                    max_value = current_value
                    # Update the coordinates of the maximum value
                    max_x = x
                    max_y = y
    # Return the coordinates of the maximum value
    return max_x, max_y

# Input a 2-dimensional array and return the number of cells that is strictly greater than all its neighbors.    
def numCells(grid):
    """
    :param grid: 2-dimensional array
    :return: the number of cells that is strictly greater than all its neighbors
    """
    # Initialize the number of cells
    num_cells = 0
    
    # PRINT THE GRID 2-dimensional array in matrix format
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            print(grid[y][x], end=" ")
        print()
    print()


    # Iterate through the grid
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            # Initialize the current value
            current_value = grid[y][x]
            # Initialize the number of neighbors
            num_neighbors = 0
            # Iterate through the neighbors
            for i in range(-1, 2):
                for j in range(-1, 2):
                    # If the cell is not on the edge of the grid
                    if y + i >= 0 and y + i < len(grid) and x + j >= 0 and x + j < len(grid[0]):
                        # If the cell is not the current cell
                        if i != 0 or j != 0:
                            # If the neighbor is greater than the current cell
                            # print the current position
                            print(f"evaluating {y + i}, {x + j}")
                            print("y: {}, x: {}".format(y, x))
                            # print the current i,j 
                            print("i: {}, j: {}".format(i, j))                        
                            if grid[y + i][x + j] >= current_value:
                                # Increment the number of neighbors
                                num_neighbors += 1
                                
                    
            # If the current cell is greater than all its neighbors
            if num_neighbors == 0:
                # Increment the number of cells
                print(f"evaluation success for {y}, {x}")
                num_cells += 1
    # Return the number of cells
    return num_cells