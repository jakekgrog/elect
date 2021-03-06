var mongoose = require('mongoose');

var schema = mongoose.Schema;

var pollSchema = new schema({
    created_at: {
        type: Number,
        required: true
    },
    pollid:{
        type:String,
        required:true
    },
    author:{
      type:String,
      required:false
    },
    title:{
        type:String,
        required:true,
    },
    voteType: {
            code: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
    },
    options:{
        type:[],
        required:true
    },
    close_at: {
      type: Number,
      requreired:false
    },
    isSecure: {
        type: Boolean,
        required: true,
    }
})


module.exports = mongoose.model('polls',pollSchema,'polls');
