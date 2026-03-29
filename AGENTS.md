<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Project Overview
This project is a college resource hub for students to share and discover books, assignments, and PYQs. 
The core philosophy is to keep hosting and database costs at $0 by using Google Drive for file storage and Supabase for metadata and authentication.

# Tech Stack
- Framework: Next.js (App Router only)
- Styling: Tailwind CSS
- Database & Auth: Supabase
- Deployment: Vercel
- Language: JavaScript (No TypeScript)

# AI Coding Rules & Guidelines

## 1. Next.js App Router (CRITICAL)
- STRICTLY use the Next.js App Router (`src/app` directory). 
- NEVER use the old `pages/` directory routing.
- Default to React Server Components (RSC). 
- Only add the `"use client"` directive at the very top of the file if the component specifically requires browser APIs, interactivity (onClick), or React hooks (useState, useEffect).

## 2. Styling (Tailwind CSS)
- STRICTLY use Tailwind CSS utility classes for all styling.
- Do NOT write custom CSS or use inline `<style>` tags unless absolutely necessary for dynamic calculations.
- Ensure all UI components are fully responsive (mobile-first approach).

## 3. Database & Supabase
- Always use the official `@supabase/supabase-js` client.
- When querying data (like fetching posts), implement ordering logic at the database level (e.g., `.order('likes', { ascending: false })`) rather than sorting in JavaScript.
- Assume three user roles exist: `admin`, `verified_student`, and `guest`.

## 4. Code Quality & Formatting
- Write clean, modular, and DRY (Don't Repeat Yourself) code.
- Extract reusable UI elements (like the Post Card) into a `src/components/` folder.
- Always include basic error handling (try/catch blocks) when making database requests.