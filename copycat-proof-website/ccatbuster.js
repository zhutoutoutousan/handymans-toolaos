// if user toggle in-system snipping tools, the website won't display
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/hasFocus
function checkPageFocus() {
    let body = document.querySelector('body');
    if (document.hasFocus()) {
        body.style.display = "block";
      }
      else {
        body.style.display = "none";
      }
}

setInterval(checkPageFocus, 300);

// Disable right-click
document.addEventListener('contextmenu', event => event.preventDefault());


// ------------------------------------------------------------------------
//  Check if DevTool is open
// 
//  Reference: https://www.programmersought.com/article/60264244229/
!function () {

    function consoleOpenCallback() {

        alert("哈哈哈! 你中毒了! O(∩_∩)O");

        while(1) {
            // location.reload();
            window.location.href = window.location.href;
        }
    
    }
    
    !function () {
    
        const handler = setInterval(() => {
    
            const before = new Date();
    
            debugger;
    
            const after = new Date();
    
            const cost = after.getTime() - before.getTime();
    
            if (cost > 100) {
    
                consoleOpenCallback();
    
                clearInterval(handler)
    
            }
    
        }, 1000)
    
    }();
}()


// Todo: 防录屏软件