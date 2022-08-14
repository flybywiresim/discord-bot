## Changelog

### August 2022

- chore: add editorconfig (14/08/2022)
- feat: add temporarycommandedit and temporarycommand (14/08/2022)
- docs: cleanup newlines in command document (14/08/2022)
- feat: add dlss command (12/08/2022)
- refactor: simbrief import alias (12/08/2022)
- feat: add docsearch command (10/08/2022)
- ci: verify changelog in PR (10/08/2022)
- feat: add live flights command (08/08/2022)
- feat: add events command (08/08/2022)
- refactor: command cleanup (08/08/2022)
- fix: crash in scamlogs with non-existent roles (08/08/2022)
- fix: mentions in multiple commands (08/08/2022)
- feat: adds noHello (06/08/2022)
- refactor: command-docs.md ordering (05/08/2022)
- refactor: rename funnies directory to memes (05/08/2022)
- refactor: extract messageCreate handler (03/08/2022)
- feat: makeList embed helper (03/08/2022)
- feat: FMA command (03/08/2022)
- fix: grammar in .wx command (02/08/2022)
- refactor: .wx command terrain display on experimental note (01/08/2022)
- refactor: change SOP command image (01/08/2022)

## July 2022

- ci: build setup and lint helm for pr (31/07/2022)
- fix: ping fixed for count command (31/07/2022)
- chore: bot service to docker-compose (31/07/2022)
- chore: bump discord package version with fixes @v14.0.3 (29/07/2022)
- refactor: add .deadzones alias to .dz command, correct docs (27/07/2022)
- refactor: add .nws alias to .tiller command (27/07/2022)
- feat: simbridge support command (27/07/2022)
- refactor: add steps and image to utf8 command (26/07/2022)
- feat: cowsay command sanitization (25/07/2022)
- refactor: update deadzones command (19/07/2022)
- refactor: downscale .pov and .efb gifs (19/07/2022)
- fix: use non-vanity Synaptic Discord link (19/07/2022)
- feat: takeoff issues command (18/07/2022)
- fix: missing error embed for wolfram alpha (18/07/2022)
- fix: fixed .bg abbreviations hyperlink (18/072022)
- chore: add node-fetch dependency (17/07/2022)
- chore: remove request dependency (17/07/2022)
- refactor: requests to node-fetch (17/07/2022)
- fix: update .where image link (16/07/2022)
- chore: add images to repo (16/07/2022)
- refactor: add .legacy alias to .controls (15/07/2022)
- feat: marketplace removal command (14/07/2022)
- refactor: weather.ts embed title and copy (12/07/2022)
- docs: add .env.example file. (11/07/2022)
- refactor: birthday command (11/07/2022)
- feat: default ATC command (10/07/2022)
- fix: remove flypados thread from .exp (07/07/2022)

### June 2022

- feat: add docker-compose (28/06/2022) - @NathanInnes
- feat: adds a warn system (28/06/2022) - @benw202, @NathanInnes
- chore: update discord.js version to 13.8.0 (11/06/2022) - @oim1
- fix: allow the use of removetimeout as alias for untimeout (11/06/2022) - @oim1
- fix: avatar command now accepts user id (10/06/2022) - @oim1, @benw202
- fix: metar units (05/06/2022) - @peregrine-developments
- refactor: add .ss as an alias to .screenshot (05/06/2022) - @benw202
- refactor: birthday permission order (01/06/2022) - @benw202

### May 2022

- fix : birthday list ordering (31/05/2022) - @peregrine-developments
- refactor: update wording in .cfms (27/05/2022) - @benw202
- refactor: .birthday command changes (25/05/2022) - @peregrine-developments, @benw202
- refactor: add .ninjo alias to .salty (16/05/2022) - @oim1
- feat: add birthday command (12/05/2022) - @peregrine-developments, @benw202
- refactor: weight and balance command (11/05/2022) - @Valastiri
- feat: recommended settings command (11/05/2022) - @Valastiri
- docs(exp): Update support wording (09/05/2022) - @benw202
- fix(dependabot): ignore patch versions (05/05/2022) - @NathanInnes, @benw202
- fix: reword .xbox command and change category (05/05/2022) - @Earthsam12, @Valastiri
- fix: Include stable in wx command (04/05/2022) - @Awemeter, @Valastiri
- chore: add dependabot config (02/05/2022) - @NathanInnes, @benw202

