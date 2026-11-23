function role(job) {
  const extra = detail[job.id] || {};
  const { more = [], also = [], moreAbout = [], ...fields } = extra;
  return {
    type: "Full-time",
    status: "closed",
    bonus: [],
    stack: [],
    ...job,
    ...fields,
    about: [job.about, ...moreAbout].flat().filter(Boolean),
    responsibilities: [...job.responsibilities, ...more],
    requirements: [...job.requirements, ...also],
  };
}

const detail = {
  "bc-dev": {
    projectName: "Workflow result ledger",
    project:
      "This closed role sat on the ledger that records a workflow result so it can be checked later. Contracts, the event index, and the path from a transaction to a stored answer were the work. The role is closed.",
    moreAbout: [
      "A normal week was a contract change, the indexer that reads it, and a test for the case where the chain reorganizes. Notes had to be enough for another developer to replay the transaction without asking.",
    ],
    stack: ["Solidity or an equivalent contract language", "An indexer that reads chain events", "Tests for reverted calls, reorgs, and delayed finality", "A written replay for each transaction that matters"],
    team: "You would have worked with the blockchain group and the engineers who read the stored answer. The role is closed and is not the crypto arbitrage bot.",
    more: ["Publish the contract interface the rest of the product is allowed to call.", "Keep a list of events the indexer must not drop."],
    also: ["A shipped contract or indexer you can walk through from call to stored event."],
  },
  "bc-senior-lon": {
    projectName: "London chain services",
    project:
      "The London blockchain seat reviewed contract changes, kept the indexer honest across reorgs, and wrote down every upgrade. That work is closed. The open role is the crypto arbitrage bot, based in Austin or remote.",
    moreAbout: [
      "The London team needed a written record of each upgrade and a person who could explain a transaction to product. This posting stays on the list so that history is visible.",
    ],
    stack: ["Solidity on the contracts under review", "An indexer that survives reorgs and delayed blocks", "Upgrade notes stored with the change", "A chain client for reading the committed result"],
    team: "The seat was with the London blockchain group or remote. It did not own the arbitrage bot.",
    more: ["Name the person who can pause a contract, and the case that allows it.", "Pair with product on what an analyst sees after a commit."],
    also: ["You have supported a distributed team across time zones."],
  },
  "bc-staff": {
    projectName: "Chain architecture",
    project:
      "Staff scope was the shape of the chain system: which calls are allowed, how an upgrade happens, and what other engineers can rely on. The seat is closed.",
    moreAbout: [
      "The work lived in design reviews, incidents, and the few contracts everything else calls. A good week ended with a runbook the team actually used.",
    ],
    stack: ["Contract, indexer, and key-management architecture", "Upgrade and pause paths with a named owner", "Incident reviews turned into tests", "Writing for engineers outside the chain codebase"],
    team: "You would have advised product and security, and led reviews of changes that move value. The role is closed.",
    more: ["Decide what must never be on-chain, and write that down.", "Keep the threat model next to the contracts it describes."],
    also: ["You have taken a chain system through an upgrade, an audit, or an incident."],
  },
  "st-director": {
    projectName: "Annual company strategy",
    project:
      "The strategy project turns agentic analytics into a small set of funded bets. This closed director role owned the narrative, the markets Alteryx will play, and the motions that are no longer the plan.",
    moreAbout: [
      "The year had a written plan, an operating review, and a board brief that named the decision, the alternative, and the risk. The role is not open.",
    ],
    stack: ["The annual strategy memo", "Market and motion sizing before budget lock", "The operating review that checks a bet", "Board materials an executive can use alone"],
    team: "You would have worked with the executive team and the leads of product, go-to-market, and finance. The role is closed.",
    more: ["Name the three bets and the spend attached to each.", "Stop a workstream that the plan no longer supports."],
    also: ["You have taken a strategy from a memo to a budget someone else had to live with."],
  },
  "st-product": {
    projectName: "Product line strategy",
    project:
      "This closed role decided which product lines carry the agentic analytics strategy and which stay in maintenance. It connected the company plan to the roadmap.",
    moreAbout: [
      "The output was a narrative product and engineering could plan from, plus a list of proposals that did not change a customer outcome. Applications are closed.",
    ],
    stack: ["A strategy-to-roadmap map", "Planning narratives for product and engineering", "A check that shipped work still matches the plan", "Written outs of scope"],
    team: "You would have sat with product management and engineering leads. The role is closed.",
    more: ["Show how a customer moves from a report to an action they can defend.", "Pause a feature that does not serve the plan, in writing."],
    also: ["A roadmap you can explain as a customer job, without a slide."],
  },
  "st-gtm": {
    projectName: "Go-to-market motion",
    project:
      "The go-to-market project chooses the buyer, the offer, and the motion that carries agentic analytics. This lead role is closed.",
    moreAbout: [
      "A motion was not real until a quota-carrying team could use the proof. Win and loss notes were supposed to change the plan. The seat is closed.",
    ],
    stack: ["Buyer and job-to-be-done notes", "Offer, proof, and the handoff into sales", "A first-wave list of regions and segments", "Win and loss reviews"],
    team: "You would have worked with product marketing and sales leadership. The role is closed.",
    more: ["Write the proof a seller needs before the motion carries a number.", "Change the plan when the same loss shows up twice."],
    also: ["You have launched a motion a sales team actually used."],
  },
  "st-analytics": {
    projectName: "Customer decision map",
    project:
      "Consultants on this closed role sat with a customer before a platform decision and turned an analytics ambition into workflows Alteryx can run.",
    moreAbout: [
      "Each engagement ended with a decision map, the data those decisions use, and a plan the customer’s own analysts could continue. The role is closed.",
    ],
    stack: ["Working sessions that end in a written map", "A short list of workflows to automate first", "Notes product strategy can reuse", "Customer language, not a template"],
    team: "You would have worked beside the customer’s operators and the Alteryx strategy group. The role is closed.",
    more: ["Leave the customer able to point at the workflow that owns each decision.", "Bring back the pattern that showed up at more than one account."],
    also: ["You have sat with the people who do the work, not only with the sponsor."],
  },
  "st-partner": {
    projectName: "Partner plan",
    project:
      "Partner strategy chose which firms carry the Alteryx plan, what they may sell, and which alliances get executive time. This manager role is closed.",
    moreAbout: [
      "The year had tiers, a joint plan for a few partners, and a written rule for when a deal stays direct. Applications are closed.",
    ],
    stack: ["Partner tiers and the offer each tier can quote", "A short list of alliances with a joint plan", "Pipeline read against the strategy", "Rules for direct versus partner deals"],
    team: "You would have worked with alliances, sales, and the strategy lead. The role is closed.",
    more: ["Say which partner relationships do not get executive time this year.", "Review a partner deal that drifted off the offer."],
    also: ["You have run a partner program through a full plan year."],
  },
  "an-revenue": {
    projectName: "Strategy revenue model",
    project:
      "This closed analyst role kept the strategy honest in the numbers: pipeline, retention, expansion, and the workflows customers actually run.",
    moreAbout: [
      "The monthly read had to trace a surprising number back to a workflow or a motion. A metric that could not be reproduced did not ship. The role is closed.",
    ],
    stack: ["The model that ties a strategy bet to revenue", "A monthly operating read", "SQL or an analytics workflow", "Assumptions labeled in the model"],
    team: "You would have worked with finance, strategy, and the operators who own the motions. The role is closed.",
    more: ["Flag a bet that is funded and absent from the numbers.", "Show the path from a workflow event to the revenue line."],
    also: ["A model someone else has rerun without you in the room."],
  },
  "an-decision": {
    projectName: "Defensible decisions",
    project:
      "Decision science set the checks an automated answer must pass before a customer acts on it. This lead role is closed.",
    moreAbout: [
      "The standard covered the human review, the record of how a number was reached, and how often an answer is overturned. The role is closed.",
    ],
    stack: ["Checks a workflow must pass before it recommends an action", "A review step for high-stakes decisions", "A count of overturned answers and the reason", "Writing product and engineering can apply"],
    team: "You would have worked with analytics, product, and the engineers who ship the workflow. The role is closed.",
    more: ["Write the case where a person must stay in the loop.", "Keep an example of an answer that was defended, and one that was not."],
    also: ["You have put a model or a ruleset into a process people rely on."],
  },
  "ai-ml": {
    projectName: "Workflow models",
    project:
      "This closed engineering role put models inside an Alteryx workflow so an analyst can call a pinned version and rerun it. The seat is not open.",
    moreAbout: [
      "Training was against a written question. The inputs and the version stayed on the record. A model was retired when the check no longer held.",
    ],
    stack: ["Python training and evaluation", "A serving path a workflow can call", "Pinned model versions", "Logs of the inputs that produced an output"],
    team: "You would have worked with applied science and the workflow engineers. The role is closed.",
    more: ["Show an analyst the failure, not only the score.", "Refuse a model that cannot be rerun."],
    also: ["A serving path you have operated, not only a notebook."],
  },
  "ai-applied": {
    projectName: "Agent patterns",
    project:
      "Applied science on this closed role tested which agent behaviors Alteryx will trust inside a customer workflow, and where a person must stay in the loop.",
    moreAbout: [
      "The deliverable was a pattern product can build, with the limit attached, and an evaluation set another scientist can rerun. Applications are closed.",
    ],
    stack: ["Prototypes against real analytics tasks", "Measures for when an agent should stop and ask", "Evaluation sets checked into the project", "Written limits beside the result"],
    team: "You would have worked with product and the machine learning engineers. The role is closed.",
    more: ["Publish the handoff from agent to person.", "Drop a pattern the evaluation does not support."],
    also: ["Shipped work with language models or planning systems."],
  },
  "en-workflow": {
    projectName: "Workflow runtime",
    project:
      "This closed role built the runtime that keeps every step of an answer visible, from the question to the stored result.",
    moreAbout: [
      "Steps, retries, and the record an analyst opens were the product. A rerun on the same inputs had to match. The role is closed.",
    ],
    stack: ["Composable workflow steps", "Failures shown at the step that failed", "Identical reruns on the same inputs", "TypeScript or Python"],
    team: "You would have worked with platform engineering and the analysts who read the record. The role is closed.",
    more: ["Review a change that would hide a step from the user.", "Write the retry rule next to the step it covers."],
    also: ["You have owned a pipeline or a workflow runtime in production."],
  },
  "en-platform": {
    projectName: "Shared platform",
    project:
      "Staff platform work was identity, job execution, and the audit log the strategy depends on. Other teams were not allowed to reinvent those pieces. The role is closed.",
    moreAbout: [
      "Interfaces, the audit log, and the runbook for jobs customers wait on were the job. A design that bypassed the shared path was sent back.",
    ],
    stack: ["Identity and job execution", "An audit log complete enough to replay a decision", "Platform interfaces other teams must use", "Runbooks for customer-facing jobs"],
    team: "You would have set standards for product engineering. The role is closed.",
    more: ["Name the shared path and the cases that are not allowed to leave it.", "Keep the audit log reviewable by someone outside the platform team."],
    also: ["You have owned a shared system other teams shipped on."],
  },
  "pm-agentic": {
    projectName: "Agent answer surface",
    project:
      "This closed product role owned the moment an agent proposes an answer and a person accepts it: what they see, what they can change, and what is stored.",
    moreAbout: [
      "The roadmap followed the strategy. Customers who overturned an automated answer were part of the job. The role is closed.",
    ],
    stack: ["Problem and outcome written before design", "The review step on an agent proposal", "A stored record of the accepted answer", "Customer notes from overturned answers"],
    team: "You would have worked with design, engineering, and decision science. The role is closed.",
    more: ["Sequence work against the strategy, and say what waits.", "Describe the workflow without a slide."],
    also: ["5+ years on a shipped analytics, automation, or AI product, if that is not already how you got here."],
  },
  "cs-solutions": {
    projectName: "Buyer workflow",
    project:
      "Solutions consulting proved the strategy on a buyer’s real decision during the sales cycle. This role is closed.",
    moreAbout: [
      "The demo was a workflow the buyer recognized, and the notes were what delivery inherited. Saying the product was the wrong fit was part of the job.",
    ],
    stack: ["A discovery call turned into a workflow", "A live path from data to a defended answer", "Technical notes for the delivery team", "A clear no when the fit is wrong"],
    team: "You would have worked with account executives and professional services. The role is closed.",
    more: ["Build the workflow in the room, not only narrate it.", "Leave the buyer able to explain the steps."],
    also: ["Comfort with both the analyst and the executive in the same meeting."],
  },
  "cs-manager": {
    projectName: "Customer outcomes",
    project:
      "Customer success on this closed role kept a customer on the workflows the strategy promised and noticed when they stalled.",
    moreAbout: [
      "Outcomes were set after signature. Expansion waited until the current outcome was real. The role is closed.",
    ],
    stack: ["A written outcome for each customer", "A published adoption review", "Cases sent back to product when the strategy did not fit", "Notes another teammate can act on"],
    team: "You would have owned a book of customers with the solutions and services teams. The role is closed.",
    more: ["Name the decision each live workflow supports.", "Hold expansion when the current outcome is still a promise."],
    also: ["You have owned a book of analytics or software customers through a renewal."],
  },
  "cs-architect": {
    projectName: "First-year implementation",
    project:
      "Professional services architecture turned a sold outcome into a system that still runs after the project team leaves. This role is closed.",
    moreAbout: [
      "The plan named the workflows, the owners, and the checks. Product gaps went back with a reproduced case. Applications are closed.",
    ],
    stack: ["An implementation plan a customer can staff", "The workflows that carry the first outcomes", "An operating rhythm after go-live", "Escalations with a reproduced case"],
    team: "You would have worked with the customer’s team and with product. The role is closed.",
    more: ["Stay through go-live, not only through design.", "Leave architecture notes the customer can maintain."],
    also: ["You have delivered an analytics or automation project past go-live."],
  },
  "gtm-ae": {
    projectName: "Enterprise buying cycle",
    project:
      "This closed account executive role sold the agentic analytics outcome to enterprises that need an answer they can defend.",
    moreAbout: [
      "The cycle stayed tied to a decision the buyer already has, and to workflows Alteryx can deliver. The forecast named what was still unknown. The role is closed.",
    ],
    stack: ["A cycle built around one buyer decision", "Proposals limited to workflows the product can run", "A forecast with the unknowns written down", "A success plan handed over with the contract"],
    team: "You would have worked with solutions consulting and customer success. The role is closed.",
    more: ["Bring solutions in before the proposal invents a workflow.", "Sell the outcome to operators and to executives."],
    also: ["A cycle you can narrate from the first meeting to the signature."],
  },
  "fe-dev": {
    projectName: "Analyst workflow canvas",
    project:
      "This closed frontend role built the canvas where an analyst lays out a workflow and reads each step. The posting is closed.",
    moreAbout: [
      "The screen had to show the step that failed, the input it used, and the number it stored. A pretty layout that hid a step was a defect. The role is closed.",
    ],
    stack: ["React for the workflow canvas and the step inspector", "States for a running step, a failed step, and an empty canvas", "Keyboard access through the canvas", "Notes a designer can check against the built screen"],
    team: "You would have worked with design and the engineers who own the workflow runtime. The role is closed.",
    more: ["Show the failed step in the place the analyst is already looking.", "Keep the canvas usable when a workflow has many steps."],
    also: ["A shipped interface you can walk through from the empty state to the error state."],
  },
  "fe-senior": {
    projectName: "Answer review screen",
    project:
      "The senior frontend seat owned the screen where a person reviews an answer before they accept it. That work is closed.",
    moreAbout: [
      "The review had to name the workflow, the inputs, and what would be stored if the person accepted. The role did not own the arbitrage bot.",
    ],
    stack: ["React for the review screen and its states", "A layout that still works when the answer is long", "Shared UI pieces other product screens must use", "A written check for keyboard and screen-reader use"],
    team: "You would have set the UI path for the product engineering group. The role is closed.",
    more: ["Name which components other screens are allowed to copy.", "Pair with design before a new pattern ships."],
    also: ["You have led frontend work on a product other teams built on."],
  },
  "be-dev": {
    projectName: "Workflow step API",
    project:
      "This closed backend role built the API that runs one workflow step and writes down what it did. The role is closed.",
    moreAbout: [
      "A caller had to learn whether the step ran, failed, or is still going. The stored record had to match what the analyst sees. The role is closed.",
    ],
    stack: ["An API for starting a step and reading its result", "A record of the inputs, the output, and the error", "Retries that do not hide the first failure", "Tests for a slow step and a step that fails halfway"],
    team: "You would have worked with the workflow runtime and the frontend that shows the result. The role is closed.",
    more: ["Return an error the screen can show without a second translation.", "Keep a rerun on the same inputs identical."],
    also: ["A service you shipped that another team calls in production."],
  },
  "be-senior": {
    projectName: "Job execution service",
    project:
      "The senior backend seat owned how Alteryx runs customer jobs: the queue, the worker, and the audit line for each job. That seat is closed.",
    moreAbout: [
      "Other teams were not allowed to start their own runners. A job a customer waits on needed a runbook. The role is closed and is not the crypto arbitrage bot.",
    ],
    stack: ["A queue and a worker for customer jobs", "An audit line for start, finish, and failure", "Limits so one tenant cannot stall the rest", "A runbook for the jobs customers wait on"],
    team: "You would have worked with platform engineering and the teams that enqueue work. The role is closed.",
    more: ["Review designs that run work outside the shared service.", "Write the failure a support engineer can act on."],
    also: ["You have owned a job system other products shipped on."],
  },
  "fs-dev": {
    projectName: "Workflow result page",
    project:
      "This closed full stack role owned one path end to end: the page that asks for a result, the API that runs it, and the record that is stored. The role is closed.",
    moreAbout: [
      "The same person changed the screen and the service, so the label on the page matched the field in the API. The role is closed.",
    ],
    stack: ["React for the result page", "The API that starts the run and returns the stored answer", "A shared shape for the request and the response", "A test that fails when the page and the API disagree"],
    team: "You would have worked across the product screen and the workflow service. The role is closed.",
    more: ["Ship the page and the API in the same change when the shape moves.", "Show the stored answer, not a second copy the page invents."],
    also: ["A feature you shipped on both the interface and the service behind it."],
  },
  "fs-senior": {
    projectName: "Governed workflow builder",
    project:
      "The senior full stack seat owned the builder an analyst uses and the service that saves a governed workflow. That posting is closed.",
    moreAbout: [
      "A saved workflow had to reopen as the same steps, with the same owners and the same checks. The role is closed.",
    ],
    stack: ["React for the builder", "The service that stores a workflow and its owners", "Validation the screen and the API both enforce", "A reload test: save, leave, open, and see the same steps"],
    team: "You would have led work that crosses the builder and the platform services. The role is closed.",
    more: ["Keep governance rules in the service, and show them in the builder.", "Review a change that saves a step the screen cannot explain."],
    also: ["You have led a small group across a UI and the API it calls."],
  },
};

