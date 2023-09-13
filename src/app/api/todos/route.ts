import { NextResponse } from 'next/server'

// http://localhost:3000/api/todos
const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos'

const API_KEY: string = process.env.DATA_API_KEY as string

// GET route handler
export async function GET() {
  const res = await fetch(DATA_SOURCE_URL)

  const todos: Todo[] = await res.json()

  return NextResponse.json(todos)
}

// POST route handler
export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json()

  if (!userId || !title) return NextResponse.json({ message: 'Missing required data' })

  const res = await fetch(DATA_SOURCE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({ userId, title, completed: false }),
  })

  const newTodo: Todo = await res.json()

  return NextResponse.json(newTodo)
}

// DELETE route handler
export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json()

  if (!id) return NextResponse.json({ message: 'Todo id required' })

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
  })

  return NextResponse.json({ message: `Todo ${id} deleted` })
}
