'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vendor Schema
 */
var VendorSchema = new Schema({
	/*name: {
		type: String,
		default: '',
		required: 'Please fill Vendor name',
		trim: true
	},*/
	vendorname: { type: String, unique: false, lowercase: true },
    notes: {
		type: String,
		default:'',
		trim: true
		},
    companyname: {
		type: String,
		default:'',
		trim: true
		},
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
    billingaddress:{
		type: String,
		default:'',
		trim: true
		},
    billingemail: {
		type: String,
		default:'',
		trim: true
		},
	clients:[{
		type:Schema.Types.ObjectId,
		ref: 'Clients'
	}

	],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Vendor', VendorSchema);
