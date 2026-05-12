# Battleship Game

A classic Battleship game built with vanilla JavaScript, featuring a web-based interface for ship placement and turn-based gameplay against an AI opponent.

## Description

This project implements the traditional Battleship board game where players strategically place ships on a 10x10 grid and take turns attacking each other's boards. The game includes:

- A home screen with game introduction
- An interactive ship placement phase for the human player
- Turn-based gameplay against a computer AI
- Visual feedback for hits, misses, and ship placements

## Features

- Ship Types: 5 different ships with varying lengths (Aircraft Carrier: 5, Battleship: 4, Cruiser: 3, Submarine: 3, Destroyer: 2)
- Interactive UI: Drag-and-drop ship placement with rotation options
- AI Opponent: Computer player with randomized ship placement and attacks
- Responsive Design: Styled with CSS for a clean, modern look
- Game States: Managed state transitions between home, preparation, and game phases
- Asset Management: Inline SVG icons for ships and UI elements

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/battleship-game.git
cd battleship-game
```

2. Install dependencies using pnpm:

```bash
pnpm install
```

## Usage

### Development

Run the development server with hot reloading:

```bash
pnpm run dev
```

This starts a Webpack dev server at `http://localhost:8080`.

### Production Build

Build the project for production:

```bash
pnpm run build
```

The built files will be in the dist/ directory.

<!--
Deployment
Deploy to GitHub Pages:
-->

## Project Structure

```
src/
├── assets/
│   ├── imgs/
│   │   ├── grid/
│   │   ├── ships/
│   │   │   ├── sprites/
│   │   │   └── [ship-type]/
│   │   └── [other images]
│   └── styles/
│       ├── buttons.css
│       ├── light.css
│       ├── modern-normalize.css
│       └── resets.css
├── pages/
│   ├── home/
│   │   ├── index.js
│   │   └── home.css
│   └── preparation/
│       ├── index.js
│       └── preparation.css
├── services/
│   ├── cell/
│   │   ├── cell.js
│   │   └── cell.spec.js
│   ├── dom/
│   │   └── domHandler.js
│   ├── gameboard/
│   │   ├── gameboard.js
│   │   └── gameboard.spec.js
│   ├── gameMaster/
│   │   ├── gameMaster.js
│   │   └── gameMaster.spec.js
│   ├── player/
│   │   ├── player.js
│   │   ├── player.spec.js
│   │   ├── playerFactory.js
│   │   └── playerMethods.js
│   └── ship/
│       ├── ship.js
│       ├── ship.spec.js
│       ├── shipFactory.js
│       └── shipMethods.js
├── utils/
│   ├── asset.js
│   └── random.js
├── index.css
├── index.html
└── index.js
```

## Technologies Used

- JavaScript (ES6+): Core game logic and DOM manipulation
- Webpack: Module bundling and asset management
- Babel: JavaScript transpilation
- CSS: Styling with custom properties and responsive design
- Jest: Unit testing framework
- pnpm: Package management

## Game Rules

1. Setup: Players place 5 ships of different sizes on their 10x10 grid
2. Gameplay: Players take turns calling out coordinates to attack
3. Hits and Misses: A hit is marked if a ship occupies the attacked cell
4. Winning: The first player to sink all opponent ships wins

## Contributing

This is a personal project, but feel free to fork and modify for your own use.

<!--
## License

ISC License

This README provides a clear overview, setup instructions, and usage guide. If you'd like any modifications or additional sections (e.g., screenshots, API docs), let me know!
-->
