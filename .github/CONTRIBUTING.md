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
3. Make a new branch from staging and name appropriately (e.g. feat: added ADIRS command, fix: typos fixed in ADIRS)
4. Create/edit the command you are working on
5. Test your build locally (Instructions below)
6. Create a PR to merge your changes into staging

Note: It may be beneficial to create a draft PR while working on your command. This will allow us to see who is working on what, and will enable the community to give active feedback on your work.

## Pull Request Template

You can find the pull request template [here](PULL_REQUEST_TEMPLATE.md).

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

>Please note, this will only show the basics of adding a command

1. Create a new file in the relevant folder within `src/commands/` and name it appropriately. `yourcommand.ts`
2. Create your command
3. Add it to `src/commands/index.ts`. You need to add the line `import { name } from './commandfolder/fileame';`, replacing `name` with the `export const` from your command, `commandfolder` with the relevant folder your command has been placed within, and `filename` with the file name you created in step 1.
(Add this below the last command, usually above `import { CommandDefinition } from '../lib/command';` and `import Logger from '../lib/logger';`)
4. Add your command name to the list under `const commands: CommandDefinition[] = [`

If you need help creating a command, you may find it useful to copy an existing command as a template, changing what you need.

### Modifying a Command

All you need to do is open the command you wish to edit in `src/commands/`, edit what you need, commit and push!

### Example Command

```ts
import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADIRS_IMAGE_URL = 'https://media.discordapp.net/attachments/785976111875751956/818095298538504272/image0.png';

export const adirs: CommandDefinition = {
    name: 'adirs',
    description: 'Display help with ADIRS alignment',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | ADIRS align',
        description: makeLines([
            'On the overhead panel you will see the three switches under \'ADIRS\'. Turn these three to the \'NAV\' position. It takes several minutes for the ADIRUs to align.',
            'You can check how long you have to wait by looking at the align time on your Upper Ecam.',
        ]),
        image: { url: ADIRS_IMAGE_URL },
    })),
};
```
