const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// OpenAI API route
app.post('/api/llm-test', async (req, res) => {
  try {
    const { question, expectedAnswer, mustIncludeKeywords } = req.body;
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: 'OpenAI mode is not configured. Please use Mock mode.'
      });
    }
    
    // Uncomment the following code and install the openai package to use the real OpenAI API
    // const { Configuration, OpenAIApi } = require('openai');
    // const configuration = new Configuration({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
    // const openai = new OpenAIApi(configuration);
    // 
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are a customer support agent. Answer clearly and concisely based only on company policy. If you are unsure, say you are unsure."
    //     },
    //     {
    //       role: "user",
    //       content: question
    //     }
    //   ],
    //   temperature: 0.3,
    // });
    // 
    // const llmAnswer = response.data.choices[0].message.content;
    
    // Mock response for demonstration
    const llmAnswer = `This is a simulated response to your question: "${question}". As a customer support agent, I can confirm that we handle these inquiries according to our company policy. Our standard procedure ensures that all ${question.split(' ')[0] || 'customer'} concerns are resolved within 24-48 hours. If you have any further questions, please don't hesitate to ask.`;
    
    res.json({ answer: llmAnswer });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve frontend static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});