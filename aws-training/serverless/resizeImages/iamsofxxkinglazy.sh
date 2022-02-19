# Create a generic package.json file for the lambda function with latest jimp package
echo "Creating package.json"
echo "{" > package.json
echo "  \"name\": \"handymans-toolaos\"," >> package.json
echo "  \"version\": \"1.0.0\"," >> package.json
echo "  \"description\": \"\"," >> package.json
echo "  \"main\": \"index.js\"," >> package.json
echo "  \"scripts\": {}," >> package.json
echo "  \"author\": \"\"," >> package.json
echo "  \"license\": \"ISC\"," >> package.json
echo "  \"dependencies\": {" >> package.json
echo "    \"jimp\": \"^0.9.12\"" >> package.json
echo "  }" >> package.json
echo "}" >> package.json

