// https://basarat.gitbook.io/typescript/type-system/index-signatures
// let foo: any = {};
// foo['Hello'] = 'World';
// console.log(foo['Hello']); // World

class Foo {
    constructor(public message: string){};
    log() {
        console.log(this.message)
    }
}

let obj = {
    toString() {
        console.log('toString called')
        return 'Hello'
    }
}

let foo: any = {};
foo[obj] = 'World'; // toString called 
console.log(foo[obj]); // toString called, World
console.log(foo['Hello']); // World