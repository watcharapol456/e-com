import db from '@/db'
import { NextResponse } from 'next/server'


export async function GET() {
  try {
    const data = await db.query.stockInventory.findMany();
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error querying database:', error)
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 })
  }
}
