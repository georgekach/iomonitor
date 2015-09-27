'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
require('./devicesensoralert.server.model.js');

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
	sensoralerts:[mongoose.model('Devicesensoralert').schema],
	/*
	 devicesensoralerts:[{
	 type: Schema.Types.ObjectId,
	 ref: 'Devicesensoralert'
	 }],*/
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
