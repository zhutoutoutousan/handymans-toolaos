# A mathematical expression containing +,-,*,^, / and parenthesis will be provided. Read in the expression, then evaluate it. Display the result rounded to 3 decimal places.
read -p "Please enter a mathematical expression: " expr
# Use printf and scale=5 for bc
printf "%.3f\n" $(echo "scale=5; $expr" | bc -l)
