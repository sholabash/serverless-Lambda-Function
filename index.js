'use strict'

const AWS = require('aws-sdk')
const uuid = require('uuid')

const docCLient = new AWS.DynamoDB.DocumentClient()
const groupsTable = process.env.GROUPS_TABLE

exports.handler = async (event) =>{

  console.log('Processing event: ', event)

  const itemId = uuid.v4()
  let parsedBody =null
  try{
    parsedBody = JSON.parse(event.body)
  }catch(e){
    parsedBody = event.body
  }
 

  const newItem = {
    id: itemId,
    ...parsedBody
  }

  await docCLient.put({
    TableName: groupsTable,
    Item: newItem
  }).promise()

  return{
    statuCode:201,
    headers:{
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem
    })
  }

}