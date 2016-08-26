//model Todo

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
exports.Schema = new Schema({
    //_id: ObjectId,
    content: {
        type:String,
        require: true
    },
    done: {
      type: Boolean,
      default: false
    },
    lastmotified_date:{
        type: Date,
        default: Date.now
    },
    allert_date:{
        type: Date
    }
});

mongoose.model('Todo', exports.Schema);
