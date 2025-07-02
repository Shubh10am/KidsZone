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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    const student = await db.collection('students').findOne({ _id: new ObjectId(params.id) })
    
    if (student) {
      return NextResponse.json(serializeDoc(student))
    } else {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching student:', error)
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    const body = await request.json()
    
    const data = {
      ...body,
      updatedAt: new Date()
    }
    
    const result = await db.collection('students').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: data }
    )
    
    if (result.matchedCount) {
      const student = await db.collection('students').findOne({ _id: new ObjectId(params.id) })
      return NextResponse.json(serializeDoc(student))
    } else {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    
    // Delete associated invoices first
    await db.collection('invoices').deleteMany({ studentId: params.id })
    
    // Delete student
    const result = await db.collection('students').deleteOne({ _id: new ObjectId(params.id) })
    
    if (result.deletedCount) {
      return NextResponse.json({ message: 'Student deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 })
  }
}