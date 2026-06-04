# Battleship Game

A classic Battleship game built with just only vanilla JavaScript and a bundler.

## Description

This project implements the traditional Battleship board game where players strategically place ships on a 10x10 grid and take turns attacking each other's boards. The game includes:

- A home screen with game introduction
- An interactive ship placement phase for the human player
- A game page where the battle will start
- Turn-based gameplay against a computer AI
- Visual feedback for hits, misses, ship placements, and winner

## Features

- Ship Types: 5 different ships with varying lengths (Aircraft Carrier: 5, Battleship: 4, Cruiser: 3, Submarine: 3, Destroyer: 2)
- Interactive UI: Drag-and-drop ship placement with rotation options
- AI Opponent: Computer player with randomized ship placement and attacks
- Game States: Managed state transitions between home, preparation, and game phases

## Game Rules

1. Setup: Players place 5 ships of different sizes on their 10x10 grid
2. Gameplay: Players take turns calling out coordinates to attack
3. Hits and Misses: A hit is marked if a ship occupies the attacked cell
4. Winning: The first player to sink all opponent ships wins

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

## Project Structure

```
src/
├── assets/           # images and styles
├── pages/            # page entry points (home, preparation, game)
├── services/         # game logic, DOM handlers, players, gameMaster
├── utils/            # helper utilities
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

## Contributing

This is a personal project, but feel free to fork and modify for your own use.
