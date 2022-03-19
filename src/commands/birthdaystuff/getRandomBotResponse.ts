class BotResponse {
    text: string;
}

export function getRandomBotResponse(responses: BotResponse[]): string {
    const responseMessages = Object.values(responses);
    return responseMessages[Math.floor(Math.random() * responseMessages.length)].text;
}
