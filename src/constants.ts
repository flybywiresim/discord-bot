export enum Colors {
    FBW_CYAN = '#00E0FE',
}

export enum CommandCategory {
    A32NX = 'A32NX',
    SUPPORT = 'Support',
    GENERAL = 'General',
    UTILS = 'Utilities',
    FUNNIES = 'Funnies',
    MODERATION = 'Moderation',
}

export enum Channels {
    MOD_LOGS = '783996780181585921',
    USER_LOGS = '779944761699729418',
    SCAM_LOGS = '932687046315737149',
    COUNT_THREAD = '877049017102659654',
}

export const UserLogExclude = [
    '628400349979344919', // StickyBot
    '910632773117702185', //FBW Bot
    '856826179491594271', //FBW Staging bot
    '864492608163807302', //BenW test bot
];

export const ModLogsExclude = [
    '910632773117702185', //FBW Bot
    '856826179491594271', //FBW Staging bot
    '864492608163807302', //BenW test bot
];
