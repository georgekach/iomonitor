'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Employee name',
		trim: true
	},
	surname: {
		type: String,
		default:'',
		required: 'Please fill in a surname',
		trim: true
	},
	dob: {
		type: Date,
		default: Date.now
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

mongoose.model('Employee', EmployeeSchema);