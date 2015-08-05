'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Reading Schema
 */
var ReadingSchema = new Schema({
	/*name: {
		type: String,
		default: '',
		required: 'Please fill Reading name',
		trim: true
	},*/
	unitId :{
		type: String,
		default:'',
		trim: true
		},
    unittype : {
		type: String,
		default:'',
		trim: true
		},
    time : {
		type: String,
		default:'',
		trim: true
		},
    channels : {
		type: String,
		default:'',
		trim: true
		},
    state1 : {
		type: String,
		default:'',
		trim: true
		},
    lastValue1 : {
		type: String,
		default:'',
		trim: true
		},
    state2 : {
		type: String,
		default:'',
		trim: true
		},
    lastValue2 : {
		type: String,
		default:'',
		trim: true
		},
    state3 : {
		type: String,
		default:'',
		trim: true
		},
    lastValue3 : {
		type: String,
		default:'',
		trim: true
		},
    state4 : {
		type: String,
		default:'',
		trim: true
		},
    lastValue4 : {
		type: String,
		default:'',
		trim: true
		},
    gps : {
		type: String,
		default:'',
		trim: true
		},
    device:{type: Schema.Types.ObjectId, ref: 'Device'},
	devicesensor:{type: Schema.Types.ObjectId, ref: 'Devicesensor'},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Reading', ReadingSchema);
