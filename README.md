# Notes App

A React and Express notes application with cookie-based authentication and MongoDB storage.

## Local development

1. Copy `Client/.env.example` to `Client/.env` and `Server/.env.example` to `Server/.env`.
2. Set `MONGO_URI` and a private `JWT_SECRET` in `Server/.env`.
3. Start the API:

   ```bash
   cd Server
   npm install
   npm run dev
   ```

4. Start the frontend in a second terminal:

   ```bash
   cd Client
   npm install
   npm run dev
   ```

## Deployment

- Deploy `Server` as a Node service with `npm start`.
- Deploy `Client` as a static Vite site with `npm run build`; publish the generated `Client/dist` directory.
- Configure the client `VITE_API_ORIGIN` (or `VITE_API_URL`) to the public API origin and the server `CLIENT_URL` to the exact public frontend origin, without a trailing slash. For multiple frontend URLs, use comma-separated `CLIENT_URLS`.
- Set `NODE_ENV=production`, `MONGO_URI`, and a long random `JWT_SECRET` in the API environment.
- Enable SPA fallback to `index.html` on the frontend host so direct navigation to `/login` and `/register` works.
- Verify the API deployment with `GET /health`.

Never commit `.env` files. The repository includes environment templates for local and hosted deployments.
