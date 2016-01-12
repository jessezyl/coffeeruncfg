/**
 * mgmodel.js
 * Created by Jesse on 15/12/21.
 */

var mongoose = require("mongoose");
var mgschema = require("./mgschema");



var CatCfgSchema = new mongoose.Schema({
    cat_id: String,
    parent_node_id: String,
    img: String,
    x: String,
    y: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

var ShowcaseSchema = new mongoose.Schema({
    sc_id: String,
    level_id: String,
    img: String,
    rate: String,
    max_cat_num: String,
    min_cat_num: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

var CarSchema = new mongoose.Schema({
    car_id: String,
    level_id: String,
    max_speed: String,
    min_speed: String,
    img: String,
    rate: String,
    max_cat_num: String,
    min_cat_num: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

var GameCfgSchema = new mongoose.Schema({
    num_of_showcase: String,
    bg_speed: String,
    girl_fps: String,
    min_speed: String,
    girl_x: String,
    girl_y: String,
    refresh_time: String,
    car_gen_LTR_min: String,
    car_gen_LTR_max:String,
    car_gen_RTL_min:String,
    car_gen_RTL_max:String,
    run_game_time:String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

var StorySchema = new mongoose.Schema({
    sc_id: String,
    level_id: String,
    duration: String,
    img: String,
    rate: String,
    max_cat_num: String,
    min_cat_num: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

exports.CarCatCfg = mongoose.model("carcatcfg",CatCfgSchema);
exports.StoryCatCfg = mongoose.model("storycatcfg",CatCfgSchema);
exports.ShowcaseCatCfg = mongoose.model("showcasecatcfg",CatCfgSchema);
exports.ShowcaseCfg = mongoose.model("showcasecfg",ShowcaseSchema);
exports.GameCfg = mongoose.model("gamecfg",GameCfgSchema);
exports.StoryCfg = mongoose.model("storycfg",StorySchema);
exports.CarCfg = mongoose.model("carcfg",CarSchema);



