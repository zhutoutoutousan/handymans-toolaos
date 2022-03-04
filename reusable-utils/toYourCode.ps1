# Powershell script

# Output "Where do you store your code"
Write-Output "Where do you store your code?"

# Read user input to variable
$codeDir = Read-Host

# Ask if user wants to overwrite current stored path
Write-Output "Do you want to overwrite current stored path? Default: false"

$isOverwrite = Read-Host

# Check if the current directory contains code-directory.txt and $isOverwrite is not empty, in powershell
# if not, create it
if (Test-Path code-directory.txt -and $isOverwrite -eq $null) {
    Write-Output "code-directory.txt already exists, please delete it or use -overwrite"
    # Write-Output "code-directory.txt exists"
    Write-Output "code-directory.txt exists"
    $codeDir = Get-Content code-directory.txt
    Set-Location $codeDir
    exit
}
else
{
    Write-Output "code-directory.txt does not exist"

    # Store the current $codeDir value to code-directory.txt
    Set-Content code-directory.txt $codeDir
    Set-Location $codeDir
    exit
}


# If user input is not empty and is a valid path, then change directory to it, powershell
if ($null -ne $codeDir -and $codeDir -ne "") {

    Write-Output "Changing directory to $codeDir"
    Set-Location $codeDir
    # exit powershell
    exit
}


