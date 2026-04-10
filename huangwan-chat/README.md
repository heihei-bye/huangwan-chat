# 🌸 黄菀 AI 聊天

一个基于大模型的智能聊天机器人，复现记忆中的她。

## 快速部署到 Railway（免费）

### 1. 上传代码
```bash
# 在项目文件夹打开终端
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的用户名/huangwan-chat.git
git push -u origin main
```

### 2. 获取 API Key
1. 注册 [硅基流动](https://www.siliconflow.cn/) 获取免费额度
2. 获取 API Key（格式：`sk-xxx`）

### 3. 部署到 Railway
1. 访问 [railway.app](https://railway.app)
2. 用 GitHub 登录
3. 点击 **New Project** → **Deploy from GitHub repo**
4. 选择 `huangwan-chat` 仓库
5. 点击 **Add Variables**，添加：
   - `SILICONFLOW_API_KEY` = `sk-你的API密钥`
6. 等待部署完成（1-2分钟）

部署成功后，你会获得一个 URL，例如：`https://huangwan-chat.up.railway.app`

### 4. 修改前端配置
用文本编辑器打开 `index.html`，找到这行：
```javascript
let API_BASE_URL = 'http://localhost:3001';
```

改成你的 Railway URL（注意去掉 http://）：
```javascript
let API_BASE_URL = 'https://huangwan-chat.up.railway.app';
```

然后把修改后的 `index.html` 重新上传到 GitHub，Railway 会自动重新部署。

## 本地运行

```bash
npm install
npm run dev
```

然后浏览器打开 `index.html` 即可。

## 功能特点

- 💬 多轮连续对话，像真人聊天一样
- 🤔 支持反问、追问、衍生话题
- 🎭 自然情感表达，不使用括号动作
- 🌐 支持 DeepSeek / Qwen / GLM 等模型
- 📱 响应式设计，手机电脑都能用

## 自定义角色

点击右上角 ⚙️ 按钮，可以修改：
- 系统提示词（角色设定）
- 模型选择
- 创意程度（temperature）

## 免费额度说明

硅基流动免费额度：
- DeepSeek V2.5：约 100 万 tokens
- Qwen 2.5：约 200 万 tokens

足够个人使用很久了～
