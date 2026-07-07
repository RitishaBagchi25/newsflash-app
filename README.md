# NewsFlash 📱

A mobile-first news reading app with AI-generated headlines and summaries.

## Overview

NewsFlash pulls live headlines, rewrites them using AI for clarity and appeal,
and serves them in a clean, swipeable mobile interface — built end-to-end
with an automated content pipeline.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS (built with [Bolt](https://bolt.new))
- **Backend/Database:** Supabase
- **Automation:** Make.com (NewsAPI → Google Gemini AI → Supabase)

## How it works

1. **Fetch** — A scheduled Make.com scenario pulls the latest headlines from NewsAPI.
2. **Enrich** — Each article is passed through Google Gemini AI to generate a
   cleaner `ai_title` and `ai_summary`.
3. **Store** — Results are written to a Supabase table (`News Data Temp`).
4. **Display** — The app reads from Supabase, preferring the AI-generated
   title/summary and falling back to the original when unavailable.

## Features

- 🏠 **Feed** — Hero card + mixed card layout, filterable by category
- 🔍 **Explore** — Full-screen swipeable
