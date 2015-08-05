'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Devicesensor Schema
 */
var DevicesensorSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Devicesensor name',
		trim: true
	},
	deviceId:{
		type: Schema.Types.ObjectId,
		ref: 'Device'
	},
	sensortype:{
		type: Schema.Types.ObjectId,
		ref: 'Sensortype'
	},
	channel:{
		type: String,
		default:'',
		trim: true
	},
	lastreport:{
		type: Date
	},
	nextcommunication:{
		type: Date
	},
	devicesensoralerts:[{
		type: Schema.Types.ObjectId,
	ref: 'Devicesensoralert'
	}],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Devicesensor', DevicesensorSchema);
