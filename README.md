# RAG Chat - Next.js Frontend POC

This is a POC to create RAG (Retrieval augmented generation) frontend with [Next.js](https://nextjs.org) that acts as an API proxy for messaging, featuring a chatbox view and dynamic message routes.

## Overview

This project demonstrates:

- Next.js 14 with App Router
- Server/Client component architecture.
- Dynamic routing for individual messages.
- API proxy integration with OpenAPI.
- Message rendering.
- TypeScript, TailwindCSS and Shadcn.

![](https://github.com/olidroide/rag-chat-poc/media/video_example.gif)

## Features

- Chat interface with message input.
- Server-side data fetching using `use server`.
- Client-side message rendering using `use client`.
- Dynamic routes for individual messages at `/message/[id]`.
- API proxy to external messaging service using Free RAG  API https://api.rag.pixegami.io
- Session management for users.

## Setup & Installation

This project uses:

1. Next.JS with TypeScript and Tailwind

```bash
npx create-next-app@latest rag-chat --typescript --tailwind --eslint
```

2. For UI components uses Shadcn

```bash
npx shadcn@latest init
```

3. Generate API client:

```bash
npm install @openapitools/openapi-generator-cli -g
npm install @openapitools/openapi-generator-cli -D
```

requires install JAVA <https://openapi-generator.tech/docs/installation/>

```bash
npm run generate-api-client
```

4. Install dependencies:

```bash
npm install uuid
npm i --save-dev @types/uuid
```

## Key Components

### MessageInput (`components/MessageInput.tsx`)

- Client-side input form component
- Handles message submission
- Redirects to individual message view on send

### Message Page (`message/[id]/page.tsx`)

- Dynamic route for individual messages
- Server-side data fetching
- Displays message content and metadata

### API Client (`getApiClient.ts`)

- OpenAPI generated client configuration
- Handles API requests to messaging service
- Manages base URL and client setup

## Usage

0. If not already generate api client:
```bash
npm run generate-api-client
```

1. Start development server:

```bash
npm run dev
```

2. Open <http://localhost:3000>

3. Enter messages in the chat input or select already one of your previous messages.

4. View individual messages at `/message/[id]`.
