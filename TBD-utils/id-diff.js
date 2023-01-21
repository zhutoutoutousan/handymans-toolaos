// Write a array diff function, takes arrayA and arrayB, output the elements in arrayB in which id is not in arrayA
const arrayDiff = (arrayA, arrayB) => {
    let arrayAIds = arrayA.map(item => item.id);
    return arrayB.filter(item => !arrayAIds.includes(item.id));
}