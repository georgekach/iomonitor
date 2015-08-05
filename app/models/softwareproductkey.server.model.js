'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Softwareproductkey Schema
 */
var SoftwareproductkeySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Softwareproductkey name',
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

mongoose.model('SoftwareProductKey', SoftwareproductkeySchema);
