import { CommandDefinition } from '../lib/command';
import Logger from '../lib/logger';
import { ping } from './utils/ping';
import { whois } from './moderation/whois';
import { bruheg } from './memes/bruheg';
import { boratorium } from './memes/boratorium';
import { efb } from './a32nx/efb';
import { deadzones } from './support/deadzones';
import { screens } from './a32nx/screens';
import { when } from './general/when';
import { ban } from './moderation/ban';
import { unban } from './moderation/unban';
import { trythis } from './support/trythis';
import { experimental } from './a32nx/experimental';
import { versions } from './a32nx/versions';
import { membercount } from './utils/membercount';
import { installer } from './general/installer';
import { roleinfo } from './utils/roleinfo';
import { adirs } from './a32nx/adirs';
import { logs } from './support/logs';
import { reportedissues } from './support/reportedissues';
import { autopilot } from './a32nx/autopilot';
import { checklist } from './a32nx/checklist';
import { help } from './utils/help';
import { donate } from './general/donate';
import { utf8 } from './support/utf-8';
import { calibrate } from './support/calibrate';
import { controls } from './support/controls';
import { nut } from './memes/nut';
import { screenshot } from './support/screenshot';
import { msfs } from './support/msfs';
import { content } from './support/content';
import { beginner } from './a32nx/beginner-guide';
import { briefing } from './a32nx/briefing';
import { boris } from './memes/boris';
import { afloor } from './a32nx/afloor';
import { airframe } from './a32nx/airframe';
import { xbox } from './general/xbox';
import { willithave } from './general/willithave';
import { faq } from './moderation/faq';
import { community } from './support/community';
import { roadmap } from './general/roadmap';
import { clean } from './support/clean-install';
import { liveries } from './a32nx/liveries';
import { simversion } from './support/simversion';
import { printer } from './a32nx/printer';
import { where } from './support/where';
import { ctrlE } from './a32nx/ctrlE';
import { weather } from './a32nx/weather';
import { metar } from './utils/metar';
import { qa } from './general/qa';
import { ptu } from './memes/ptu';
import { cursor } from './support/cursor';
import { avatar } from './utils/avatar';
import { coffee } from './memes/coffee';
import { defaultmeme } from './memes/default';
import { guard } from './memes/guard';
import { juan } from './memes/juan';
import { merge } from './memes/merge';
import { otter } from './memes/otter';
import { p3d } from './memes/p3d';
import { poggers } from './memes/poggers';
import { pov } from './memes/pov';
import { shame } from './memes/shame';
import { xp } from './memes/xp';
import { station } from './utils/station';
import { addon } from './memes/addon';
import { freetext } from './a32nx/freetext';
import { cowsay } from './memes/cowsay';
import { synaptic } from './general/synaptic';
import { directx12 } from './support/directx12';
import { cfms } from './a32nx/cfms';
import { fdr } from './support/fdr';
import { discontinuity } from './support/discontinuity';
import { navdata } from './support/navdata';
import { build } from './support/build';
import { tug } from './support/tug';
import { crak } from './memes/crak';
import { weightBalance } from './a32nx/weightBalance';
import { rules } from './moderation/rules';
import { fixinfo } from './a32nx/fixinfo';
import { welcome } from './moderation/welcome';
import { sop } from './a32nx/sop';
import { goldenRules } from './general/goldenRules';
import { fridge } from './memes/fridge';
import { tiller } from './a32nx/tiller';
import { assistance } from './a32nx/assistance';
import { ctd } from './support/ctd';
import { hud } from './support/hud';
import { fms } from './memes/fms';
import { mcdu } from './a32nx/mcdu';
import { takeoffPerf } from './a32nx/takeoffPerf';
import { manualleg } from './support/manualleg';
import { oim } from './memes/oim';
import { wasm } from './support/wasm';
import { CPDLC } from './a32nx/cpdlc';
import { simbriefimport } from './a32nx/simbriefimport';
import { roleassignment } from './moderation/roleassignment';
import { timeout } from './moderation/timeout';
import { untimeout } from './moderation/untimeout';
import { audio } from './a32nx/audio';
import { flexTemp } from './a32nx/flex-temp';
import { preflight } from './a32nx/preflight';
import { storedWaypoint } from './a32nx/stored-waypoint';
import { tcas } from './a32nx/tcas';
import { msfsdisc } from './general/msfsdiscord';
import { count } from './utils/count';
import { shomas } from './memes/shomas';
import { pw } from './memes/pw';
import { abbreviations } from './support/abbreviations';
import { salty } from './general/salty';
import { airac } from './support/airac';
import { mico } from './memes/mico';
import { translate } from './general/translate';
import { github } from './a32nx/github';
import { zulu } from './utils/zulu';
import { latlongfix } from './general/latlongfix';
import { headwind } from './general/headwind';
import { wolframalpha } from './utils/wolframalpha';
import { birthday } from './utils/birthday';
import { recommendedSettings } from './a32nx/recommendedsettings';
import { warn } from './moderation/warn/warn';
import { listWarnings } from './moderation/warn/listWarnings';
import { deleteWarn } from './moderation/warn/deleteWarn';
import { atc } from './a32nx/atc';
import { market } from './support/market';
import { takeoffIssues } from './a32nx/takeoffissues';
import { simbridge } from './support/simbridge';
import { fma } from './a32nx/fma';

const commands: CommandDefinition[] = [
    ping,
    whois,
    bruheg,
    boratorium,
    efb,
    deadzones,
    screens,
    when,
    ban,
    unban,
    trythis,
    experimental,
    versions,
    membercount,
    installer,
    roleinfo,
    adirs,
    logs,
    reportedissues,
    autopilot,
    checklist,
    help,
    donate,
    utf8,
    calibrate,
    controls,
    nut,
    screenshot,
    msfs,
    content,
    beginner,
    briefing,
    boris,
    afloor,
    airframe,
    xbox,
    willithave,
    faq,
    community,
    roadmap,
    clean,
    liveries,
    simversion,
    printer,
    where,
    ctrlE,
    weather,
    metar,
    qa,
    ptu,
    cursor,
    avatar,
    coffee,
    defaultmeme,
    guard,
    juan,
    merge,
    otter,
    p3d,
    poggers,
    pov,
    shame,
    xp,
    station,
    addon,
    freetext,
    cowsay,
    synaptic,
    directx12,
    cfms,
    fdr,
    discontinuity,
    navdata,
    build,
    tug,
    crak,
    weightBalance,
    rules,
    fixinfo,
    welcome,
    sop,
    goldenRules,
    fridge,
    tiller,
    assistance,
    ctd,
    hud,
    fms,
    mcdu,
    takeoffPerf,
    manualleg,
    oim,
    wasm,
    CPDLC,
    simbriefimport,
    roleassignment,
    timeout,
    untimeout,
    audio,
    flexTemp,
    preflight,
    storedWaypoint,
    tcas,
    msfsdisc,
    count,
    shomas,
    pw,
    abbreviations,
    salty,
    airac,
    mico,
    translate,
    github,
    zulu,
    latlongfix,
    headwind,
    wolframalpha,
    birthday,
    recommendedSettings,
    warn,
    listWarnings,
    deleteWarn,
    atc,
    market,
    takeoffIssues,
    simbridge,
    fma,
];

const commandsObject: { [k: string]: CommandDefinition } = {};

for (const def of commands) {
    for (const name of (typeof def.name === 'string' ? [def.name] : def.name)) {
        if (commandsObject[name]) {
            Logger.warn(`Duplicate command/alias inserted: ${name}`);
        }
        commandsObject[name] = def;
    }
}

export default commandsObject;
