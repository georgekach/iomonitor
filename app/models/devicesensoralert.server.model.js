'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
require('./devicesensoralarmaction.server.model.js');

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
	lastalarm:{
		type: Date
	},
	alertactions:[mongoose.model('Devicesensoralarmaction').schema],
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
