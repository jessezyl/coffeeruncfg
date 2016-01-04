/**
 * mgmodel.js
 * Created by Jesse on 15/12/21.
 */

var mongoose = require("mongoose");
var CatCfgSchema = require("./mgschema");

var CatCfg = mongoose.model("catcfg",CatCfgSchema);

module.exports = CatCfg;

