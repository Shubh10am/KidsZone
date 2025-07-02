import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'

const MONGO_URI = "mongodb+srv://shubham12342019:mwIwfoB7ZQBFFXdx@cluster0.3edzqll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!client) {
  client = new MongoClient(MONGO_URI)
  clientPromise = client.connect()
}

function serializeDoc(doc: any) {
  if (doc) {
    doc.id = doc._id.toString()
    delete doc._id
  }
  return doc
}

function serializeDocs(docs: any[]) {
  return docs.map(doc => serializeDoc(doc))
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    const students = await db.collection('students').find({}).toArray()
    
    return NextResponse.json(serializeDocs(students))
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    const body = await request.json()
    
    // Generate roll number
    const currentYear = new Date().getFullYear()
    const yearPrefix = currentYear.toString()
    
    const students = await db.collection('students').find(
      { rollNumber: { $regex: `^${yearPrefix}` } },
      { projection: { rollNumber: 1 } }
    ).sort({ rollNumber: -1 }).limit(1).toArray()
    
    let nextNumber
    if (students.length > 0) {
      const lastRoll = students[0].rollNumber
      const lastNumber = parseInt(lastRoll.substring(4))
      nextNumber = lastNumber + 1
    } else {
      nextNumber = 1
    }
    
    const rollNumber = `${yearPrefix}${nextNumber.toString().padStart(3, '0')}`
    
    const studentData = {
      ...body,
      rollNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('students').insertOne(studentData)
    studentData.id = result.insertedId.toString()
    delete studentData._id
    
    return NextResponse.json(studentData, { status: 201 })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 })
  }
}