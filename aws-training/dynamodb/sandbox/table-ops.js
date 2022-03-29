const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

// Create a typical user table
const dynamodb = new AWS.DynamoDB()
const params = {
    TableName: "User",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "name", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "name", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}

// Add data structure to the table
dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
    }
}
)
