// Function difference

// This is the ES6 function

// newFunction('New piece of shit');

const newFunction = (inputString) => {
    console.log(`This new Function with input ${inputString} has been invoked`);
}


// This is the old function



{


    // oldFunction('Old piece of shit');      // VM240:18 Uncaught TypeError: oldFunction is not a function

    var oldFunction = function(inputString) {
        console.log('This old Function with input ' + inputString + ' has been invoked');
    }

    oldFunction('Old piece of shit'); // VM293:22 This old Function with input Old piece of shit has been invoked
}