### April 2022

- refactor: updated Synaptic discord invite link (30/04/2022) - @nebula231, @benw202
- docs: copy changelog and command listing from docs repo (29/04/2022) - @Valastiri, @NathanInnes, @benw202
- ci: fix ci linting check (29/04/2022) - @NathanInnes
- feat: add headwind server invite link (26/04/2022) - @iamdumdum1234, @benw202
- feat: Wolfram Alpha command (26/04/2022) - @Zowlyfon, @benw202
- refactor: simbrief import link (25/04/2022) - @benw202, @Valastiri
- ci: eslint (25/04/2022) - @NathanInnes
- lint: fix existing linting issues (24/04/2022) - @NathanInnes
- feat: lat/long fixes cheatsheet (24/04/2022) - @nakajimayoshi, @benw202
- feat: add .msfsdisc (24/04/2022) - @oim1, @benw202
- fix: github command category change (23/04/2022) - @owen2007, @benw202
- feat: .zulu command (23/04/2022) - @Earthsam12, @benw202
- feat: salty server invite command (19/04/2022) - @nebula231, @NathanInnes
- feat: a32nx github link command (19/04/2022) - @ownen2007
- refactor(experimental): add new reporting thread to command (17/04/2022) - @Valastiri
- feat: translate command (16/04/2022) - @Valastiri
- feat(ping): add bad word filer (15/04/2022) - @NathanInnes
- fix(README): add light theme option (15/04/2022) - @NathanInnes, @benw202
- feat: add AIRAC command (14/04/2022) - @peregrine-developments, @Valastiri
- refactor(clean): remove search query string from hyperlink (13/04/2022) - @Valastiri
- feat: abb and abrv aliases to abbreviation command (13/04/2022) - @owen2007
- fix: various .metar improvements (12/04/2022) - @benw202
- fix: metar/station command error handling (12/04/2022) - @peregrine-developments
- feat: added .mico (12/04/2022) - @nebula231
- feat: add .abbreviations command (11/04/2022) - @peregrine-developments, @benw202
- fix: fixed hyperlink for calibrate command (11/04/2022) - @owen2007
- refactor: replace p3d (10/04/2022) - @NUT
- docs(README): update logo location (09/04/2022) - @NathanInnes
- feat: .pw command (08/04/2022) - @Earthsam12
- chore: adds the AGPLv3 license (08/04/2022) - @benw202
- fix: station units (01/04/2022) - @benw202

### March 2022

- feat: more detailed beginner guide command (30/03/2022) - @Valastiri, @NUT
- feat: add .count (29/03/2022) - @oim1, @benw202
- refactor: changed donate.ts name constructor from array to string (29/03/2022) - @nakajimayoshi
- feat: add .shomas (28/09/2022) - @oim1
- rafactor: experimental command info + copy layout (26/03/2022) - @Valastiri
- feat: tcas command (23/03/2022) - @Valastiri
- docs: update .experimental to reflect the new changes to the version (22/03/2022) - @oim1, @benw202
- fix: updated scamlogs to make links unclickable (18/03/2022) - @oim1
- feat: add suggested commands (18/03/2022) - @benw202, @Valastiri
- refactor: audio.ts command category (14/03/2022) - @Valastiri
- feat: make audio command (14/03/2022) - @Valastiri
- refactor: cfms command (14/03/2022) - @Valastiri
- fix: prevent various crashes in timeout and untimeout (12/03/2022) - @Earthsam12
- feat: .timeout (12/03/2022) - @Earthsam12
- feat: role assignment (10/03/2022) - @NUT
- refactor: update commands that reference status of experimental branch (06/03/2022) - @Valastiri
- fix: crash when old message deleted or updated (02/03/2022) - @benw202

### February 2022

- fix: DM crash (28/02/2022) - @benw202
- fix: whois offline status (28/02/2022) - @benw202
- fix: node_modules error (23/02/2022) - @benw202
- feat: update to discord.js v13 and API v9  (23/02/2022) - @benw202, @oim1, @kiwi2021, @NUT
