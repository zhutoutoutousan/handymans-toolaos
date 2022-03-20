# Visualize input ASCII string, use UI to select characters to display
# Author: Yiming Li
# Date: 2019-10-29

import tkinter as tk

def visualizeAscii(string):
    """
    Visualize input ASCII string, use UI to select characters to display
    """
    # Create a window
    window = tk.Tk()
    window.title("Visualize ASCII")
    window.geometry("500x500")

    # Create a frame
    frame = tk.Frame(window)
    frame.pack()

    # Create a label
    label = tk.Label(frame, text="Select characters to display")
    label.pack()

    # Create a listbox
    listbox = tk.Listbox(frame)
    listbox.pack()

    # Create a scrollbar
    scrollbar = tk.Scrollbar(frame)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    # Set scrollbar to listbox
    listbox.config(yscrollcommand=scrollbar.set)
    scrollbar.config(command=listbox.yview)

    # Create a button
    button = tk.Button(frame, text="OK", command=lambda: print(listbox.get(listbox.curselection())))
    button.pack()

    # Create a list of characters
    characters = []
    for i in range(len(string)):
        characters.append(string[i])

    # Insert characters into listbox
    for i in range(len(characters)):
        listbox.insert(i, characters[i])

    # Start mainloop
    window.mainloop()


if __name__ == "__main__":
    # Get input string
    string = input("Please input a string: ")

    # Visualize input ASCII string
    visualizeAscii(string)

    # End of program
    print("End of program")
    exit()


# Given the names and grades for each student in a class of  students, store them in a nested list and print the name(s) of any student(s) having the second lowest grade.
# Note: If there are multiple students with the second lowest grade, order their names alphabetically and print each name on a new line.
# Print the name(s) of any student(s) having the second lowest grade in. If there are multiple students, order their names alphabetically and print each one on a new line.
if __name__ == '__main__':
    n = int(input())
    student_marks = {}
    for _ in range(n):
        name = input()
        marks = float(input())
        student_marks[name] = marks
    # Find the second lowest grade
    second_lowest_grade = sorted(set(student_marks.values()))[1]
    # Find the names of students with the second lowest grade
    names_of_students_with_second_lowest_grade = []
    for name, grade in student_marks.items():
        if grade == second_lowest_grade:
            names_of_students_with_second_lowest_grade.append(name)
    # Print the names of students with the second lowest grade
    names_of_students_with_second_lowest_grade.sort()
    for name in names_of_students_with_second_lowest_grade:
        print(name)
        
