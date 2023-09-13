import { NextResponse } from 'next/server'

// http://localhost:3000/api/todos
const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

export async function GET() {
    const res = await fetch(DATA_SOURCE_URL)

    const todos: Todo[] = await res.json()

    return NextResponse.json(todos)
}