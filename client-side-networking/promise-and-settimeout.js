// Example 1: Basics
function change(interval) {
    return new Promise((resolve, reject) {
        // Setting 3000ms time
        if(typeof(interval) !== 'number') reject('Wrong input');
        setTimeout(resolve, interval);
    }).then(() => {
        console.log(`Wrapped setTimeout after ${interval}ms`);
    })
}
