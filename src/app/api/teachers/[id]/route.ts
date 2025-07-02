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
    const teacher = await db.collection('teachers').findOne({ _id: new ObjectId(params.id) })
    
    if (teacher) {
      return NextResponse.json(serializeDoc(teacher))
    } else {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching teacher:', error)
    return NextResponse.json({ error: 'Failed to fetch teacher' }, { status: 500 })
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
    
    const result = await db.collection('teachers').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: data }
    )
    
    if (result.matchedCount) {
      const teacher = await db.collection('teachers').findOne({ _id: new ObjectId(params.id) })
      return NextResponse.json(serializeDoc(teacher))
    } else {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error updating teacher:', error)
    return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    
    const result = await db.collection('teachers').deleteOne({ _id: new ObjectId(params.id) })
    
    if (result.deletedCount) {
      return NextResponse.json({ message: 'Teacher deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error deleting teacher:', error)
    return NextResponse.json({ error: 'Failed to delete teacher' }, { status: 500 })
  }
}