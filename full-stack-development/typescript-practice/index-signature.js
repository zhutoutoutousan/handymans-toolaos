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
var obj = {
    toString: function () {
        console.log('toString called');
        return 'Hello';
    }
};
var foo = {};
foo[obj] = 'World'; // toString called 
console.log(foo[obj]); // toString called, World
console.log(foo['Hello']); // World
