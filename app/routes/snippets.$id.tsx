import { json } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Snippet } from "~/types/snippet";

function getTokenFromCookies(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie')
  return cookieHeader?.split('; ').find((c) => c.startsWith('token='))?.split('=')[1] || null
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { id } = params
  if (!id) {
    throw new Response('Not Found', { status: 404 })
  }

  const token = getTokenFromCookies(request)
  if (!token) {
    return redirect('/login')
  }

  const res = await fetch(`http://localhost:3000/snippets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Response('Snippet not found', { status: 404 })
  }

  const data = await res.json()
  return json(data as Snippet)
}


export default function SnippetDetail() {
  const snippet = useLoaderData<Snippet>();

  return (
    <main className="bg-emerald-50 min-h-screen p-8 font-sans">
      <Link
        to="/"
        className="inline-block text-emerald-700 hover:underline text-sm"
      >
        ← Back to Home
      </Link>

      <div className="max-w-2xl mx-auto bg-white p-8 mt-2 border border-slate-100 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-emerald-800">Snippet Detail</h1>
        <h2 className="text-xl font-semibold mb-2 text-slate-800">Summary</h2>
        <p className="mb-4">{snippet.summary}</p>
        <h2 className="text-xl font-semibold mb-2 text-slate-800">Original Text</h2>
        <p className="mb-4">{snippet.text}</p>
      </div>
    </main>
  );
}
