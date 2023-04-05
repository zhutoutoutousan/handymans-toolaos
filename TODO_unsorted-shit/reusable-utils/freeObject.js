// UML module
!function(e) {
    // "use strict";

    // The code below is a copy of the code from the underscore.js library.
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.freeObject = e()
    }
}