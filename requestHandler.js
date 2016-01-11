/**
 * Created by Jesse on 15/10/7.
 */

var fs = require("fs");
var formidable = require("formidable");
var url = require("url");
var Converter = require("csvtojson").Converter;
var util = require("util");
var mongoose = require("mongoose");
var CatCfg = require("./mgmodel");

var coffeeRunCfgJson = {};


var jsonFiles = ["car.json","car_cat.json","showcase.json","showcase_cat.json","story.json","story_cat.json","game_config.json"];
mongoose.connect('mongodb://localhost/gamedb');

function init(){
    for(var i=0;i<jsonFiles.length;i++){
        combineJsons(jsonFiles[i]);

    }
}

function start(response,request)
{
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<p>注意:<br>上传文件名为：car.csv、car_cat.csv、showcase.csv、showcase_cat.csv、story.csv、story_cat.csv、game_config.csv'+
            '<br>并且保证csv里面没有空行'+
        '</p>'+
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();



}

function upload_cfg(response,request)
{
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '<a color="#FF0000">注意:<br>上传文件名为：car.csv、car_cat.csv、showcase.csv、showcase_cat.csv、story.csv、story_cat.csv、game_config.csv'+
        '<br>并且保证csv里面没有空行'+
        '</a>'+
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

    //mongoose.connect('mongodb://localhost/gamedb');

}

function upload(response, request)
{
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm({uploadDir:"/tmp"});
    console.log("about to parse...");

    var fileNames;
    form.parse(request, function(error, fields, files){
        if(error){
            console.log(error);
        }
        console.log("parse done.");
        fileNames = files.upload.name.split(".");
        console.log("filename:"+fileNames[0]);
        fs.renameSync(files.upload.path, __dirname+"/"+files.upload.name);
        console.log("rename done");

        //csv2json
        var converter = new Converter({
            checkType:false
        });
        converter.on("end_parsed",function(jsonArray){
            console.log(JSON.stringify(jsonArray));
            fs.writeFile(fileNames[0]+".json",JSON.stringify(jsonArray), function (err) {
                if(err) throw err;
                console.log("it is saved.");
                combineJsons(fileNames[0]+".json");
            });
            console.log(jsonArray);
            for(var i in jsonArray){
                console.log("db_data:"+JSON.stringify(jsonArray[i]));
                var catcfg = new CatCfg(jsonArray[i]);
                catcfg.save(function(err,cfg){
                    if (err) return console.error(err);
                    CatCfg.find(function(err,cfgs){
                        console.log("cfgs:"+cfgs);
                    })
                });
            }
        });

        fs.createReadStream(__dirname+"/"+files.upload.name).pipe(converter);
        console.log("about to read");
        var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" ' +
            'content="text/html; charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<p>上传成功!</p>' +
            '<a href="/'+fileNames[0]+'.json">下载json文件</a>' +
            '<br>' +
            '<a href="/">重新上传</a>' +
            '</body>' +
            '</html>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        //response.write("<img src='/show' />");
        response.end();
    });

}

function show(response)
{
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/fs_read.json", "utf-8", function(error, file){
        if(error)
        {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else
        {
            response.writeHead(200, {
                "Content-Type": {
                    ".css":"text/css",
                    ".js":"application/javascript",
                    ".json":"application/json"
                }[".json"]
            });
            response.write(file);
            response.end();
        }
    })

}

function download(response)
{
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/fs_read.json", "utf-8", function(error, file){
        if(error)
        {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else
        {
            response.writeHead(200, {
                "Content-Type": {
                    ".css":"text/css",
                    ".js":"application/javascript",
                    ".json":"application/json"
                }[".json"]
            });
            response.write(file);
            response.end();
        }
    })

}

function combineJsons(jsonFile) {

    fs.readFile(jsonFile, 'utf-8', function (err, data) {//读取内容
        if (err) throw err;
        console.log("now reading file:" + jsonFile);
        var key = jsonFile.split(".")[0];
        coffeeRunCfgJson[key] = JSON.parse(data);
        fs.writeFile("coffeeruncfg.json", JSON.stringify(coffeeRunCfgJson), function (err) {
            if (err) throw err;
            console.log("coffeeruncfg is saved.");
            console.log(coffeeRunCfgJson);

        });
    });

}

function getJson(response,request){
    console.log("send coffeeruncfg json data");

    request.on("data",function(){
        console.log("got data msg");
    });

    request.on("end",function(){
        console.log("got end msg");
        fs.readFile("coffeeruncfg.json", 'utf-8', function (err, data) {//读取内容
            if (err) throw err;
            console.log(data);
            response.writeHead(200,{'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'});
            response.end(data);
        });

    });
}

exports.init = init;

exports.start = start;
exports.upload_cfg = upload_cfg;
exports.getJson = getJson;
exports.upload = upload;
exports.download = download;