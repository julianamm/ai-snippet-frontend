import { useFetcher, useLoaderData } from '@remix-run/react';
import { json, ActionFunctionArgs } from '@remix-run/node';
import { useState } from 'react';
import { Snippet } from '~/types/snippet';


export async function loader() {
  const res = await fetch('http://localhost:3000/snippets');
  const data = await res.json();
  return json(data);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const text = formData.get('text');

  const res = await fetch('http://localhost:3000/snippets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();
  return json(data);
}

export default function SnippetsPage() {
  const snippets = useLoaderData<Snippet[]>();
  const fetcher = useFetcher();
  const [text, setText] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📄 Snippet Summary Generator</h1>

      <fetcher.Form method="post">
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          style={{ width: '100%', height: '100px' }}
        />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Generate Summary
        </button>
      </fetcher.Form>

      <hr style={{ margin: '2rem 0' }} />

      <h2>📝 Saved Snippets</h2>
      <ul>
        {snippets.map((s) => (
          <li key={s.id} style={{ marginBottom: '1.5rem' }}>
            <p><strong>Text:</strong> {s.text}</p>
            <p><strong>Summary:</strong> {s.summary}</p>
            <small>{new Date(s.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