export const jobs = [
  role({
    id: "bc-senior",
    slug: "senior-blockchain-developer",
    title: "Senior Blockchain Developer, Crypto Arbitrage",
    department: "Blockchain",
    tone: "blue",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    status: "open",
    projectName: "Crypto arbitrage bot",
    summary:
      "Develop the arbitrage bot on the ongoing crypto trading project: read the prices, decide the gap is worth taking, and send the trade.",
    project: [
      "The crypto trading project is already running. Its arbitrage bot watches prices across the venues the desk uses, looks for a gap that still pays after fees and slippage, and sends the trade.",
      "You will develop that bot from the path it has today. The work is in the running project, with the order log, the fill log, and the people who watch the session.",
    ],
    about: [
      "This is the open role. You join the bot while it is being built, not a new effort beside it. The first weeks are reading the path the bot already takes, then changing the part that is unfinished or wrong.",
      "You will own how it reads a price, how it decides a gap is real, and how it writes down the order it sent. When a venue is slow, a price is stale, or a fill is partial, the bot should say so in the log.",
      "A change is finished when someone watching the session can see what the bot saw, what it sent, and why it stopped.",
    ],
    responsibilities: [
      "Develop the bot that compares prices across the venues this project already trades.",
      "Keep the decision in the open: the prices it read, the gap it calculated, and the order it sent.",
      "Account for fees, slippage, partial fills, and a venue that does not answer.",
      "Add tests that fail when the bot would trade on a stale price or a gap that does not cover its cost.",
      "Leave a runbook for the session: how to start the bot, how to stop it, and where the log goes.",
      "Review changes that touch order size, keys, or the venues the bot is allowed to use.",
      "Pair on the current branch of the bot before opening a new path.",
    ],
    stack: [
      "Solidity for the contracts the bot calls and for on-chain settlement",
      "A chain client and the exchange APIs this project already uses",
      "The order log and the fill log kept for each session",
      "Tests for stale prices, fees, partial fills, reorgs, and a missed response",
    ],
    team:
      "You join the blockchain developers on the crypto trading project. Someone already owns the bot. You will pair with that person, and with whoever watches the session, so the work is judged by what the bot did.",
    requirements: [
      "5+ years in software, with production work on trading systems or blockchain applications.",
      "Something you shipped that places or tracks orders, or a bot you can walk through from price to fill.",
      "Solidity, and you can read a contract call and an exchange API.",
      "You write the case where the price moves before the order lands.",
      "Notes a person can use while they watch the bot during a session.",
    ],
    bonus: [
      "Experience with both centralized venues and on-chain settlement.",
      "You have joined a trading bot that was already running.",
      "Work on data or workflow products, not only tokens.",
    ],
  }),
  role({
    id: "bc-dev",
    slug: "blockchain-developer",
    title: "Blockchain Developer",
    department: "Blockchain",
    tone: "blue",
    location: "Remote",
    places: ["Remote"],
    summary: "Ship smart contracts and the services that read them, with tests that fail when the chain state is wrong.",
    about:
      "This role builds the on-chain pieces Alteryx uses to record a workflow result so it can be checked later. You will write contracts, index the events they emit, and keep the path from a transaction to a stored answer easy to follow.",
    responsibilities: [
      "Implement and test smart contracts for recording and reading workflow results.",
      "Index chain events into the services the rest of the product reads.",
      "Handle retries, reorgs, and failed transactions without hiding the failure.",
      "Write notes another developer can use to replay a transaction.",
    ],
    requirements: [
      "2+ years building blockchain applications that shipped.",
      "Solidity or an equivalent contract language, and an indexer that reads those events.",
      "You test the unhappy path: reverted calls, delayed finality, and bad input.",
      "Comfort explaining a transaction to someone who does not write contracts.",
    ],
    bonus: ["Work with indexers, wallets, or account abstraction.", "Experience with audited contract codebases."],
  }),
  role({
    id: "bc-senior-lon",
    slug: "senior-blockchain-developer-london",
    title: "Senior Blockchain Developer",
    department: "Blockchain",
    tone: "blue",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Lead the London team’s chain work: contract reviews, the indexer, and the proof that a result was committed.",
    about:
      "This closed London role owned chain reviews, the indexer, and the proof that a result was committed. It is not the crypto arbitrage bot, and it is not accepting applications.",
    responsibilities: [
      "Review contract changes before they reach production.",
      "Keep the indexer correct across reorgs and delayed blocks.",
      "Pair with product on what an analyst needs to see after a commit.",
      "Leave a written record of every upgrade.",
    ],
    requirements: [
      "5+ years in software, including 3+ years on production blockchain systems.",
      "Solidity or an equivalent contract language, and you can review a contract change.",
      "You can walk through a transaction from the call to the stored event.",
      "Clear notes for people who do not write contracts.",
    ],
    bonus: ["Experience supporting a distributed team across time zones."],
  }),
  role({
    id: "bc-staff",
    slug: "staff-blockchain-developer",
    title: "Staff Blockchain Developer",
    department: "Blockchain",
    tone: "blue",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Set the technical direction for how Alteryx commits an answer on-chain and proves it afterward.",
    about:
      "Staff blockchain developers decide the shape of the system: which chain calls are allowed, how upgrades happen, and what the rest of engineering can rely on. You will spend time in design reviews, incidents, and the few contracts that everything else calls.",
    responsibilities: [
      "Set the architecture for contracts, indexing, and key management.",
      "Define the upgrade and pause paths, and the person who can use them.",
      "Lead reviews of changes that move value or rewrite history.",
      "Turn incidents into tests and runbooks the team actually uses.",
    ],
    requirements: [
      "8+ years in software, with deep production blockchain work.",
      "You have owned a system through an upgrade, an audit, or an incident.",
      "Clear writing for engineers who do not live in the chain codebase.",
      "Judgment about what should never be on-chain.",
    ],
    bonus: ["Experience advising product and security on chain risk."],
  }),
  role({
    id: "st-director",
    slug: "director-corporate-strategy",
    title: "Director of Corporate Strategy",
    department: "Strategy",
    tone: "gold",
    location: "Irvine or Remote",
    places: ["Irvine", "Remote"],
    summary: "Set the multi-year plan for agentic analytics: where Alteryx plays, what it stops, and how the bets are funded.",
    about:
      "This role owns the company strategy narrative. You will turn the agentic analytics direction into a small set of choices the executive team can fund, and you will say which markets and motions are no longer the plan.",
    responsibilities: [
      "Write the annual strategy and the three bets it depends on.",
      "Size markets and motions before a budget is locked.",
      "Run the operating review that checks whether a bet is still true.",
      "Brief the board with the decision, the alternative, and the risk.",
    ],
    requirements: [
      "10+ years in strategy, corporate development, or a general-manager seat.",
      "You have taken a strategy from a memo to a funded plan.",
      "Comfort with analytics products and how enterprises buy them.",
      "Writing an executive can use without a follow-up meeting.",
    ],
  }),
  role({
    id: "st-product",
    slug: "product-strategy-manager",
    title: "Product Strategy Manager",
    department: "Strategy",
    tone: "gold",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    summary: "Decide which product lines carry the agentic analytics strategy and which ones stay in maintenance.",
    about:
      "Product strategy connects the company plan to the roadmap. You will choose where new agent workflows belong, what stays on the current platform, and how a customer moves from a report to an action they can defend.",
    responsibilities: [
      "Map the strategy to product lines and say what is out of scope.",
      "Write the narrative product and engineering use in planning.",
      "Track whether shipped work still matches the strategy.",
      "Kill or pause proposals that do not change a customer outcome.",
    ],
    requirements: [
      "6+ years in product strategy or product management.",
      "A roadmap you can explain in terms of a customer job.",
      "You can say no to a feature that does not serve the plan.",
    ],
  }),
  role({
    id: "st-gtm",
    slug: "go-to-market-strategy-lead",
    title: "Go-to-Market Strategy Lead",
    department: "Strategy",
    tone: "gold",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Choose how Alteryx sells agentic analytics: who the buyer is, what the offer is, and which motion carries it.",
    about:
      "This role sets the go-to-market plan behind the strategy. You will define the buyer, the packaging, and the proof a sales team needs before a new motion is asked to carry a number.",
    responsibilities: [
      "Name the buyer and the job they hire Alteryx to do.",
      "Design the offer, the proof, and the handoff into sales.",
      "Decide which regions and segments get the motion first.",
      "Review win and loss notes and change the plan when the pattern is clear.",
    ],
    requirements: [
      "7+ years in go-to-market, product marketing, or sales strategy.",
      "You have launched a motion that a quota-carrying team used.",
      "Clear writing for sellers, not only for other strategists.",
    ],
  }),
  role({
    id: "st-analytics",
    slug: "analytics-strategy-consultant",
    title: "Analytics Strategy Consultant",
    department: "Strategy",
    tone: "gold",
    location: "Remote",
    places: ["Remote"],
    summary: "Help customers turn an analytics ambition into a workflow plan Alteryx can actually run.",
    about:
      "Consultants in this role sit with a customer before a platform decision. You will map the decisions they need to defend, the data those decisions use, and the workflow that should own each one.",
    responsibilities: [
      "Run working sessions that end with a written decision map.",
      "Recommend the workflows worth automating first.",
      "Leave a plan the customer’s own analysts can continue.",
      "Feed patterns back into product strategy.",
    ],
    requirements: [
      "5+ years in analytics consulting or an internal strategy role.",
      "You have sat with operators, not only with executive sponsors.",
      "Comfort turning a messy process into a sequence of steps.",
    ],
  }),
  role({
    id: "st-partner",
    slug: "partner-strategy-manager",
    title: "Partner Strategy Manager",
    department: "Strategy",
    tone: "gold",
    location: "Irvine or Remote",
    places: ["Irvine", "Remote"],
    summary: "Decide which partners carry the Alteryx strategy and what each one is asked to sell.",
    about:
      "Partner strategy chooses the firms that extend the platform. You will set the tiers, the offers partners can quote, and the few relationships that get executive time.",
    responsibilities: [
      "Set partner tiers and the offer each tier can take to market.",
      "Choose which alliances get a joint plan this year.",
      "Review partner pipeline against the strategy, not only against revenue.",
      "Write the rules for when a deal stays direct.",
    ],
    requirements: [
      "6+ years in partnerships, alliances, or channel strategy.",
      "You have run a partner program through a plan year.",
      "Judgment about where a partner helps and where it adds noise.",
    ],
  }),
  role({
    id: "an-revenue",
    slug: "revenue-strategy-analyst",
    title: "Revenue Strategy Analyst",
    department: "Analytics",
    tone: "teal",
    location: "Irvine or Remote",
    places: ["Irvine", "Remote"],
    summary: "Build the models that show whether the strategy is showing up in pipeline, retention, and expansion.",
    about:
      "This analyst keeps the strategy honest. You will connect the plan to pipeline, retention, and the workflows customers actually run, and you will flag when a bet is not appearing in the numbers.",
    responsibilities: [
      "Maintain the model that ties strategy bets to revenue.",
      "Publish a monthly read the operating team uses.",
      "Trace a surprising number back to the workflow or the motion.",
      "Refuse a metric that cannot be reproduced.",
    ],
    requirements: [
      "3+ years in revenue analytics, FP&A, or a similar seat.",
      "SQL or an analytics workflow tool you use every week.",
      "You label assumptions in the model, not in a side conversation.",
    ],
  }),
  role({
    id: "an-decision",
    slug: "decision-science-lead",
    title: "Decision Science Lead",
    department: "Analytics",
    tone: "teal",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    summary: "Design how an automated answer is checked before a customer acts on it.",
    about:
      "Decision science sets the standard for an answer that can be defended. You will define the checks, the human review, and the record that shows how a number was reached.",
    responsibilities: [
      "Write the checks a workflow must pass before it recommends an action.",
      "Design the review step for high-stakes decisions.",
      "Measure how often an automated answer is overturned, and why.",
      "Teach product and engineering what “explainable” means in practice.",
    ],
    requirements: [
      "6+ years in decision science, analytics, or a related field.",
      "You have put a model or a ruleset into a process people rely on.",
      "Clear explanations for people who will not read the method section.",
    ],
  }),
  role({
    id: "ai-ml",
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    department: "AI",
    tone: "pink",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Ship the models that sit inside an Alteryx workflow and can be rerun with the same result.",
    about:
      "This role puts models where an analyst can see them. You will train, evaluate, and serve models that a workflow can call, and you will keep the inputs and the version on the record.",
    responsibilities: [
      "Train and evaluate models against a written question.",
      "Serve them so a workflow can call a pinned version.",
      "Log the inputs that produced an output.",
      "Retire a model when the check no longer holds.",
    ],
    requirements: [
      "4+ years shipping machine learning, not only notebooks.",
      "Python and a serving path you have operated.",
      "You can explain a failure to an analyst.",
    ],
  }),
  role({
    id: "ai-applied",
    slug: "applied-scientist-agentic-analytics",
    title: "Applied Scientist, Agentic Analytics",
    department: "AI",
    tone: "pink",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    summary: "Research the agent patterns Alteryx will trust inside a customer workflow.",
    about:
      "Applied scientists decide which agent behaviors belong in the product. You will test plans, tool use, and handoffs, and you will write down the cases where a person must stay in the loop.",
    responsibilities: [
      "Prototype agent flows against real analytics tasks.",
      "Measure when an agent should stop and ask.",
      "Publish the pattern product can build, with the limits attached.",
      "Keep evaluation sets that another scientist can rerun.",
    ],
    requirements: [
      "A graduate degree or equivalent applied research experience.",
      "Shipped work with language models or planning systems.",
      "You write the limit of a method as clearly as the result.",
    ],
  }),
  role({
    id: "en-workflow",
    slug: "senior-workflow-engineer",
    title: "Senior Workflow Engineer",
    department: "Engineering",
    tone: "blue",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    summary: "Build the workflow runtime that keeps every step of an answer visible.",
    about:
      "Workflow engineers own the path from a question to a stored result. You will design steps, retries, and the record an analyst opens when they need to see how a number was made.",
    responsibilities: [
      "Design workflow steps the product can compose.",
      "Make failures visible at the step that failed.",
      "Keep a rerun on the same inputs identical.",
      "Review changes that hide a step from the user.",
    ],
    requirements: [
      "5+ years building backend or data systems.",
      "You have owned a pipeline or a workflow runtime in production.",
      "TypeScript, Python, or a similar language you can teach with.",
    ],
  }),
  role({
    id: "en-platform",
    slug: "staff-platform-engineer",
    title: "Staff Platform Engineer",
    department: "Engineering",
    tone: "blue",
    location: "Irvine or Remote",
    places: ["Irvine", "Remote"],
    summary: "Set how Alteryx runs the platform the strategy depends on: identity, jobs, and the audit log.",
    about:
      "Staff platform engineers decide the shared pieces. You will own identity, job execution, and the audit log other teams are not allowed to reinvent.",
    responsibilities: [
      "Set the platform interfaces product teams must use.",
      "Keep the audit log complete enough to replay a decision.",
      "Review designs that bypass the shared path.",
      "Write the runbook for the jobs customers wait on.",
    ],
    requirements: [
      "8+ years in platform or infrastructure engineering.",
      "You have owned a shared system other teams shipped on.",
      "Clear standards, written down, that survive a reorg.",
    ],
  }),
  role({
    id: "pm-agentic",
    slug: "senior-product-manager-agentic-analytics",
    title: "Senior Product Manager, Agentic Analytics",
    department: "Product",
    tone: "pink",
    location: "Irvine or Remote",
    places: ["Irvine", "Remote"],
    summary: "Own the product surface where an agent proposes an answer and a person accepts it.",
    about:
      "This product manager owns the moment an agent offers an answer. You will decide what the person sees, what they can change, and what is stored so the answer can be defended later.",
    responsibilities: [
      "Write the problem and the outcome before a design starts.",
      "Decide the review step for an agent’s proposal.",
      "Sequence the roadmap against the strategy, not against a feature list.",
      "Sit with customers who overturned an automated answer.",
    ],
    requirements: [
      "5+ years as a product manager on a shipped product.",
      "Experience with analytics, automation, or AI products.",
      "You can describe a workflow without a slide.",
    ],
  }),
  role({
    id: "cs-solutions",
    slug: "solutions-consultant",
    title: "Solutions Consultant",
    department: "Customer Success",
    tone: "teal",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Show a buyer the workflow Alteryx would run for their decision, using their language.",
    about:
      "Solutions consultants prove the strategy on a real problem. You will build a short workflow in the sales cycle and leave the buyer able to explain the steps.",
    responsibilities: [
      "Turn a discovery call into a workflow the buyer recognizes.",
      "Demo the path from data to a defended answer.",
      "Write the technical notes the delivery team inherits.",
      "Say when the product is the wrong fit.",
    ],
    requirements: [
      "4+ years in solutions consulting, presales, or analytics delivery.",
      "You can build a workflow live, not only narrate one.",
      "Comfort in a room with both analysts and executives.",
    ],
  }),
  role({
    id: "cs-manager",
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    department: "Customer Success",
    tone: "teal",
    location: "Remote",
    places: ["Remote"],
    summary: "Keep a customer on the workflows the strategy promised, and notice when they stall.",
    about:
      "Customer success owns the outcome after the signature. You will track which workflows are in use, which decisions they support, and where a customer needs a different plan.",
    responsibilities: [
      "Set the outcomes a customer hired Alteryx to reach.",
      "Review workflow adoption on a schedule you publish.",
      "Bring product the cases where the strategy did not fit.",
      "Hand expansion only when the current outcome is real.",
    ],
    requirements: [
      "4+ years in customer success or account management.",
      "You have owned a book of analytics or software customers.",
      "Notes another teammate can act on without you in the room.",
    ],
  }),
  role({
    id: "cs-architect",
    slug: "professional-services-architect",
    title: "Professional Services Architect",
    department: "Customer Success",
    tone: "teal",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Design the customer implementation so the strategy survives the first year in production.",
    about:
      "Architects in professional services turn a sold outcome into a running system. You will choose the workflows, the owners, and the checks that stay after the project team leaves.",
    responsibilities: [
      "Write the implementation plan a customer can staff.",
      "Design the workflows that carry the first outcomes.",
      "Set the operating rhythm for after go-live.",
      "Escalate product gaps with a reproduced case.",
    ],
    requirements: [
      "6+ years delivering analytics or automation projects.",
      "You have stayed through go-live, not only through design.",
      "Architecture notes a customer’s own team can maintain.",
    ],
  }),
  role({
    id: "gtm-ae",
    slug: "enterprise-account-executive",
    title: "Enterprise Account Executive",
    department: "Go-to-Market",
    tone: "ink",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    summary: "Sell the agentic analytics outcome to enterprises that need an answer they can defend.",
    about:
      "Account executives carry the strategy into a buying process. You will sell the outcome, not a feature list, and you will bring solutions in before a proposal invents a workflow the product cannot run.",
    responsibilities: [
      "Run a cycle around a decision the buyer already has to make.",
      "Keep the proposal tied to workflows Alteryx can deliver.",
      "Forecast from evidence, and write down what is still unknown.",
      "Hand the customer a success plan, not only a contract.",
    ],
    requirements: [
      "5+ years selling enterprise software.",
      "A cycle you can narrate from first meeting to signature.",
      "Comfort selling analytics to operators and to executives.",
    ],
  }),
  role({
    id: "fe-dev",
    slug: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    tone: "blue",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    summary: "Build the canvas where an analyst lays out a workflow and reads each step.",
    about:
      "Frontend developers on this closed role owned the analyst canvas. You would have shown each step, the input it used, and the number it stored. The role is closed.",
    responsibilities: [
      "Build the canvas and the step inspector the analyst uses.",
      "Show a running step, a failed step, and an empty canvas as different states.",
      "Keep the failed step visible without a second screen.",
      "Check the canvas with a keyboard before it ships.",
    ],
    requirements: [
      "3+ years building product interfaces that shipped.",
      "React, and a screen you can walk from the empty state to the error state.",
      "You treat a hidden step as a defect.",
    ],
  }),
  role({
    id: "fe-senior",
    slug: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    department: "Engineering",
    tone: "blue",
    location: "Irvine or Remote",
    places: ["Irvine", "Remote"],
    summary: "Own the screen where a person reviews an answer before they accept it.",
    about:
      "The senior frontend role owned the review screen: the workflow, the inputs, and what is stored if the person accepts. It is closed and is not the crypto arbitrage bot.",
    responsibilities: [
      "Own the review screen and the states it can be in.",
      "Keep a long answer readable without hiding the source workflow.",
      "Set the shared UI pieces other product screens must use.",
      "Review interface changes that invent a new pattern.",
    ],
    requirements: [
      "6+ years building product interfaces.",
      "You have led frontend work that other teams built on.",
      "React, and a written check for keyboard and screen-reader use.",
    ],
  }),
  role({
    id: "be-dev",
    slug: "backend-developer",
    title: "Backend Developer",
    department: "Engineering",
    tone: "blue",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Build the API that runs one workflow step and writes down what it did.",
    about:
      "Backend developers on this closed role owned the step API. A caller had to learn whether the step ran, failed, or is still going, and the stored record had to match the screen. The role is closed.",
    responsibilities: [
      "Build the API that starts a step and returns its result.",
      "Store the inputs, the output, and the error on the same record.",
      "Retry without hiding the first failure.",
      "Test a slow step and a step that fails halfway.",
    ],
    requirements: [
      "3+ years building services that shipped.",
      "A service you can walk from the request to the stored result.",
      "You return an error the screen can show without a second translation.",
    ],
  }),
  role({
    id: "be-senior",
    slug: "senior-backend-developer",
    title: "Senior Backend Developer",
    department: "Engineering",
    tone: "blue",
    location: "Austin or Remote",
    places: ["Austin", "Remote"],
    summary: "Own how customer jobs run: the queue, the worker, and the audit line for each job.",
    about:
      "The senior backend role owned job execution for work a customer waits on. Other teams were not allowed to start their own runners. The role is closed.",
    responsibilities: [
      "Own the queue and the worker for customer jobs.",
      "Write an audit line for start, finish, and failure.",
      "Keep one tenant from stalling the rest.",
      "Review designs that run work outside this service.",
    ],
    requirements: [
      "6+ years building backend systems in production.",
      "You have owned a job system other products shipped on.",
      "A runbook a support engineer can use while a job is failing.",
    ],
  }),
  role({
    id: "fs-dev",
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    tone: "blue",
    location: "Remote",
    places: ["Remote"],
    summary: "Own one path from the result page to the API that runs it and the record that is stored.",
    about:
      "Full stack developers on this closed role changed the page and the service together, so the label on the screen matched the field in the API. The role is closed.",
    responsibilities: [
      "Build the result page and the API behind it.",
      "Keep one shape for the request and the response.",
      "Ship the page and the API in the same change when that shape moves.",
      "Show the stored answer, not a second copy the page invents.",
    ],
    requirements: [
      "3+ years shipping features across an interface and a service.",
      "React, and an API you can explain from the button to the stored row.",
      "A test that fails when the page and the API disagree.",
    ],
  }),
  role({
    id: "fs-senior",
    slug: "senior-full-stack-developer",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    tone: "blue",
    location: "London or Remote",
    places: ["London", "Remote"],
    summary: "Lead the builder an analyst uses and the service that saves a governed workflow.",
    about:
      "The senior full stack role owned the builder and the save path. A saved workflow had to reopen as the same steps, with the same owners and the same checks. The role is closed.",
    responsibilities: [
      "Lead the builder and the service that stores a workflow.",
      "Keep governance rules in the service and show them in the builder.",
      "Validate the same rules on the screen and in the API.",
      "Review a change that saves a step the screen cannot explain.",
    ],
    requirements: [
      "6+ years across product interfaces and the services behind them.",
      "You have led a small group across a UI and the API it calls.",
      "A reload test: save, leave, open, and see the same steps.",
    ],
  }),
];

