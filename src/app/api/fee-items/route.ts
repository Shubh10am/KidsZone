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
    const feeItems = await db.collection('fee_items').find({}).toArray()
    
    return NextResponse.json(serializeDocs(feeItems))
  } catch (error) {
    console.error('Error fetching fee items:', error)
    return NextResponse.json({ error: 'Failed to fetch fee items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    const body = await request.json()
    
    const feeItemData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('fee_items').insertOne(feeItemData)
    feeItemData.id = result.insertedId.toString()
    delete feeItemData._id
    
    return NextResponse.json(feeItemData, { status: 201 })
  } catch (error) {
    console.error('Error creating fee item:', error)
    return NextResponse.json({ error: 'Failed to create fee item' }, { status: 500 })
  }
}