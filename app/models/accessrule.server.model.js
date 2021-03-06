'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Accessrule Schema
 */
var AccessruleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Accessrule name',
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

mongoose.model('Accessrule', AccessruleSchema);