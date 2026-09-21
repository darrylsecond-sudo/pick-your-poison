/*
  PICK YOUR POISON — QUESTION BANK
  --------------------------------
  This is the main file you will edit when you want to add, remove, or revise prompts.

  intensity guide:
    1 = easy / low-stakes
    2 = bolder
    3 = daring (may show the playful “Pass — Coward.” button)

  hostSpecific:
    true  = prompt involves the birthday host / Birthday Prince
    false = general party prompt
*/

window.PYP_DATA = {
  settings: {
    hostLabel: "the birthday prince",
    rareChance: 0.08, // 8%. Change to 0.05 for 5%, 0.10 for 10%, etc.
    historyLimit: 5,
    rareLabels: ["RARE POISON", "THE GARDEN CHOSE VIOLENCE", "FERAL FATE"]
  },

  categories: {
    sip: {
      label: "SIP",
      icon: "🥂",
      tagline: "Flirty. Playful. Easy to swallow.",
      questions: [
        { id: "SIP-01", text: "Point to the person here whose outfit deserves its own entrance music.", hostSpecific: false, intensity: 1 },
        { id: "SIP-02", text: "Give someone nearby a compliment they probably have not heard before.", hostSpecific: false, intensity: 1 },
        { id: "SIP-03", text: "What is your most harmlessly chaotic personality trait?", hostSpecific: false, intensity: 1 },
        { id: "SIP-04", text: "Choose someone here and assign them a dramatic royal title for the next ten minutes.", hostSpecific: false, intensity: 1 },
        { id: "SIP-05", text: "Tell the birthday prince the first thing you noticed about him tonight.", hostSpecific: true, intensity: 1 },
        { id: "SIP-06", text: "Who here looks most likely to accidentally become the main character tonight?", hostSpecific: false, intensity: 1 },
        { id: "SIP-07", text: "Describe your current dating life using only the title of a movie.", hostSpecific: false, intensity: 1 },
        { id: "SIP-08", text: "Pick a song that should play during the birthday prince’s dramatic entrance.", hostSpecific: true, intensity: 1 }
      ]
    },

    spill: {
      label: "SPILL",
      icon: "🍷",
      tagline: "A little truth looks good on you.",
      questions: [
        { id: "SPILL-01", text: "What is something you pretend not to care about but absolutely do?", hostSpecific: false, intensity: 2 },
        { id: "SPILL-02", text: "What compliment can instantly disarm you?", hostSpecific: false, intensity: 2 },
        { id: "SPILL-03", text: "What is one red flag you once mistook for chemistry?", hostSpecific: false, intensity: 2 },
        { id: "SPILL-04", text: "What is the pettiest reason you have ever lost interest in someone?", hostSpecific: false, intensity: 2 },
        { id: "SPILL-05", text: "Which version of yourself are you quietly trying to become this year?", hostSpecific: false, intensity: 2 },
        { id: "SPILL-06", text: "Who in this room gives you the strongest ‘I could tell you a secret’ energy?", hostSpecific: false, intensity: 2 },
        { id: "SPILL-07", text: "Tell the birthday prince one quality of his that deserves more hype.", hostSpecific: true, intensity: 2 },
        { id: "SPILL-08", text: "What is a romantic gesture that would work on you embarrassingly fast?", hostSpecific: false, intensity: 2 }
      ]
    },

    feral: {
      label: "FERAL",
      icon: "🔥",
      tagline: "Bad decisions, beautifully presented.",
      questions: [
        { id: "FERAL-01", text: "Choose two people who have not talked much tonight. Introduce them with completely invented backstories.", hostSpecific: false, intensity: 2 },
        { id: "FERAL-02", text: "Let the group rename you. You must answer to the new name for the next hour.", hostSpecific: false, intensity: 3 },
        { id: "FERAL-03", text: "Find the birthday prince. Give him your best pickup line. He gets to rate it out of ten.", hostSpecific: true, intensity: 3 },
        { id: "FERAL-04", text: "Choose someone here to be your sworn nemesis for ten minutes. Maintain the bit.", hostSpecific: false, intensity: 2 },
        { id: "FERAL-05", text: "Start a dramatic slow clap for absolutely no reason. Commit until at least three people join you.", hostSpecific: false, intensity: 3 },
        { id: "FERAL-06", text: "Take a group photo that looks like the cover of a scandalous memoir.", hostSpecific: false, intensity: 2 },
        { id: "FERAL-07", text: "Choose one person to deliver a 15-second toast to your most questionable life choice.", hostSpecific: false, intensity: 2 },
        { id: "FERAL-08", text: "Convince someone nearby that the birthday prince has secretly assigned you an important ceremonial duty tonight.", hostSpecific: true, intensity: 3 }
      ]
    },

    afterdark: {
      label: "AFTER DARK",
      icon: "🌙",
      tagline: "For consenting grown-ups after moonrise.",
      questions: [
        { id: "DARK-01", text: "What is the fastest way someone can become dangerously attractive to you?", hostSpecific: false, intensity: 2 },
        { id: "DARK-02", text: "Who here has the strongest ‘bad idea, great story’ energy?", hostSpecific: false, intensity: 2 },
        { id: "DARK-03", text: "What is something subtle someone can do that instantly feels intimate to you?", hostSpecific: false, intensity: 2 },
        { id: "DARK-04", text: "Describe your flirting style in three words. Let the group decide whether they believe you.", hostSpecific: false, intensity: 2 },
        { id: "DARK-05", text: "If you had to choose: unforgettable kiss, unforgettable date, or unforgettable morning after? Defend your answer.", hostSpecific: false, intensity: 3 },
        { id: "DARK-06", text: "Tell someone here the most attractive non-physical thing about them.", hostSpecific: false, intensity: 2 },
        { id: "DARK-07", text: "Ask the birthday prince a question you would only ask after midnight. He may answer or pass.", hostSpecific: true, intensity: 3 },
        { id: "DARK-08", text: "What kind of tension do you enjoy most: eye contact, banter, anticipation, or being pursued?", hostSpecific: false, intensity: 2 }
      ]
    }
  },

  rareQuestions: [
    { id: "RARE-01", category: "feral", text: "The garden demands a toast. Choose the person least prepared and give them 20 seconds to toast the birthday prince.", hostSpecific: true, intensity: 3 },
    { id: "RARE-02", category: "feral", text: "For the next five minutes, every time someone says your name, you must respond with an extravagant bow.", hostSpecific: false, intensity: 3 },
    { id: "RARE-03", category: "spill", text: "Choose one person. Each of you must say one thing you genuinely admire about the other. No jokes until both answers are finished.", hostSpecific: false, intensity: 2 },
    { id: "RARE-04", category: "sip", text: "You have been blessed by the garden. Choose someone else to draw immediately. They cannot refuse the category you choose for them.", hostSpecific: false, intensity: 2 },
    { id: "RARE-05", category: "afterdark", text: "Name the kind of chemistry that gets you in the most trouble. You may answer vaguely, but you must answer.", hostSpecific: false, intensity: 3 },
    { id: "RARE-06", category: "feral", text: "Find three people and stage a ten-second living portrait titled: ‘Forty, Feral, and Entirely Unsupervised.’", hostSpecific: false, intensity: 3 }
  ]
};
