var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
    assignment: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        index: true,
        required: true,
        key: "timeline"
    },
    chat: [{
        surveyor: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            index: true
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            index: true
        },
        title: {
            type: String
        },
        time: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String,
            enum: ["Email", "Normal", "SurveyDone"]
        },
        message: {
            type: String
        },
        email: {
            type: {}
        },
        attachment: {
            type: []
        },
        surveyEndTime: {
            type: Date
        },
        surveyStartTime: {
            type: Date
        },
        surveyDate: {
            type: Date
        },
        address: {
            type: String
        }
    }]
});

schema.plugin(deepPopulate, {
    populate: {
        'chat.employee': {
            select: "name photo func houseColor"
        },
        // 'chat.employee.employee': {
        //     select: ""
        // },
        'chat.employee.func': {
            select: "name"
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Timeline', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "chat.employee  chat.employee.func", "chat.employee"));
var model = {
    getTimeline: function (data, callback) {
        Timeline.findOne({
           assignment:data.assignment
        }).limit(10).lean().exec(function (err, data2) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, data2);
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);