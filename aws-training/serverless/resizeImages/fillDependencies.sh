# If there is no 'require-tree' dependency in package.json, then install it
if ! grep -q '"require-tree":' package.json; then
  echo "Adding 'require-tree' dependency to package.json"
  # Search for the line that contains dependencies and save the line number to variable 'startLineNumber' and echo it
    startLineNumber=$(grep -n "\"dependencies\"" package.json | cut -d: -f1)
    echo "startLineNumber: $startLineNumber"
  # Search the smallest line after variable 'startLineNumber' that contains '}' and save the line number to variable 'endLineNumber' and echo it
    endLineNumber=$(grep -n "}" package.json | sort -n | head -1 | cut -d: -f1)
    echo "endLineNumber: $endLineNumber"
fi

npm install --save require-tree && node -e "require('require-tree')('./'); console.log(require('jimp').info)"


