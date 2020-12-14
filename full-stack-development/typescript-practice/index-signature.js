// https://basarat.gitbook.io/typescript/type-system/index-signatures
// let foo: any = {};
// foo['Hello'] = 'World';
// console.log(foo['Hello']); // World
var Foo = /** @class */ (function () {
    function Foo(message) {
        this.message = message;
    }
    ;
    Foo.prototype.log = function () {
        console.log(this.message);
    };
    return Foo;
}());
var foo = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World
