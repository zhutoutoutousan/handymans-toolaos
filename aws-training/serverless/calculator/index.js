// Calculator as lambda function
exports.handler = async (event) => {
    // Read a, b, op from request body
    console.log(event.body)
    const { a, b, op } = event.body;
    // Calculate result
    let result = 0;
    if (op === '+') {
        result = a + b;
    }
    else if (op === '-') {
        result = a - b;
    }
    else if (op === '*') {
        result = a * b;
    }
    else if (op === '/') {
        result = a / b;
    }
    else {
        result = 'Invalid operator';
    }
    // Return result
    return {
        statusCode: 200,
        body: JSON.stringify({
            result: result
        })
    };
};
//# sourceMappingURL=index.js.map
