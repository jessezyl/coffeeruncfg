/**
 * Created by Jesse on 15/12/21.
 */

var mongoose = require("mongoose");

var CatCfgSchema = new mongoose.Schema({
    id: String,
    parent_id: String,
    img_id: String,
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

CatCfgSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

CatCfgSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt');
        exec(cb);
    },
    findById:function(id,cb){
        return this
            .findOne({id:id});
        exec(cb);
    }
};

module.exports = CatCfgSchema;

