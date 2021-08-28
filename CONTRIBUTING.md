# Contributing

Please reference the information below when contributing to this repository.

## Requirements

* Write your commands professionally and clearly.
* Proofread your work before submitting as ready for review.
* Choose user-friendly command names.
* Test your build locally before submitting as ready for review.

## Pull Request Process
Reminder: The main branch is 'staging'

1. Fork the repo
2. Clone to your local system using your IDE of choice
3. Make a new branch and name appropriatly (eg. feat: added ADIRS command, fix: typos fixed in ADIRS)
4. Create/edit the comand you are working on
5. Test your build locally (Instructions below)
6. Create PR and mark ready for review

Note: It may be beneficial to create a draft PR while working on your command so others can help and give suggestions. It also enables us to see who is working on what.

## Pull Request Template



## Testing Your Build

### node and npm Install

1. [Install node](https://nodejs.org/en/download/), npm is bundled with the download
2. Open a command prompt in your repo directory and run 'npm install'.

### Bot Application

1. Log into the Discord website and navigate to the [applications page](https://discord.com/developers/applications)
2. Click `New Application`
3. Give your application a name
4. Navigate to the `Bot` tab and click `Add Bot`. You will have to confirm by clicking `Yes, do it!`
5. Click the `Copy` button underneath token. (Do not share this)
6. Create a file called `.env` in your bot repo
7. Inside the .env file, type `BOT_SECRET=TOKEN` replacing TOKEN with what you copied in step 6
8. You may need to add the .env file to your gitignore if your IDE hasn't done it automatically.

### Inviting the Bot to Your Server

1. Create a Discord server where you can test your bot
2. On the [applications page](https://discord.com/developers/applications), navigate to the `OAuth2` tab. Then select `bot` under the `scopes` section
3. Tick `Administrator` under the `Bot Permissions` section
4. Click the `Copy` button and paste it into your browser of choice, invite it to your test server.

### Running the Bot

1. Open a command prompt in your repo directory
2. Run `npm run dev`
3. If all has gone well, you will see the bot is running as `http://localhost:3000` and logged into the name of the bot you created!
4. You can now test your commands

## Editing Methods

### Adding a New Command

Say how to make a basic command

Disclaimer on complex commands

Add to index.ts etc

### Modifying a Command

