'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Softwareproduct Schema
 */
var SoftwareproductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Softwareproduct name',
		trim: true
	},

	description: {
		type: String,
		default: '',
		required: 'Please fill Softwareproduct description',
		trim: true
	},
	triallength: {
		type: Number,
		default: 1,

	},
	versions: [{type: Schema.Types.ObjectId, ref: 'SoftwareProductVersion'}],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('SoftwareProduct', SoftwareproductSchema);
