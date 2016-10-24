var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        index: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    assignment: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Assignment",
        }],
        index: true,
        restrictedDelete: true
    },
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(deepPopulate, {
    populate: {
        'category': {
            select: 'name _id industry'
        },
        'category.industry': {
            select: 'name _id'
        }
    }
});
module.exports = mongoose.model('Product', schema);


var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "category.industry", "category.industry"));

var model = {
      getIdByName : function(data,callback) {
        var Model = this;
        var Const = this(data);
        Model.findOne({name:data.name},function(err,data2) {
            if(err) {
                callback(err);
            } else if(_.isEmpty(data2)) {
                Const.save(function(err,data3) {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null,data3._id);
                    }
                });
            } else {
                callback(null,data2._id);
            }
        });
    }
};

module.exports = _.assign(module.exports, exports, model);
