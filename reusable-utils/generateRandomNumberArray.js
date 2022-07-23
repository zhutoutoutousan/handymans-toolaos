const generateRandomNumberArrayWithLimit = (n, limit) => {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * limit));
    }
    return arr;
}