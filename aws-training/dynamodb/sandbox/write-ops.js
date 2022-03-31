const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

// Instantiate DocumentClient
const docClient = new AWS.DynamoDB.DocumentClient();

