export function checkIfSupportWebGL(canvas) {
    var gl;
    try {
        gl = canvas.getContext("experimental-webgl");
    }
    catch(e) {
        var msg = `${e}! Your old browser doesn't support WebGL`;
        alert(msg)
    }
    return gl;
}