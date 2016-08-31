var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {
        type: String,
        required: true,
        // unique: true,
        // uniqueCaseInsensitive: true
    },
    lastName: {
        type: String,
        required: true,
        // unique: true,
        // uniqueCaseInsensitive: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        key: "employee"
    },
    salutation: {
        type: String
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
        key: "employee"
    },
    func: {
        type: Schema.Types.ObjectId,
        ref: "Func",
        required: true,
        key: "employee"
    },
    postedAt: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        required: true,
        key: "employee"
    },
    grade: {
        type: Schema.Types.ObjectId,
        ref: "Grade",
        required: true,
        key: "employee"
    },
    houseColor: {
        type: String
    },
    employeeCode: {
        type: String
    },
    photo: {
        type: String
    },
    CTCDetails: [{
        CTCAmount: {
            type: String
        },
        CTCFrom: {
            type: Date
        },
        CTCTo: {
            type: Date
        }
    }],
    bank: {
        type: String
    },
    accountNumber: {
        type: String
    },
    branchName: {
        type: String
    },
    neftCode: {
        type: String
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true
    },
    address: String,
    pincode: String,
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    officeNumber: {
        type: Number
    },
    officeMobile: {
        type: Number
    },
    officeEmail: {
        type: String
    },
    homeNumber: {
        type: Number
    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    extension: {
        type: Number
    },
    birthDate: {
        type: Date
    },
    marriageDate: {
        type: Date
    },
    joiningDate: {
        type: Date
    },
    leavingDate: {
        type: Date
    },
    isSBC: {
        type: Boolean
    },
    isField: {
        type: Boolean
    },
    isSurveyor: {
        type: Boolean
    },
    validUpto: {
        type: String
    },
    licence: {
        type: String
    },
    iiislaDocument: {
        type: String
    },
    personalDocument: [{
      name: {
        type: String
      },
      image: {
        type: String
      }
    }],
    licenseNumber: {
      type: String
    },
    licenseDocument: [{
      image: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      }
    }],
    IIISLACertificate: [{
      image: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      }
    }],
    IIISLAReciept: [{
      image: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      }
    }],
});

schema.plugin(deepPopulate, {
  populate: {
      'city': {
          select: 'name _id district'
      },
      'city.district': {
          select: 'name _id state'
      },
      'city.district.state': {
          select: 'name _id zone'
      },
      'city.district.state.zone': {
          select: 'name _id country'
      },
      'city.district.state.zone.country': {
          select: 'name _id'
      },
      'func': {
          select: 'name _id'
      },
      'grade': {
          select: 'name _id'
      },
      'postedAt': {
          select: 'name _id'
      },
  }
});
// schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"city.district.state.zone.country func grade","city.district.state.zone.country  func grade postedAt"));
var model = {};
module.exports = _.assign(module.exports, exports, model);
