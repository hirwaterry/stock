const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const items = mongoose.model('items',ItemsSchema);
module.exports = items;