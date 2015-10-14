'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Notification Schema
 */
var NotificationSchema = new Schema({
    notificationtype: {
        type: String,
        default: '',
        trim: true,
        enum: ['device', 'system', 'license']
    },
    timeofoccurance: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        default: '',
        required: 'Please fill Notification name',
        trim: true
    },
    action: {
        type: String,
        default: '',
        trim: true,
        enum: ['email', 'text', 'phone', 'alert']
    },
    actionaddress: {
        type: String,
        default: '',
        trim: true
    },

    processed: {
        type: Boolean,
        default: false

    },
    haserrors: {
        type: Boolean,
        default: false

    },
    errormessages: {
        type: String,
        default: '',
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

mongoose.model('Notification', NotificationSchema);
