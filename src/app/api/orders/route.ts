import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "[ORDERS_STUB]" }, { status: 200 })
}
