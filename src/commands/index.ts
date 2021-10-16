import { ping } from './ping';
import { help } from './help';
import { bruheg } from './bruheg';
import { boratorium } from './boratorium';
import { efb } from './efb';
import { deadzones } from './deadzones';
import { screens } from './screens';
import { when } from './when';
import { ban } from './ban';
import { unban } from './unban';
import { trythis } from './trythis';
import { experimental } from './experimental';
import { versions } from './versions';
import { membercount } from './membercount';
import { installer } from './installer';
import { roleinfo } from './roleinfo';
import { adirs } from './adirs';
import { installererror } from './installererror';
import { reportedissues } from './reportedissues';
import { autopilot } from './autopilot';
import { checklist } from './checklist';
import { whois } from './whois';
import { donate } from './donate';
import { utf8 } from './utf-8';
import { calibrate } from './calibrate';
import { controls } from './controls';
import { nut } from './nut';
import { screenshot } from './screenshot';
import { msfs } from './msfs';
import { content } from './content';
import { beginner } from './beginner-guide';
import { briefing } from './briefing';
import { boris } from './boris';
import { afloor } from './afloor';
import { airframe } from './airframe';
import { xbox } from './xbox';
import { willithave } from './willithave';
import { faq } from './faq';
import { community } from './community';
import { roadmap } from './roadmap';
import { clean } from './clean-install';
import { liveries } from './liveries';
import { flightdeck} from './flightdeck';
import { CommandDefinition } from '../lib/command';
import Logger from '../lib/logger';

const commands: CommandDefinition[] = [
    ping,
    help,
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
    installererror,
    reportedissues,
    autopilot,
    checklist,
    whois,
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
    flightdeck,
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
