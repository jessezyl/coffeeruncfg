/**
 * Created by Jesse on 15/10/7.
 */

var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {};
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
handle["/download"] = requestHandler.download;

server.start(router.route, handle);