const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Create an image
const Jimp = require("jimp");
let image = null;

// Use Jimp to read random images from the Internet, append Text onto it then resize it
const resizeImage = async (url) => {
    // create a Jimp image from a URL
    let image = await Jimp.read(url);
    image.resize(256, 256);
    image.print(Jimp.FONT_SANS_32_WHITE, 10, 10, "Hello World!");
    return image.getBufferAsync(Jimp.MIME_JPEG);
}

// Open the api routing /getImage, prompt user to input the url, and use this url to resizeImage, then return the image
app.get("/getImage", async (req, res) => {
    const url = req.query.url;
    const imageBuffer = await resizeImage(url);
    res.send(imageBuffer);
});

// Open the api routing /, and returns ./index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);