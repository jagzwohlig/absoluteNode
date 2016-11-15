var schema = new Schema({
    name: String,
    fromDate:Date,
    reason:String,
    days:Number,
    status:{
        type:String,
        Enum:["Approved","Pending","Rejected","Partially Approved"]
    },
    approvedFrom:Date,
    approvedTo:Date
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('LeaveManagement', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
