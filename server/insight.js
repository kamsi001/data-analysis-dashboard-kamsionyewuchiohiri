import express from 'express';
import cors from 'cors';
import { streamText } from 'ai'; // 👈 Using streamText for conversation
import { openai } from '@ai-sdk/openai';

const app = express();
app.use(cors());
app.use(express.json());

// 💡 Conversation History State (Extra Challenge)
let chatHistory = []; 

// 🎯 Insight Endpoint (Existing)
app.post('/insight', async (req, res) => {
    // ... (Existing insight logic remains here)
});

// 🎯 New Conversational Endpoint: /api/messages
app.post('/api/messages', async (req, res) => {
    try {
        const { text } = req.body;
        
        // 1. Add the new user message to history
        chatHistory.push({ role: 'user', content: text });
        
        // 2. Generate the AI response using the full history as context
        const result = await streamText({
            model: openai('gpt-4o-mini'),
            messages: chatHistory, // Send the entire chat history
        });

        // Collect the streamed text
        let fullResponse = '';
        for await (const delta of result.fullStream) {
            fullResponse += delta.text;
        }

        // 3. Add the AI response to history
        chatHistory.push({ role: 'assistant', content: fullResponse });

        // 4. Return the AI response
        res.json({ text: fullResponse }); 
        
    } catch (error) {
        console.error("AI Chat Error:", error);
        // Reset history on a critical failure
        chatHistory = []; 
        res.status(500).json({ error: 'AI conversational call failed' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`AI chat server listening on port ${PORT}`);
});