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
    MOD_LOGS = '945016209647239218',
    USER_LOGS = '942501662420004954',
}

export const UserLogExclude = [
    '628400349979344919', // StickyBot
    '864492608163807302', //test bot
];

export const ModLogsExclude = [
    '864492608163807302',
];
