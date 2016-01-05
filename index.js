/**
 * Created by Jesse on 15/10/7.
 */

var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {};
handle["/"] = requestHandler.upload_cfg;
handle["/start"] = requestHandler.start;
handle["/upload_cfg"] = requestHandler.upload_cfg;
handle["/carcfg"] = requestHandler.carcfg;
handle["/carcatcfg"] = requestHandler.carcatcfg;
handle["/showcasecfg"] = requestHandler.showcasecfg;
handle["/showcasecatcfg"] = requestHandler.showcasecatcfg;
handle["/storycfg"] = requestHandler.storycfg;
handle["/storycatcfg"] = requestHandler.storycatcfg;
handle["/upload"] = requestHandler.upload;
handle["/download"] = requestHandler.download;

server.start(router.route, handle);