export function queryJobs(source, { q, department, location } = {}) {
  const query = (q || "").trim().toLowerCase();
  return source.filter((job) => {
    if (department && department !== "All" && job.department !== department) return false;
    if (location && location !== "All" && !job.places.includes(location)) return false;
    if (!query) return true;
    const text = (value) => (Array.isArray(value) ? value.join(" ") : value || "");
    const hay = (job.status === "closed"
      ? [job.title, job.department, job.location]
      : [job.title, job.department, job.location, job.projectName, job.summary, text(job.project), text(job.about)]
    )
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  }).sort((a, b) => Number(a.status === "closed") - Number(b.status === "closed"));
}

export function queryJob(source, slug) {
  return source.find((job) => job.slug === slug || job.id === slug) || null;
}

export function queryDepartments(source) {
  const counts = new Map();
  for (const job of source) {
    const current = counts.get(job.department) || { count: 0, open: 0, tone: job.tone };
    current.count += 1;
    if (job.status !== "closed") current.open += 1;
    counts.set(job.department, current);
  }
  return [...counts.entries()].map(([name, info]) => ({ name, ...info }));
}

export function queryLocations(source) {
  return [...new Set(source.flatMap((job) => job.places))].sort();
}

export function listJobs(options) {
  return queryJobs(jobs, options);
}

export function getJob(slug) {
  return queryJob(jobs, slug);
}

export function departments() {
  return queryDepartments(jobs);
}

export function locations() {
  return queryLocations(jobs);
}
