# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple CLI application that provides an interface to interact with OpenAI's API, built with TypeScript and Node.js. The application offers both single-message queries and interactive chat sessions with conversation context.

## Development Commands

- `npm run dev` - Run the CLI in development mode using ts-node
- `npm run build` - Compile TypeScript to JavaScript in the `dist/` directory  
- `npm run start` - Run the compiled JavaScript version
- `npm install` - Install dependencies

## Usage

- `npm run dev chat` - Start interactive chat session with conversation history
- `npm run dev "your message"` - Send a single message and get response
- Type "sair" or press Ctrl+C to exit interactive chat

## Configuration

The application requires an OpenAI API key configured in a `.env` file:
- Copy `.env.example` to `.env`
- Set `OPENAI_API_KEY=your_actual_api_key`

## Architecture

### Core Components

- **Main CLI Handler** (`src/app/index.ts`): Single file containing all functionality
- **Commander.js Integration**: Handles command parsing and routing
- **OpenAI Client**: Configured to use GPT-4.1-nano model
- **Interactive Interface**: Uses readline-sync for user input with proper Ctrl+C handling

### Message Flow

1. User input is captured via readline-sync or command arguments
2. Messages are formatted and stored in conversation history array
3. Full conversation context is sent to OpenAI API on each request
4. Responses are formatted with color coding (blue for human, green for assistant)
5. Console is cleared on exit for clean termination

### Visual Design

The application follows a minimalist design philosophy similar to Claude Code:
- ANSI Shadow banner on startup for interactive mode
- Simple text formatting without boxes or excessive visual elements
- Color-coded messages: `Human: ` in blue, `Assistant: ` in green
- Spinner during API calls with "Thinking..." indicator
- Clean console clear on application exit

### Dependencies

- **Core**: OpenAI SDK, Commander.js, dotenv, readline-sync
- **UI**: chalk (colors), figlet (banner), ora (spinner)
- **Development**: TypeScript, ts-node, type definitions