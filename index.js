const admin = require('firebase-admin')
const { config } = require('firebase-functions')

admin.initializeApp()

const { projectId } = JSON.parse(process.env.FIREBASE_CONFIG)

const FUNCTION_NAME = process.env.FUNCTION_NAME

process.env['SECRET'] = config().prisma.secret

if (!FUNCTION_NAME || FUNCTION_NAME === 'deleteFile') {
  exports.deleteFile = require('./lib/deleteFile')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'getSitemap') {
  exports.getSitemap = require('./lib/getSitemap')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'getTwitterUser') {
  exports.getTwitterUser = require('./lib/getTwitterUser')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'graphql') {
  exports.graphql = require('./lib/graphql')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onDeleteFile') {
  exports.onDeleteFile = require('./lib/onDeleteFile')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onDeleteImage') {
  exports.onDeleteImage = require('./lib/onDeleteImage')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onDeleteStorageObject') {
  exports.onDeleteStorageObject = require('./lib/onDeleteStorageObject')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onFinalizeStorageObject') {
  exports.onFinalizeStorageObject = require('./lib/onFinalizeStorageObject')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onPublishPrisma') {
  exports.onPublishPrisma = require('./lib/onPublishPrisma')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'onPublishPing') {
  exports.onPublishPing = require('./lib/onPublishPing')
}

if (!FUNCTION_NAME || FUNCTION_NAME === 'searchTweets') {
  exports.searchTweets = require('./lib/searchTweets')
}
