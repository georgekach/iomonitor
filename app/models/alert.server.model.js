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

	message: {
		type: String,
		default: '',
		required: 'Please fill Alert message',
		trim: true
	},
	dateofoccurence: {
		type: Date,
		default: Date.now(),
		required: 'Please fill Alert date of occurance',
		trim: true
	},
	alerttype:{
		type:String,
		default:'',
		enum:['system','device','license']
	},
	alertstatus:{
		type: String,
		enum: ['active','inprogress','resolved']
	},
	belongsto:{
		type: Schema.ObjectId,
		ref: 'User'
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
