import { CommandDefinition } from '../lib/command';
import Logger from '../lib/logger';
import { ping } from './utils/ping';
import { whois } from './moderation/whois';
import { bruheg } from './funnies/bruheg';
import { boratorium } from './funnies/boratorium';
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
import { nut } from './funnies/nut';
import { screenshot } from './support/screenshot';
import { msfs } from './support/msfs';
import { content } from './support/content';
import { beginner } from './a32nx/beginner-guide';
import { briefing } from './a32nx/briefing';
import { boris } from './funnies/boris';
import { afloor } from './a32nx/afloor';
import { airframe } from './a32nx/airframe';
import { xbox } from './a32nx/xbox';
import { willithave } from './general/willithave';
import { faq } from './moderation/faq';
import { community } from './support/community';
import { roadmap } from './general/roadmap';
import { clean } from './support/clean-install';
import { liveries } from './a32nx/liveries';
import { simversion } from './support/simversion';
import { printer } from './a32nx/printer';
import { where } from './support/where';
import { ctrl_e } from './a32nx/ctrl_e';
import { weather } from './a32nx/weather';
import { metar } from './utils/metar';
import { qa } from './general/qa';
import { ptu } from './funnies/ptu';
import { cursor } from './support/cursor';
import { avatar } from './utils/avatar';
import { coffee } from './funnies/coffee';
import { defaultmeme } from './funnies/default';
import { guard } from './funnies/guard';
import { juan } from './funnies/juan';
import { merge } from './funnies/merge';
import { otter } from './funnies/otter';
import { p3d } from './funnies/p3d';
import { poggers } from './funnies/poggers';
import { pov } from './funnies/pov';
import { shame } from './funnies/shame';
import { xp } from './funnies/xp';
import { station } from './utils/station';
import { addon } from './funnies/addon';
import { freetext } from './a32nx/freetext';
import { cowsay } from './funnies/cowsay';
import { synaptic } from './general/synaptic';
import { directx12 } from './support/directx12';
import { cfms } from './a32nx/cfms';
import { fdr } from './support/fdr';
import { discontinuity } from './support/discontinuity';
import { navdata } from './support/navdata';
import { build } from './support/build';
import { tug } from './support/tug';
import { crak } from './funnies/crak';
import { weightBalance } from './a32nx/weightBalance';
import { rules } from './moderation/rules';
import { fixinfo } from './a32nx/fixinfo';
import { welcome } from './moderation/welcome';
import { sop } from './a32nx/sop';
import { goldenRules } from './general/goldenRules';
import { fridge } from './funnies/fridge';
import { tiller } from './a32nx/tiller';
import { assistance } from './a32nx/assistance';
import { ctd } from './support/ctd';
import { hud } from './support/hud';
import { fms } from './funnies/fms';
import { mcdu } from './a32nx/mcdu';
import { takeoffPerf } from './a32nx/takeoffPerf';
import { manualleg } from './support/manualleg';
import { oim } from './funnies/oim';
import { wasm } from './support/wasm';
import { CPDLC } from './a32nx/cpdlc';
import { simbriefimport } from './a32nx/simbriefimport';
import { play } from './music/play';
import { skip } from './music/skip';
import { queue } from './music/queue';
import { jump } from './music/jump';
import { pause } from './music/pause';
import { resume } from './music/resume';

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
    ctrl_e,
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
    play,
    skip,
    queue,
    jump,
    pause,
    resume,
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
