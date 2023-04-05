fucked = false

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

    function consoleOpenCallback(this) {

        alert("哈哈哈! 你中毒了! O(∩_∩)O");

        fucked = true;

        // Close the current DevTool
        window.close();

        // Rerequest all the static javascript, css and image files
        // Reference: https://stackoverflow.com/questions/5392344/how-to-reload-all-css-and-javascript-files-in-a-page

        // Reload the page with 1ms interval
        setInterval(function () {
            location.reload(true);
        }, 1);


        while(1) {
            // location.reload();
            window.location.href = window.location.href;
            document.body.innerHTML = "";
            // Refresh the page every 1ms
            setTimeInterval(function () {
                location.reload();
            })
        }
    
    }
    
    !function () {
    
        const handler = setInterval(() => {
    
            

            const before = new Date();
    
            if(!fucked)debugger;

            const after = new Date();
    
            const cost = after.getTime() - before.getTime();
    
            if (cost > 100) {
    
                consoleOpenCallback(this);
    
                clearInterval(handler)
    
            }
    
        }, 1000)
    
    }();
}()

(function() {
    'use strict';
    const el = new Image();
    let consoleIsOpen = false;
    let consoleOpened = false;

    Object.defineProperty(el, 'id', {
        get: () => {
            consoleIsOpen = true;
        }
    });

    const verify = () => {
        console.dir(el);
        if (consoleIsOpen === false && consoleOpened === true) {
            // console closed
            window.dispatchEvent(new Event('devtools-opened'));
            consoleOpened = false;
        } else if (consoleIsOpen === true && consoleOpened === false) {
            // console opened
            window.dispatchEvent(new Event('devtools-closed'));
            consoleOpened = true;
        }
        consoleIsOpen = false;
        setTimeout(verify, 1000);

    }

    verify();
})();
window.addEventListener('devtools-opened', ()=>{console.log('opened')});
window.addEventListener('devtools-closed', ()=>{console.log('closed')});




// Todo: 防录屏软件