# Deploy to GitHub - Step by Step Guide

## Prerequisites

1. Git installed on your computer
2. A GitHub account
3. This repository on your local machine (already done)

## Steps to Deploy

### Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Name your repository exactly: `llmtesting`
3. Make sure it's Public (not Private)
4. **Important**: Leave all checkboxes UNCHECKED (no README, no .gitignore, no license)
5. Click "Create repository"

### Step 2: Add Remote Origin and Push

Copy and paste these commands in your terminal (make sure you're in the project directory):

```bash
git remote add origin https://github.com/Mohansaina/llmtesting.git
git branch -M main
git push -u origin main
```

### Step 3: Verify Deployment

1. Go to https://github.com/Mohansaina/llmtesting
2. You should see all your files there

### Step 4: Enable GitHub Pages (Optional - for website hosting)

1. On your GitHub repository page, click "Settings" tab
2. In the left sidebar, click "Pages"
3. Under "Source", select "GitHub Actions"
4. Click "Save"
5. GitHub will automatically deploy your site

After a few minutes, your website will be available at:
https://Mohansaina.github.io/llmtesting

## Alternative Deployment Options

### Deploy to Heroku (Full Application with Backend)

1. Sign up at https://heroku.com
2. Install Heroku CLI
3. In your terminal:
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

### Deploy to Render (Full Application with Backend)

1. Sign up at https://render.com
2. Connect your GitHub account
3. Click "New +" and select "Web Service"
4. Connect to your `llmtesting` repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Click "Create Web Service"

## Environment Variables (For OpenAI Integration)

If you want to enable the OpenAI mode:

1. Get an API key from https://platform.openai.com/
2. Add it as an environment variable in your hosting platform:
   - Variable name: `OPENAI_API_KEY`
   - Value: Your actual API key

## Troubleshooting

### If you get "remote origin already exists" error:

```bash
git remote remove origin
git remote add origin https://github.com/Mohansaina/llmtesting.git
git push -u origin main
```

### If you get "Permission denied" error:

1. Make sure you're logged into GitHub
2. Use your GitHub username and personal access token instead of password
3. Or use SSH instead of HTTPS (advanced)

## Need Help?

If you encounter any issues during deployment, feel free to ask for help. The community is always willing to assist with deployment questions.