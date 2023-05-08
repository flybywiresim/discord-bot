import { BaseCommandDefinition } from '../lib/command';
import Logger from '../lib/logger';
import { typeCommand } from '../lib/typeCommand';
import { ping } from './utils/ping';
import { whois } from './moderation/whois';
import { bruheg } from './memes/bruheg';
import { boratorium } from './memes/boratorium';
import { efb } from './aircraft/efb';
import { deadzones } from './support/deadzones';
import { screens } from './aircraft/screens';
import { when } from './general/when';
import { ban } from './moderation/ban';
import { unban } from './moderation/unban';
import { trythis } from './support/trythis';
import { experimental } from './aircraft/experimental';
import { versions } from './aircraft/versions';
import { membercount } from './utils/membercount';
import { installer } from './general/installer';
import { roleinfo } from './utils/roleinfo';
import { adirs } from './aircraft/adirs';
import { logs } from './support/logs';
import { reportedissues } from './support/reportedissues';
import { autopilot } from './aircraft/autopilot';
import { checklist } from './aircraft/checklist';
import { help } from './utils/help';
import { donate } from './general/donate';
import { utf8 } from './support/utf-8';
import { calibrate } from './support/calibrate';
import { controls } from './support/controls';
import { nut } from './memes/nut';
import { screenshot } from './support/screenshot';
import { msfs } from './support/msfs';
import { content } from './support/content';
import { beginner } from './aircraft/beginner-guide';
import { briefing } from './aircraft/briefing';
import { boris } from './memes/boris';
import { afloor } from './aircraft/afloor';
import { airframe } from './aircraft/airframe';
import { xbox } from './general/xbox';
import { willithave } from './general/willithave';
import { faq } from './moderation/faq';
import { community } from './support/community';
import { roadmap } from './general/roadmap';
import { clean } from './support/clean-install';
import { liveries } from './aircraft/liveries';
import { simversion } from './support/simversion';
import { printer } from './aircraft/printer';
import { where } from './support/where';
import { ctrlE } from './aircraft/ctrlE';
import { weather } from './aircraft/weather';
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
import { freetext } from './aircraft/freetext';
import { cowsay } from './memes/cowsay';
import { synaptic } from './general/synaptic';
import { directx12 } from './support/directx12';
import { cfms } from './aircraft/cfms';
import { fdr } from './support/fdr';
import { discontinuity } from './support/discontinuity';
import { navigraphNavdata } from './support/navigraphNavdata';
import { build } from './support/build';
import { tug } from './support/tug';
import { crak } from './memes/crak';
import { weightBalance } from './aircraft/weightBalance';
import { rules } from './moderation/rules';
import { fixinfo } from './aircraft/fixinfo';
import { welcome } from './moderation/welcome';
import { sop } from './aircraft/sop';
import { goldenRules } from './general/goldenRules';
import { fridge } from './memes/fridge';
import { tiller } from './aircraft/tiller';
import { assistance } from './aircraft/assistance';
import { ctd } from './support/ctd';
import { hud } from './support/hud';
import { fms } from './memes/fms';
import { remoteMcdu } from './aircraft/remoteMcdu';
import { takeoffPerf } from './aircraft/takeoffPerf';
import { manualleg } from './support/manualleg';
import { oim } from './memes/oim';
import { wasm } from './support/wasm';
import { CPDLC } from './aircraft/cpdlc';
import { simbriefimport } from './aircraft/simbriefimport';
import { roleassignment } from './moderation/roleassignment';
import { timeout } from './moderation/timeout';
import { untimeout } from './moderation/untimeout';
import { audio } from './aircraft/audio';
import { flexTemp } from './aircraft/flex-temp';
import { preflight } from './aircraft/preflight';
import { storedWaypoint } from './aircraft/stored-waypoint';
import { tcas } from './aircraft/tcas';
import { msfsdisc } from './general/msfsdiscord';
import { count } from './utils/count';
import { shomas } from './memes/shomas';
import { pw } from './memes/pw';
import { abbreviations } from './support/abbreviations';
import { salty } from './general/salty';
import { airac } from './support/airac';
import { mico } from './memes/mico';
import { translate } from './general/translate';
import { github } from './aircraft/github';
import { zulu } from './utils/zulu';
import { latlongfix } from './general/latlongfix';
import { headwind } from './general/headwind';
import { wolframalpha } from './utils/wolframalpha';
import { birthday } from './utils/birthday';
import { recommendedSettings } from './aircraft/recommendedsettings';
import { warn } from './moderation/warn/warn';
import { listWarnings } from './moderation/warn/listWarnings';
import { deleteWarn } from './moderation/warn/deleteWarn';
import { atc } from './aircraft/atc';
import { market } from './support/market';
import { takeoffIssues } from './aircraft/takeoffissues';
import { simbridge } from './support/simbridge';
import { fma } from './aircraft/fma';
import { noHello } from './memes/noHello';
import { vatsimEvents } from './utils/vatsimEvents';
import { flights } from './utils/flights';
import { docsearch } from './general/docsearch';
import { dlss } from './support/dlss';
import { temporarycommandedit } from './moderation/temporaryCommandEdit';
import { temporarycommand } from './general/temporaryCommand';
import { yourControls } from './general/yourControls';
import { notams } from './general/notams';
import { vatsimData } from './utils/vatsimData';
import { website } from './general/website';
import { verticalGuidance } from './aircraft/verticalGuidance';
import { verticalGuidanceSymbols } from './aircraft/verticalGuidanceSymbols';
import { verticalSpeedPriority } from './aircraft/verticalSpeedPriority';
import { flyPadOS } from './aircraft/flyPadOS';
import { simulationRate } from './support/simulationRate';
import { dfd } from './general/dfd';
import { direct } from './aircraft/direct';
import { autoland } from './aircraft/autoland';
import { holds } from './aircraft/holds';
import { mcdu } from './aircraft/mcdu';
import { fsltl } from './general/fsltl';
import { flyPadAbout } from './support/flyPadAbout';
import { navdata } from './support/navdata';
import { winss } from './support/winss';
import { simbridgeLog } from './support/simbridgeLog';
import { sticky } from './moderation/sticky';
import { navRouteTypes } from './general/navRouteTypes';
import { cacheUpdate } from './moderation/cacheUpdate';
import { navigraph } from './general/navigraph';
import { botIssue } from './support/botIssue';
import { slowMode } from './moderation/slowmode';
import { econnreset } from './support/econnreset';
import { pr } from './utils/pr';
import { gsxIntegration } from './aircraft/gsxIntegration';
import { supportGuide } from './support/supportGuide';
import { simbriefdata } from './utils/simbriefdata';
import { tca } from './support/tca';

const commands: BaseCommandDefinition[] = [
    typeCommand,
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
    navigraphNavdata,
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
    remoteMcdu,
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
    noHello,
    vatsimEvents,
    flights,
    docsearch,
    dlss,
    temporarycommandedit,
    temporarycommand,
    yourControls,
    notams,
    vatsimData,
    website,
    verticalGuidance,
    verticalGuidanceSymbols,
    verticalSpeedPriority,
    flyPadOS,
    simulationRate,
    dfd,
    direct,
    autoland,
    holds,
    mcdu,
    fsltl,
    flyPadAbout,
    navdata,
    winss,
    simbridgeLog,
    sticky,
    navRouteTypes,
    cacheUpdate,
    navigraph,
    botIssue,
    slowMode,
    econnreset,
    pr,
    gsxIntegration,
    tca,
    supportGuide,
    simbriefdata,
];

const commandsObject: { [k: string]: BaseCommandDefinition } = {};

for (const def of commands) {
    for (const name of (typeof def.name === 'string' ? [def.name] : def.name)) {
        if (commandsObject[name]) {
            Logger.warn(`Duplicate command/alias inserted: ${name}`);
        }
        commandsObject[name] = def;
    }
}

export default commandsObject;
