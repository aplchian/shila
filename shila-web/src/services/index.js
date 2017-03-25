const PouchDB = require('pouchdb')
const db = new PouchDB('shila')
const uuid = require('uuid')


module.exports = {
  createPractice,
  getAllPractices
}


function createPractice(doc){
  return db.put(doc)
}

function getAllPractices(){
  return db.allDocs({
    startkey: 'practice_',
    endkey: 'practice_\uffff',
    include_docs: true
  })
}