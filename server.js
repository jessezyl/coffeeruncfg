/**
 * Created by Jesse on 15/10/7.
 */

var http = require("http");
var url = require("url");

function start(route, handle)
{
    function OnRequest(request, response)
    {
        //var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request " + pathname + " Received.");

        route(handle, pathname, response, request);
        /*
        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk '" +
                postDataChunk + "'.");
        });

        request.addListener("end", function(){
            route(handle, pathname, response, postData);
        });

        route(handle, pathname, response);

        response.writeHead(200, {"Content-Type": "Text/plain"});
        response.write("hello world");
        response.end();
        */
    }
    http.createServer(OnRequest).listen(8888);
    console.log("Server Started.");
}

exports.start = start;

