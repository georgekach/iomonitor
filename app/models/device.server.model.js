'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Device Schema
 */
var DeviceSchema = new Schema({
	/*name: {
		type: String,
		default: '',
		required: 'Please fill Device name',
		trim: true
	},*/
	 deviceId: { type: String, unique: false, lowercase: true },
    description: {
		type: String,
		default:'',
		trim: true
		},
		
    location: {
		type: String,
		default:'',
		trim: true
		},
    version: {
		type: String,
		default:'',
		trim: true
		},
    clientId:{type: Schema.Types.ObjectId, ref: 'Client'},
    previousreadingtime: {
		type: String,
		default:'',
		trim: true
		},
    latestreadingtime : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingchannels : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate1 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue1 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate2 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue2 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate3 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue3 :{
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate4 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue4 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinggps : {
		type: String,
		default:'',
		trim: true
		},
		
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Device', DeviceSchema);