
// let button = document.getElementsByClassName('download');
var xhr = new XMLHttpRequest();
var url = 'http://101.227.111.51/models/robot-kyle.fbx';
var downloadedBlob;
xhr.open("GET", url, true);
xhr.responseType = 'arraybuffer';
xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
        console.log(xhr.response) // ArrayBuffer
        console.log(new Blob([xhr.response])) // Blob
        downloadedBlob = new Blob([xhr.response]);
        var url = URL.createObjectURL(downloadBlob);
        var anchor = document.createElement('a');        
        anchor.href = url;
        anchor.download = filename || 'download';
        downloadBlob(downloadedBlob, 'downloadedBlob.fbx');
    }
    else {
        conosle.error('Something went wrong')
    }
});
xhr.send();


function downloadBlob(blob, filename) {
    // Create an object URL for the blob object
    var url = URL.createObjectURL(blob);

    // Create a new anchor element
    var anchor = document.createElement('a');

    // Set the href and download attributes for the anchor element
    // Optionally set other attributes like 'title', etc
    // Especially, if the anchor element will be attached to the DOM
    anchor.href = url;
    anchor.download = filename || 'download';

    // Click handler that releases the object URL after the element has been clicked
    // This is required for one-off downloads of the blob content
    var clickHandler = () => {
        setTimeout(function() {
            URL.revokeObjectURL(url);
            window.removeEventListener('click', clickHandler);
        }, 150);
    }

    // Add the click event listener on the anchor element
    anchor.addEventListener('click', clickHandler, false);  // one-off download

    // Programatically trigger a click on the anchor element
    // Useful when wanting the download to happen automatically
    // Without attaching the anchor element to the DOM
    anchor.click();

    // Return the anchor element
    // Useful if you want a reference to the element
    // In order to attach it to the DOM or use it in some other way
    return anchor;
}



// This function is not that great?
function downloadBlob_alt(blob, name = 'file.txt') {
    // Convert the blob into a Blob URL (a special url that points to an object in the browser's url)
    var blobUrl = URL.createObjectURL(blob);

    // Create a link element
    var link = document.createElement('a');

    // Set link's href to point to the Blob URL 
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    // Remove link from body
    document.body.removeChild(link);
}

