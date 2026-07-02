# Lasni & Kavindu Wedding Invitation Website

A Vercel-ready wedding invitation website inspired by the uploaded printed invitation card.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173/
```

## Guest name personalization

Use a URL parameter:

```text
http://localhost:5173/?guest=Ms%20Lasni
```

Example after deployment:

```text
https://your-site-name.vercel.app/?guest=Mr%20and%20Mrs%20Perera
```

## Edit wedding details

Open:

```text
src/main.jsx
```

Change the `wedding` object near the top of the file.

## Deploy to Vercel

1. Upload this folder to a new GitHub repository.
2. Go to Vercel.
3. Import the GitHub repository.
4. Framework preset: Vite.
5. Build command: `npm run build`.
6. Output directory: `dist`.
