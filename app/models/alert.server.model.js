'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Alert Schema
 */
var AlertSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Alert name',
		trim: true
	},
	message: {
		type: String,
		default: '',
		required: 'Please fill Alert message',
		trim: true
	},
	dateofoccurence: {
		type: String,
		default: '',
		required: 'Please fill Alert date of occurence',
		trim: true
	},
	alerttype:{
		type:String,
		default:'',
		enum:['system','device','notification']
	},
	alertstatus:{
		type: String
	},
	lastalerm:{
		type: Date
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

mongoose.model('Alert', AlertSchema);
