import { Snippet } from "~/types/snippet";
import { SnippetCard } from "./SnippetCard";

interface SnippetListProps {
  snippets: Snippet[];
}

export function SnippetList({ snippets }: SnippetListProps) {
  const reversedSnippets = [...snippets].reverse();

  return (
    <ul className="space-y-6">
      {reversedSnippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </ul>
  );
}
