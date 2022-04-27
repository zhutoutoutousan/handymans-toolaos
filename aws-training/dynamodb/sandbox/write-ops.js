const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-2" })

// Instantiate DocumentClient
const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
    TableName: "Movies",
    Item: {
        "year": 2015,
        "title": "The Big New Movie",
        "info": {
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
}, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

docClient.put({
    TableName: "td_notes_sdk",
    Item: {
        "id": "1",
        "title": "Test Note",
        "content": "This is a test note",
        "created_at": "2019-01-01T00:00:00.000Z",
        "updated_at": "2019-01-01T00:00:00.000Z"
    }
}, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

docClient.update({
    TableName: "td_notes_sdk",
    Key: {
        user_id: "1",
        timestamp: "2019-01-01T00:00:00.000Z"
    },
    UpdateExpression: "set content = :c",
    ExpressionAttributeValues: {
        ":c": "This is a test note - updated"
    },
    ReturnValues: "UPDATED_NEW"
}, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
    }
})