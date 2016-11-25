var schema = new Schema({
    name: String,
    tag:{
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    },
    document:String
});

schema.plugin(deepPopulate, {
    populate:{
        'tag':{
            select:'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('KnowledgeBase', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'tag','tag'));
var model = {

            getType: function(data, callback) {
    KnowledgeBase.find({
      tag: data.type
    }).populate('tag','name _id').exec(function(err, found) {
      if (err) {
        callback(err, null);
      } else {
          callback(null, found);
        } 
    })
  }
};
module.exports = _.assign(module.exports, exports, model);
