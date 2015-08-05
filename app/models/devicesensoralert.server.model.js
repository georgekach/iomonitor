'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Devicesensoralert Schema
 */
var DevicesensoralertSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Devicesensoralert name',
		trim: true
	},
	devicesensorId:{
		type: Schema.ObjectId,
		ref: 'Devicesensor'
	},
	lastalarm:{
		type: Date
	},
	alarmactions:[{
		type: Schema.Types.ObjectId,
		ref : 'Devicesensoralarmaction'
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

mongoose.model('Devicesensoralert', DevicesensoralertSchema);
