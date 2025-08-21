#!/usr/bin/env node

import { program } from 'commander';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as readlineSync from 'readline-sync';
import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';
import boxen from 'boxen';

dotenv.config();

const MODEL_ID = 'gpt-4.1-nano';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function showWelcomeBanner() {
  console.clear();
  const banner = figlet.textSync('OpenChat Code', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });
  
  console.log(chalk.red(banner));
  console.log(chalk.gray('-'.repeat(60)));
  console.log(chalk.white(`Powered by OpenAI ${MODEL_ID}`));
  console.log(chalk.gray('-'.repeat(60)));
  console.log();
}

function formatUserMessage(message: string): string {
  return chalk.blue.bold('Human: ') + chalk.white(message);
}

function formatAIMessage(message: string): string {
  return chalk.green.bold('Assistant: ') + chalk.white(message);
}

async function sendMessage(messages: Message[]): Promise<string | null> {
  const spinner = ora({
    text: chalk.yellow('Thinking...'),
    color: 'yellow'
  }).start();

  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: MODEL_ID,
    });

    spinner.stop();
    return completion.choices[0]?.message?.content || null;
  } catch (error) {
    spinner.stop();
    console.log(chalk.red('✗ Error: ' + (error instanceof Error ? error.message : 'Unknown error')));
    return null;
  }
}

async function startInteractiveChat() {
  showWelcomeBanner();
  
  console.log(chalk.cyan('Interactive chat started!'));
  console.log(chalk.gray('Type "exit" or press Ctrl+C to quit\n'));
  
  const messages: Message[] = [];

  while (true) {
    try {
      const userInput = readlineSync.question(chalk.blue('> '));
    
      if (userInput.toLowerCase() === 'exit') {
        console.log(chalk.yellow('\nClosing chat...'));
        break;
      }
      
      if (userInput.trim() === '') {
        continue;
      }
      
      console.log(formatUserMessage(userInput));
      
      messages.push({ role: 'user', content: userInput });
      
      const response = await sendMessage(messages);
      
      if (response) {
        console.log(formatAIMessage(response) + '\n');
        messages.push({ role: 'assistant', content: response });
      }
    } catch (error) {
      // Ctrl+C captured by readline-sync
      console.log(chalk.yellow('\nClosing chat...'));
      break;
    }
  }
  
  // Clear console on exit
  setTimeout(() => console.clear(), 500);
}

program
  .name('openchat-code')
  .description('Simple CLI to interact with AI APIs, inspired by Claude Code')
  .version('1.0.0');

program
  .command('chat')
  .description('Start interactive chat')
  .action(startInteractiveChat);

program
  .argument('[message]', 'Single message to send to OpenAI')
  .action(async (message?: string) => {
    if (!message) {
      console.log(chalk.cyan('OpenChat Code'));
      console.log(chalk.gray('-'.repeat(40)));
      console.log(chalk.white('Use "openchat-code chat" for interactive chat'));
      console.log(chalk.white('or "openchat-code <message>" for single message'));
      return;
    }
    
    try {
      console.log(formatUserMessage(message));
      
      const response = await sendMessage([{ role: 'user', content: message }]);
      
      if (response) {
        console.log(formatAIMessage(response));
      }
      
    } catch (error) {
      console.error(chalk.red('Error: ' + (error instanceof Error ? error.message : 'Unknown error')));
    }
  });

program.parse(process.argv);