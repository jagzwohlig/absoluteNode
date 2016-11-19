var schema = new Schema({
    name: String,
    department:{
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    document:String
});

schema.plugin(deepPopulate, {
    populate:{
        'department':{
            select:'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('KnowledgeBase', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'department','department'));
var model = {};
module.exports = _.assign(module.exports, exports, model);
