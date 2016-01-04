/**
 * Created by Jesse on 15/10/7.
 */

var fs = require("fs");
var Converter = require("csvtojson").Converter;
function route(handle, pathname, response, request)
{
    console.log("About to route a request for " + pathname);
    //console.log("typeof: " + typeof(handle[pathname]));

    if (typeof(handle[pathname]) === "function")
    {
        handle[pathname](response, request);
    }
    else {

        //var pathname = url.parse(request.url).pathname;
        var ext = pathname.match(/(\.[^.]+|)$/)[0];

        switch(ext){
            case ".css":
            case ".js":
            case ".json":
                console.log("now reading file: " + ext);
                fs.readFile("." + request.url, 'utf-8',function (err, data) {//读取内容
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": {
                            ".css":"text/css",
                            ".js":"application/javascript",
                            ".json":"application/json"
                        }[ext]
                    });
                    response.write(data);
                    response.end();
                });
                break;
            case ".png":
            case ".jpg":
                console.log("now reading file: " + ext);
                fs.readFile("." + request.url, "binary", function (err, data) {//读取内容
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": {
                            ".png":"image/png",
                            ".jpg":"image/jpg"
                        }[ext]
                    });
                    response.write(data,"binary");
                    response.end();
                });
                break;
            case ".html":
                console.log("now reading file: " + ext);
                fs.readFile("." + request.url, 'utf-8',function (err, data) {//读取内容
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    response.write(data);
                    response.end();
                });
                break;
            case ".csv":

                var converter = new Converter({
                    checkType:false
                });
                converter.on("end_parsed",function(jsonArray){
                    console.log(jsonArray);
                    console.log(JSON.stringify(jsonArray));
                    fs.writeFile("fs_read.json",JSON.stringify(jsonArray), function (err) {
                        if(err) throw err;
                        console.log("it is saved.")
                    });
                });

                fs.createReadStream(__dirname+'/fs_read.csv').pipe(converter);

                break;
            default:
                console.log("now reading file: " + ext);
                break;
        }
    }
}

exports.route = route;