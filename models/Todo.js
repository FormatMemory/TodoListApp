//model Todo

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    //_id: ObjectId,
    content: {
        type:String,
        require: true
    },
    done: {
      type: Boolean,
      default: false
    },
    creat_date:{
        type: Date,
        default: Date.now
    },
    allert_date:{
        type: Date
    }
});

mongoose.model('Todo', TodoSchema);
