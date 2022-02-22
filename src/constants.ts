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
    MOD_LOGS = '943531144769593354',
    USER_LOGS = '943531129368109147',
    SCAM_LOGS = '943531160561148004',
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
