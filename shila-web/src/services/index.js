const PouchDB = require('pouchdb')
const db = new PouchDB('http://127.0.0.1:5984/shila')
const uuid = require('uuid')
import { pluck, uniq, filter, assoc, prop, add, reduce } from 'ramda'


module.exports = {
  createSession,
  createPractice,
  getAllSessions
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
     const sessions = filter(({type}) => type === 'session',docs)
     console.log('sessions',sessions)
     const obj = reduce((acc,val) => {
      const amount = acc[val.name] || 0
      console.log('amount',amount)
      const obj = assoc(prop('name',val),add(amount,val.amount),acc)
      
      return obj
     },{},sessions)
     console.log('obbjj',obj)
     return obj
  })
}

