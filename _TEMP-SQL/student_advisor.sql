-- Create table student_information
CREATE TABLE student_information (
    roll_number INTEGER PRIMARY KEY,
    name TEXT,
    advisor INTEGER
);

-- Create faculty_information
CREATE TABLE faculty_information (
    employee_ID INTEGER PRIMARY KEY,
    gender CHAR,
    salary INTEGER
);

-- Write a query to find the roll_number and names of students who either have a male advisor with a salary of more than 15000
-- or a female advisor with a salary of more than 20000
SELECT roll_number, name 
FROM student_information s
JOIN faculty_information f
ON s.advisor = f.employee_ID
AND f.gender = "M" AND f.salary > 15000
OR f.gender = "F" AND f.salary > 20000