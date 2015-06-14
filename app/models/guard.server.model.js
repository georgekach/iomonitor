'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Guard Schema
 */
var GuardSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Guard name',
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

mongoose.model('Guard', GuardSchema);