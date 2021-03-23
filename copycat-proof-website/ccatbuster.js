

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
            location.reload();
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
