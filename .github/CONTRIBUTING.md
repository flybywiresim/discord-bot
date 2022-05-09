# Contributing

Please reference the information below when contributing to this repository.

## Requirements

* Write your commands professionally and clearly.
* Proofread your work before submitting as ready for review.
* Choose user-friendly command names.
* Test your build locally before submitting as ready for review.

## Writing Guidelines

To ensure that commands are written professionally and clearly, please follow the guide below.

* Use the proper name for third party services. For example, simBrief and not SimBrief.
* Refrain from using exclamation points unless it is a warning.
* Ensure that the contents of the command are correct. If you are unsure if something is correct please speak to any bot developer, and they will be able to verify anything.
* Ensure that grammar and spelling is correct.

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

### Tokens

Some commands may require additional tokens. If you would like to test them out on your bot, you must include the tokens inside your .env file. These commands include the metar, station and Wolfram Alpha commands. The steps below will explain how to set this up.

#### AVWX (Metar and Station)

1. Make a free account [here](https://avwx.rest/). Then, follow the steps [here](https://account.avwx.rest/getting-started) to get your token
2. Inside the .env file, on a new line type `METAR_TOKEN=TOKEN` replacing TOKEN with what you copied in step 1
3. Then, on another new line within the .env file, type `STATION_TOKEN=TOKEN` replacing TOKEN with what you copied in step 1

#### Wolfram Alpha

1. Select get API access [here](https://products.wolframalpha.com/api/) to create an account.
2. Once you have an account you will need to get an AppID from [here](https://developer.wolframalpha.com/portal/myapps/)
3. Inside the .env file, on a new line type `WOLFRAMALPHA_TOKEN=TOKEN` replacing TOKEN with your wolfram alpha AppID

### MongoDB

Some commands require access to a MongoDB server to store persistence data. The steps below outline MongoDB's setup procedure, and the necessary steps to
connect your application to your MongoDB instance.

1. Install MongoDB from [their website](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) or set up an [Atlas cluster](https://www.mongodb.com/cloud/atlas/lp/try2)
2. If running MongoDB locally, run it [as a service](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition-as-a-windows-service) or [from the terminal](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition-from-the-command-interpreter)
3. Create a new database named fbw in your MongoDB instance
4. Inside the .env file, on a new line type `MONGODB_URL=URL` replacing URL with your MongoDB access URL

If you have installed MongoDB locally, your access url will be `mongodb://localhost:27017/fbw`. If you are using Atlas, the connection URL can be found under
`Connect->Connect your application` in Database, located under Deployments.

### Privileged Gateway Intents

Privileged Gateway Intents must now be enabled within the Discord Developer Portal in order for your bot to function. The steps below will explain how to enable them.
1. Log into the Discord website and navigate to the [applications page](https://discord.com/developers/applications) and select your application. Then select `Bot` under `Settings` 
2. Scroll down to the Privileged Gateway Intents section and enable all the intents.

### Inviting the Bot to Your Server

1. Create a Discord server where you can test your bot
2. On the [applications page](https://discord.com/developers/applications), select your application and navigate to the `OAuth2` tab. Then select `bot` under the `scopes` section
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
3. Add it to `src/commands/index.ts`. You need to add the line `import { name } from './commandfolder/filename';`, replacing `name` with the `export const` from your command, `commandfolder` with the relevant folder your command has been placed within, and `filename` with the file name you created in step 1.
(Add this below the last command.)
4. Add your command name to the list under `const commands: CommandDefinition[] = [`
5. Add changes to `.github/CHANGELOG.md` and add command to `.github/command-docs.md`.

If you need help creating a command, you may find it useful to copy an existing command as a template, changing what you need.

Please ensure that the command category is appropriate for the command. You can find what each category means in `src/lib/constants.ts`. For example, a command used for support would use the 'SUPPORT' category. 

### Modifying a Command

1. All you need to do is open the command you wish to edit in `src/commands/` and edit what you need.
2. Add changes to `.github/CHANGELOG.md`.
3. Commit and Push.

### Example Command

```ts
import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADIRS_IMAGE_URL = 'https://cdn.discordapp.com/attachments/838062729398976522/894173641682616381/unknown.png';

export const adirs: CommandDefinition = {
    name: 'adirs',
    description: 'Display help with ADIRS alignment',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const adirsEmbed = makeEmbed({
            title: 'FlyByWire A32NX | ADIRS align',
            description: makeLines([
                'On the overhead panel you will see the three switches under \'ADIRS\'. Turn these three to the \'NAV\' position. It takes several minutes for the ADIRUs to align.',
                'You can check how long you have to wait by looking at the align time on your Upper Ecam.',
            ]),
            image: { url: ADIRS_IMAGE_URL },
        });

        await msg.channel.send({ embeds: [adirsEmbed] });

    },
};
```
