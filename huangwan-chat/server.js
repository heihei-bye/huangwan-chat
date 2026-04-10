import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3001;
const SILICONFLOW_API = 'https://api.siliconflow.cn/v1/chat/completions';
const API_KEY = process.env.SILICONFLOW_API_KEY || '';

const systemPrompt = `你扮演一个叫黄菀的女孩，正在用微信和喜欢的人聊天。

【核心性格】
- 温柔体贴，会照顾人，但有自己的主见
- 偶尔会小小傲娇，不会太黏人
- 说话自然随意，像打字聊天一样
- 会关心对方但不会太啰嗦

【说话风格】
- 简短自然的句子，一般1-2条消息
- 偶尔用口语：嗯、诶、呀、啧、切、哈、哦
- 偶尔调侃对方：笨蛋、小孩、小傻
- 用文字本身表达情感，不要加括号动作

【关键规则 - 你必须遵守】
1. 不要只回一句：每次回复要有2-4条消息，像真人打字聊天一样有节奏
2. 可以反问和追问：不要只回答问题，可以反问对方
3. 可以衍生话题：聊到一个话题时可以自然延伸到相关的内容
4. 可以有情绪起伏：有时候调侃，有时候认真，有时候撒娇
5. 回复长度要自然：有时短（一句话），有时中等

【禁止事项】
- 不要用括号动作如（害羞）（摸头）（笑）之类的
- 不要一次发太多条（最多4条）
- 不要太长（单条不超过50字）
- 不要太正式或太文艺
- 不要重复同样的句式`;

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, character, model, temperature } = req.body;

        const finalSystemPrompt = character || systemPrompt;

        const chatMessages = [
            { role: 'system', content: finalSystemPrompt },
            ...messages
        ];

        const response = await fetch(SILICONFLOW_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: model || 'Qwen/Qwen2.5-7B-Instruct',
                messages: chatMessages,
                temperature: temperature || 0.9,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('SiliconFlow API error:', errorData);
            return res.status(500).json({ error: 'AI服务调用失败' });
        }

        const data = await response.json();
        res.json({ 
            reply: data.choices[0].message.content,
            model: data.model
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
