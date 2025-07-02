import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const MONGO_URI = "mongodb+srv://shubham12342019:mwIwfoB7ZQBFFXdx@cluster0.3edzqll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!client) {
  client = new MongoClient(MONGO_URI)
  clientPromise = client.connect()
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('kids_zone_academy')
    
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
    
    const nextRollNumber = `${yearPrefix}${nextNumber.toString().padStart(3, '0')}`
    
    return NextResponse.json({ rollNumber: nextRollNumber })
  } catch (error) {
    console.error('Error generating roll number:', error)
    return NextResponse.json({ error: 'Failed to generate roll number' }, { status: 500 })
  }
}