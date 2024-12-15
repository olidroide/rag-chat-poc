"use client";

import { ConversationSelector } from "./components/ConversationSelector";
import { MessageInput } from "./components/MessageInput";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">RAG Chat Integration</h1>
          <div className="space-y-4">
            <ConversationSelector />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <MessageInput />
      </footer>
    </div>
  );
}
