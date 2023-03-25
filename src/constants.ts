import dotenv from 'dotenv';

export const GuildID = '738864299392630914';

export enum Colors {
    FBW_CYAN = 0x00E0FE,
}

export enum CommandCategory {
    AIRCRAFT = 'Aircraft',
    SUPPORT = 'Support',
    GENERAL = 'General',
    UTILS = 'Utilities',
    MEMES = 'Memes',
    MODERATION = 'Moderation',
}

export enum Channels {
    MOD_LOGS = '783996780181585921',
    USER_LOGS = '779944761699729418',
    SCAM_LOGS = '932687046315737149',
    BOT_COMMANDS = '902990139670814750',
    BIRTHDAY_CHANNEL = '846470774361161808',
    A32NX_SUPPORT = '785976111875751956',
    LOCALISATION = '964912922272870470',
    FAQ = '751774575464939580',
    ROLES = '751780817772216401',
    PROGRESS = '747971332301389935',
    A32NX_RELEASE = '747575878170574858',
    FLIGHT_SCHOOL = '887806920252076053',
    KNOWN_ISSUES = '771435594445226005',
    SUPPORT_OPS = '838062729398976522',
    EXP_CFMS_ISSUES = '1046906298815488100',
}

export enum Threads {
    BIRTHDAY_THREAD = '930923893206679573',
    COUNT_THREAD = '877049017102659654',
}

export enum Roles {
    ADMIN_TEAM = '738864824305319936',
    MODERATION_TEAM = '739187150909866137',
    DEVELOPMENT_TEAM = '747571237475057815',
    MEDIA_TEAM = '756972770214281346',
    FBW_EMERITUS = '878635657680027678',
    BOT_DEVELOPER = '768888763929591818',
    COMMUNITY_SUPPORT = '870394933926830100',
    CONTRIBUTOR = '758136468622409749',
    QA_TESTER = '749323930182877214',
    QA_TRAINEE = '779347636565442560',
}

export const RoleGroups = {
    STAFF: [Roles.ADMIN_TEAM, Roles.MODERATION_TEAM],
    TEAM: [Roles.ADMIN_TEAM, Roles.MODERATION_TEAM, Roles.DEVELOPMENT_TEAM, Roles.MEDIA_TEAM, Roles.FBW_EMERITUS],
    BOT: [Roles.ADMIN_TEAM, Roles.MODERATION_TEAM, Roles.BOT_DEVELOPER],
};

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

export enum Units {
    DEGREES = '\u00B0',
    CELSIUS = '\u2103',
    KNOTS = 'kts',
}

// Custom emoji must be used. These custom emojis MUST be on the server the bot runs
// Identifier is determined through typing the following in the message box and pressing enter:
// \:A32:
// (Backslash<emoji code>)
// This returns a format like:
// <:A32:1044359345493790850>
// Strip <, > and the first :, add this entry below. Anything else will not work.
export const AircraftTypeList = {
    a32nx: '32:1044695612337168494',
    a380x: '38:1044695718348210177',
};

export const PermissionsEmbedDelay = 10000;

// imageBaseUrl - Below takes the IMAGE_BASE_URL entry from the `env` and strips the trailing `/` if present

dotenv.config();
const originalBaseUrl = `${process.env.IMAGE_BASE_URL}`;
const imageBaseUrl = originalBaseUrl.endsWith('/') ? originalBaseUrl.slice(0, -1) : originalBaseUrl;
export { imageBaseUrl };
