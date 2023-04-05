// Calculator as lambda function
exports.handler = async (event) => {
    // Read a, b, operation from request body
    console.log(event)
    let { a, b, operation } = event.body;
    // If pathParameter is not bigger than 0 and smaller than 4 overwrite it to operation, use ternay
    operation = event.pathParameters > 0 && event.pathParameters < 4 ? event.pathParameters : operation;
    // Calculate result
    let result = 0;

    // rewrite below code with ternary
    result = operation === undefined ? a + b : operation === 0 ? a + b : operation === 1 ? a - b : operation === 2 ? a * b : operation === 3 ? a / b : 'Invalid operation';

    // Return result
    return {
        statusCode: 200,
        body: JSON.stringify({
            result: result
        })
    };
};
//# sourceMappingURL=index.js.map
