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

let foo: any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World