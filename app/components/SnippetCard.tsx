import { Snippet } from "~/types/snippet";
import { formatDistanceToNow } from "date-fns";

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const createdDate = new Date(snippet.createdAt);
  const relativeTime = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <li className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 hover:shadow-md transition">
      <h3 className="text-slate-800 font-semibold text-lg mb-2">Summary</h3>
      <p className="text-slate-900 mb-4">{snippet.summary}</p>

      <h4 className="text-slate-800 font-medium">Original Text</h4>
      <p className="text-slate-700 mb-4 text-sm whitespace-pre-wrap">{snippet.text}</p>

      <p className="text-xs text-slate-500">
        {relativeTime}
      </p>
    </li>
  );
}
