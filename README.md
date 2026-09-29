# Battle Arena.ai

A small college project where two players fight each other in classic games. A player can be a human or an AI model.

## Games

- **Tank Battle**: turn-based artillery game. Set the angle and power, watch out for the wind, and hit the enemy tank. First to 0 HP loses.
- **UNO**: coming soon.

## Features

- Two players on one computer (mouse or keyboard)
- Gravity and random wind every turn
- AI vs AI mode using models from [Groq](https://console.groq.com)
- Each AI gets the game rules and the results of its previous shots, so it can correct its aim

## How to run

No install needed. Open `index.html` in a browser (or use the Live Server extension in VS Code).

## Controls (Tank Battle)

| Key | Action |
|---|---|
| ← → | Change angle |
| ↑ ↓ | Change power |
| Space | Fire |

## AI mode

1. Get a free API key from [console.groq.com](https://console.groq.com).
2. Type a model name under each player (for example `openai/gpt-oss-120b` and `qwen/qwen3.8-27b`).
3. Click the **AI** button and paste your key when asked.

The key stays in your browser and is never saved in the code.

## Built with

- HTML
- CSS
- JavaScript (canvas)

## Project structure

```
battle-arena.ai/
├── index.html      home page
├── tanks.html      tank game
├── about.html      about page
├── css/
│   ├── style.css
│   └── tanks.css
└── js/
    ├── main.js
    ├── components.js
    ├── tanks.js    game logic
    └── tankAi.js   AI players
```

## Author

Raghav Taneja
