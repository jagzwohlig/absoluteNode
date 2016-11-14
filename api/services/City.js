var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: "District",
        index: true,
        required: true,
        key: "city"
    },
    company: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Company",
        }],
        index: true,
        restrictedDelete: true
    },
    office: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Office",
        }],
        index: true,
        restrictedDelete: true
    },
    customer: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Customer",
        }],
        index: true,
        restrictedDelete: true
    },
    stdCode: Number,
    timezone: {
        type: Number,
        default: 5.5
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(deepPopulate, {

    populate: {
        'district': {
            select: 'name _id state'
        },
        'district.state': {
            select: 'name _id zone'
        },
        'district.state.zone': {
            select: 'name _id country'
        },
        'district.state.zone.country': {
            select: 'name countryCode _id'
        }
    }

});
module.exports = mongoose.model("City", schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "district.state.zone.country", "district.state.zone.country"));

var model = {
    // getIdByName: function (data, callback) {
    //     var Model = this;
    //     var Const = this(data);
    //     Model.findOne({
    //         name: data.name
    //     }, function (err, data2) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             Const.save(function (err, data3) {
    //                 if (err) {
    //                     callback(err);
    //                 } else {
    //                     callback(null, data3._id);
    //                 }
    //             });
    //         }
    //     });
    // }
};

module.exports = _.assign(module.exports, exports, model);