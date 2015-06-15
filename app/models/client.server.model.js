'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Client name',
		trim: true
	},
	
	email: { type: String, unique: false, lowercase: true },
    fname: {
		type: String,
		default:'',
		trim: true
		},
    sname: {
		type: String,
		default:'',
		trim: true
		},
    cellnumber: {
		type: String,
		default:'',
		trim: true
		},
    devices: [{type: Schema.Types.ObjectId, ref: 'Device'}],
    profile: {
        name: { type: String, default: '' },
        location: { type: String, default: '' },
        website: { type: String, default: '' },
        logo: { type: String, default: '' }
    },
    billingfrequency: Number,
    address: {
		type: String,
		default:'',
		trim: true
		},
    billingaddress: {
		type: String,
		default:'',
		trim: true
		},
    billingemail:{
		type: String,
		default:'',
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

mongoose.model('Client', ClientSchema);