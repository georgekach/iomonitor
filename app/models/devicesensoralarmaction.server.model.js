'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Devicesensoralarmaction Schema
 * This stores what actions can be followed in case of an alarm.
 * If it is cleared a notofication can be sent
 *
 * Actio types can be Email, Sms Or phone
 */
var DevicesensoralarmactionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Devicesensoralarmaction name',
		trim: true
	},
	actiontype:{
		type: String,
		trim: true,
		enum:['email','text','phone','alert']
	},
	userid:{
		type:Schema.ObjectId,
		ref:'User'
	},
	thresholdvaluemin:{
		type: Number
	},
	thresholdvaluemax:{
		type: Number
	},
	sendonclear:{/* this is for sending notifications or not when the alert has been claered*/
		type: Boolean,
		default: false
	},
	usertonotify:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	userstonotify:[{
		type: Schema.ObjectId,
		ref: 'User'
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

mongoose.model('Devicesensoralarmaction', DevicesensoralarmactionSchema);
