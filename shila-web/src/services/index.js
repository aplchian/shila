const PouchDB = require('pouchdb')
const db = new PouchDB('http://127.0.0.1:5984/shila')
const uuid = require('uuid')
import { pluck, uniq, filter, assoc, prop, add, reduce } from 'ramda'


module.exports = {
  createSession,
  createPractice,
  getAllSessions,
  getAllPractices,
  getDoc
}

function getDoc(id){
  return db.get(id)
}

function createSession(doc){
  return db.put(doc)
}

function createPractice(doc){
  return db.put(doc)
}

function getAllSessions(){
  return db.allDocs({
    include_docs: true
  }).then(({ rows }) => {
     const docs = pluck('doc',rows)
     console.log('rows')
     const sessions = filter(({type}) => type === 'session',docs)
     const obj = reduce((acc,val) => {
      const amount = acc[val.name] || 0
      const obj = assoc(prop('name',val),add(amount,val.amount),acc)
      return obj
     },{},sessions)

     return obj
  })
}

function getAllPractices(){
  return db.allDocs({
    include_docs: true,
    startkey: 'practice',
    endkey: 'practice\uffff'
  }).then(({rows}) => {
    return pluck('doc',rows)
  })
}

