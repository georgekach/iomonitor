'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 require('./devicesensor.server.model.js');
var deepPopulate = require('mongoose-deep-populate')(mongoose);




/**
 * Device Schema
 */
var DeviceSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Device name',
		trim: true
	},
	 deviceId: { type: String, unique: false, lowercase: true },
    description: {
		type: String,
		default:'',
		trim: true
		},
		
    location: {
		lon:{
			type: Number,
			default: 0
		},
		lat:{
			type: Number,
			default: 0
		}
		},
    version: {
		type: String,
		default:'',
		trim: true
		},
    clientId:{type: Schema.Types.ObjectId, ref: 'Client'},
	//devicesensors:[{ type: Schema.Types.ObjectId, ref: 'Devicesensor'}],
	sensors:[mongoose.model('Devicesensor').schema],
	simnumber:{
		type: String,
		default:'',
		trim: true
	},
	interval:{
	 type: Number,
		default: 10
	},
	publicurl:{
		type: String,
		default: '',
		trim: true
	},
	timezone:{
		type: String,
		default:''
	},
    previousreadingtime: {
		type: String,
		default:'',
		trim: true
		},
    latestreadingtime : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingchannels : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate1 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue1 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate2 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue2 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate3 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue3 :{
		type: String,
		default:'',
		trim: true
		},
    latestreadingstate4 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinglastValue4 : {
		type: String,
		default:'',
		trim: true
		},
    latestreadinggps : {
		type: String,
		default:'',
		trim: true
		},
		
	created: {
		type: Date,
		default: Date.now
	},
	status:{
		type: String,
		default:'-',
		enum: ['-','online','offline']
	},
	signal:{
		type: String,
		default:'',
	},
	batterystatus:{
		type: String,
		default:'0%'

	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

DeviceSchema.plugin(deepPopulate);

mongoose.model('Device', DeviceSchema);
