const admin = require('firebase-admin')

admin.initializeApp()
admin.firestore().settings({ timestampsInSnapshots: true })

const FUNCTION_NAME = process.env.FUNCTION_NAME

// firestore

if (!FUNCTION_NAME || FUNCTION_NAME === 'onDeleteFile') {
  exports.onDeleteFile = require('./lib/firestore/onDeleteFile')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onDeleteImage') {
  exports.onDeleteImage = require('./lib/firestore/onDeleteImage')
}

// https

if (!FUNCTION_NAME || FUNCTION_NAME === 'deleteFile') {
  exports.deleteFile = require('./lib/https/deleteFile')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'getSitemap') {
  exports.getSitemap = require('./lib/https/getSitemap')
}

// storage

if (!FUNCTION_NAME || FUNCTION_NAME === 'onDeleteStorageObject') {
  exports.onDeleteStorageObject = require('./lib/storage/onDeleteStorageObject')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onFinalizeStorageObject') {
  exports.onFinalizeStorageObject = require('./lib/storage/onFinalizeStorageObject')
}
