# My AI Assistant (Frontend)

A React + TailwindCSS frontend for Rahul Kolhe's AI Portfolio Assistant.

## Features

- Chat with AI assistant about Rahul's skills, projects, and experience
- Blog section with markdown rendering and code highlighting
- Job Match Analyzer: upload/paste job descriptions and get skill match analysis
- Responsive, modern UI with branding and skill chips

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Build for production:
   ```sh
   npm run build
   ```

## Project Structure

- `src/` – React components (ProfileCard, BlogList, BlogPost, JobMatch, etc.)
- `public/content/blogs/` – Blog markdown files
- `src/config.js` – API base URL configuration
- `tailwind.config.js` – TailwindCSS setup

## API Integration

- Expects backend at `/api/ask` (see [api-assistant](../api-assistant/README.md))
- Configure API endpoint in `src/config.js`

## Deployment

- Supports Netlify and static hosting
- See `netlify.toml` for Netlify configuration