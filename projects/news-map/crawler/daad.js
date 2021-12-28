// import file system
var fs = require('fs');
var Crawler = require("crawler");



// Create a crawler to fetch all the links in the page and then crawl them, console.log the results, write the results to local file results.txt
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // visit available links
        if(error) {
            console.log(error);
        }

        var $ = result.$;

        // if there is pdf file, download it and save it to local file
        if($('a').attr('href').indexOf('.pdf') > 0) {

            var pdf_link = $('a').attr('href');
            var pdf_name = pdf_link.substring(pdf_link.lastIndexOf('/') + 1);

            console.log(`Found a pdf file, downloading ${pdf_name}`);

            var pdf_path = './pdf/' + pdf_name;
            console.log(pdf_path);
            // download pdf file
            var file = fs.createWriteStream(pdf_path);
            var request = require('request');
            request(pdf_link).pipe(file);
        }

        $("a").each(function(index, a) {
            var link = $(a).attr("href");
            if (link.indexOf("http") == 0) {
                console.log(link);
                c.queue(link);
            }
        }
        );
    }
});



// Use c to crawl https://www2.daad.de/ and log its html contents
c.queue('https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/');






