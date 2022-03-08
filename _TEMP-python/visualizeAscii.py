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
