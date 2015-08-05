'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Softwareproductversion Schema
 */
var SoftwareproductversionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Version name',
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

mongoose.model('SoftwareProductVersion', SoftwareproductversionSchema);
