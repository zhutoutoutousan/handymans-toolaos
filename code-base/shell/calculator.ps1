# Simple interest calculation on any principle amount involves variables like Principal amount, Interest rate and tenure for which you are calculating SI Simple interest can be calculated by using below formula SI = PRT/100 
# Write a PowerShell to take user inputs and show the results to the user

# Code
# Get user inputs
$principal = Read-Host "Enter the principal amount"
$rate = Read-Host "Enter the rate of interest"
$tenure = Read-Host "Enter the tenure"

# Calculate simple interest
$si = ($principal * $rate * $tenure)/100

# Display the result
Write-Host "Simple interest is $si"

# Output
Enter the principal amount 1000
Enter the rate of interest 10
Enter the tenure 2
Simple interest is 200
