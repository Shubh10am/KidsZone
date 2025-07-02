import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const MONGO_URI = "mongodb+srv://shubham12342019:mwIwfoB7ZQBFFXdx@cluster0.3edzqll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!client) {
  client = new MongoClient(MONGO_URI)
  clientPromise = client.connect()
}

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    
    // Check if fee items already exist
    const feeItemsCount = await db.collection('fee_items').countDocuments({})
    if (feeItemsCount === 0) {
      const defaultFeeItems = [
        {
          name: 'Tuition Fee',
          amount: 500,
          type: 'monthly',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Transportation',
          amount: 150,
          type: 'monthly',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Activity Fee',
          amount: 100,
          type: 'monthly',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Admission Fee',
          amount: 1000,
          type: 'one-time',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      await db.collection('fee_items').insertMany(defaultFeeItems)
    }

    // Initialize academy data if it doesn't exist
    const academyDataCount = await db.collection('academy_data').countDocuments({})
    if (academyDataCount === 0) {
      const defaultAcademyData = {
        name: "Kid's Zone Academy",
        address: "123 Education Street, Learning City, LC 12345",
        phone: "+1 (555) 123-4567",
        email: "info@kidszoneacademy.com",
        website: "www.kidszoneacademy.com",
        principal: "Dr. Sarah Johnson",
        establishedYear: 2010,
        motto: "Learning Through Play",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await db.collection('academy_data').insertOne(defaultAcademyData)
    }
    
    return NextResponse.json({ message: 'Data initialized successfully' })
  } catch (error) {
    console.error('Error initializing data:', error)
    return NextResponse.json({ error: 'Failed to initialize data' }, { status: 500 })
  }
}