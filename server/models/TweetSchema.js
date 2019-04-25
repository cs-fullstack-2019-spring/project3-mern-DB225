var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TweetSchema = new Schema({
    username:String,
    password:String,
    image: String,
    background_image:String,
    tweet:[{
        title:String,
        inputText: String,
        image:String,
        date: {type:Date, default:Date.now}
    }]
});

module.exports = mongoose.model("tweet", TweetSchema);