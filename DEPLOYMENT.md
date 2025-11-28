# Deployment Guide for LLM Customer Support Flow Debugger

## Deployment Options

This application can be deployed in several ways depending on your hosting environment:

### 1. Static Deployment (Frontend Only)

If you only need the frontend (using Mock LLM mode):

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. The built files will be in the `frontend/dist` directory
3. Upload the contents of `frontend/dist` to your static hosting provider (Netlify, Vercel, GitHub Pages, etc.)

### 2. Full Deployment (Frontend + Backend)

For the complete application with OpenAI integration:

#### Option A: Deploy to a Node.js Hosting Provider (Heroku, Render, etc.)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Copy the built files to the backend static directory:
   ```bash
   # Create a public directory in backend
   mkdir backend/public
   # Copy frontend build to backend public directory
   cp -r frontend/dist/* backend/public/
   ```

3. Update the backend server.js to serve static files:
   ```javascript
   // Add this line after the existing middleware
   app.use(express.static('public'));
   
   // Update the catch-all route to serve the frontend app
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });
   ```

4. Deploy the backend directory to your hosting provider

#### Option B: Docker Deployment

Create a Dockerfile in the root directory:

```dockerfile
# Multi-stage build
# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ .
COPY --from=build /app/dist ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run the Docker container:
```bash
docker build -t llm-debugger .
docker run -p 3000:3000 -e OPENAI_API_KEY=your_key_here llm-debugger
```

### 3. Environment Variables

For OpenAI integration, you'll need to set the following environment variable:

- `OPENAI_API_KEY`: Your OpenAI API key

### 4. Custom Domain

If you're using a custom domain, you may need to update the proxy settings in `frontend/vite.config.js`:

```javascript
export default {
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://your-domain.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
}
```

## Testing the Deployment

1. After deployment, access your application through the provided URL
2. Test the Mock LLM mode to ensure frontend functionality works
3. If you've configured the OpenAI API key, test the OpenAI mode
4. Verify all sections (Home, How It Works, Demo, About, Contact) are accessible

## Troubleshooting

1. **Blank page**: Check browser console for errors
2. **API calls failing**: Verify backend is running and accessible
3. **CORS issues**: Ensure backend has proper CORS configuration
4. **Environment variables not set**: Check hosting provider's documentation for setting environment variables

## Scaling Considerations

1. For high-traffic applications, consider using a CDN for static assets
2. Implement rate limiting on the backend API
3. Use a process manager like PM2 for Node.js applications
4. Consider using a load balancer for multiple instances