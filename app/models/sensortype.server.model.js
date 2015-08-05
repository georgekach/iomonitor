'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sensortype Schema
 */
var SensortypeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Sensortype name',
		trim: true
	},
	measuredparameter:{
		type: String,
		default:'',
		trim: true
	},
	description:{
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

mongoose.model('Sensortype', SensortypeSchema);
