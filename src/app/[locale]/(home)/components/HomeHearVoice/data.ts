export type TranscriptMessage = {
  speaker: 'client' | 'coldi';
  text: string;
  start: number;
  end: number;
};

export const transcripts: Record<string, TranscriptMessage[]> = {
  insurance: [
    {
      speaker: 'coldi',
      text: 'Hi, this is Kate, an AI virtual assistant from insurance. Am I speaking with.',
      start: 0.88,
      end: 5.64,
    },

    {
      speaker: 'client',
      text: 'Yes, you are. Hi, Kate.',
      start: 7.34,
      end: 8.58,
    },

    {
      speaker: 'coldi',
      text: 'Thanks. I’m calling about the car insurance for your Honda Civic, which expires in 10 days. The current rate is €480 a year. Would you like to renew it?',
      start: 10.06,
      end: 20.12,
    },

    {
      speaker: 'client',
      text: 'Yes, I would. Can I get some discounts maybe?',
      start: 21.84,
      end: 25.98,
    },

    {
      speaker: 'coldi',
      text: 'Let me check that for you. Yes… You’ve been with us for six years, so I can give you a loyalty discount of €15. Would that work for you?',
      start: 26.82,
      end: 35.96,
    },

    {
      speaker: 'client',
      text: 'Oh, that’s pretty cool. Yes, that would work. Thank you.',
      start: 37.36,
      end: 41.34,
    },

    {
      speaker: 'coldi',
      text: 'Wonderful. I’m sending you the payment link by SMS right now. Did you get it?',
      start: 42.22,
      end: 46.52,
    },

    {
      speaker: 'client',
      text: 'Hold them, please. Oh, yeah, it just came through. Got it.',
      start: 51.3,
      end: 58.26,
    },

    {
      speaker: 'coldi',
      text: 'Perfect. Thank you very much. Have a great day.',
      start: 59.12,
      end: 61.7,
    },
  ],

  trading: [
    {
      speaker: 'client',
      text: 'Yes?',
      start: 0.94,
      end: 1.06,
    },

    {
      speaker: 'coldi',
      text: 'Hi, Am I speaking with….',
      start: 1.18,
      end: 2.54,
    },

    {
      speaker: 'client',
      text: 'You?',
      start: 4.4,
      end: 4.54,
    },

    {
      speaker: 'coldi',
      text: "Speaking? Safiso, it's from. I noticed you recently showed interest in online trading, so I'm just following up to help you get everything activated. Have you got a quick minute?",
      start: 4.64,
      end: 18.32,
    },

    {
      speaker: 'client',
      text: "Yes. I'm interested on online trading. How does it work?",
      start: 20.98,
      end: 24.44,
    },

    {
      speaker: 'coldi',
      text: "Fair question. The platform tracks stocks, crypto and global indices faster than any human could. The minute it spots an opportunity, it alerts you. The decision and the trade are always yours. You don't have to stare at charts or worry. And your trading specialist walks you through everything, step by step. Shall I confirm a quick detail so I can pass you over?",
      start: 26.02,
      end: 45.84,
    },

    {
      speaker: 'client',
      text: 'So after how long would I be able to withdraw?',
      start: 49.9,
      end: 52.82,
    },

    {
      speaker: 'coldi',
      text: 'Withdrawals normally take about one to three business days, depending on your bank or payment method. You can request a withdrawal at any time with no restrictions. Now, to help get your account set up. May I know your age?',
      start: 54.4,
      end: 68.66,
    },

    {
      speaker: 'client',
      text: "Yes, I'm 50 years old.",
      start: 70.76,
      end: 71.82,
    },

    {
      speaker: 'coldi',
      text: 'Got it. And what do you currently do for work?',
      start: 73.18,
      end: 75.52,
    },

    {
      speaker: 'client',
      text: "Well, I'm self employed. I'm a street vendor.",
      start: 78.08,
      end: 81.06,
    },

    {
      speaker: 'coldi',
      text: 'Perfect. And roughly what is your general monthly income?',
      start: 82.28,
      end: 87.04,
    },

    {
      speaker: 'client',
      text: "It's plus or minus 9,000.",
      start: 89.68,
      end: 93.18,
    },

    {
      speaker: 'coldi',
      text: "That's completely fine. No problem. Understood. All right. Everything looks in order. Getting started is simple. The 250 US dollar activation can be done by debit or credit card, ecocash, crypto, wallet or bank transfer. Whatever's easiest for you. It's not a fee, it's your trading balance. And the aim is to grow it from there. I'll now connect you with your dedicated trading specialist to complete the activation.",
      start: 94.36,
      end: 119.8,
    },

    {
      speaker: 'client',
      text: 'Okay, perfect.',
      start: 119.86,
      end: 123.88,
    },

    {
      speaker: 'coldi',
      text: "I'll put you through now. Just stay on the line.",
      start: 124.4,
      end: 126.66,
    },
  ],

  'debt-collection': [
    {
      speaker: 'coldi',
      text: 'Hi, this is Emma calling on behalf of. Could I please speak with Sezgin?',
      start: 0.32,
      end: 5.4,
    },
    {
      speaker: 'client',
      text: "Yeah, it's me,.",
      start: 6.96,
      end: 7.56,
    },
    {
      speaker: 'coldi',
      text: "Sezgin. I'm calling regarding your account with. Before I go into the details, I'd like to quickly confirm a couple of things we have on file. It'll only take a moment, is that okay?",
      start: 8.84,
      end: 20.72,
    },
    {
      speaker: 'client',
      text: 'Yep.',
      start: 22.08,
      end: 22.22,
    },
    {
      speaker: 'coldi',
      text: 'We have an email address, Is that still correct?',
      start: 23.46,
      end: 30.08,
    },
    {
      speaker: 'client',
      text: 'Yes,....',
      start: 31.36,
      end: 31.62,
    },
    {
      speaker: 'coldi',
      text: 'Got it. We also have your home address on file. Is that still current?',
      start: 33.02,
      end: 36.76,
    },
    {
      speaker: 'client',
      text: 'Yeah,....',
      start: 40.52,
      end: 40.66,
    },
    {
      speaker: 'coldi',
      text: "Thanks for confirming your address. I'm calling about an outstanding balance on your account. We're reaching out to make sure you're aware of the current position and to arrange a confidential consultation with a specialist to go over your options. How would you like to handle this today? Were you looking to set up a repayment arrangement or would you prefer to schedule a call back to speak with a specialist directly?",
      start: 44.52,
      end: 68.32,
    },
    {
      speaker: 'client',
      text: 'Yeah, for a repayment for next week,...',
      start: 70.02,
      end: 72.22,
    },
    {
      speaker: 'coldi',
      text: 'Sure. What weekly or monthly amount would feel manageable for you?',
      start: 73.54,
      end: 76.6,
    },
    {
      speaker: 'client',
      text: 'Yep.',
      start: 77.88,
      end: 78.08,
    },
    {
      speaker: 'coldi',
      text: "Could you please tell me the amount you'd like to pay? Weekly or Monthly?",
      start: 81.32,
      end: 84.46,
    },
    {
      speaker: 'client',
      text: 'Monthly….150 Pound.',
      start: 86.48,
      end: 89.34,
    },
    {
      speaker: 'coldi',
      text: 'Thanks for that. And what date would you like the arrangement to start from?',
      start: 90.54,
      end: 93.9,
    },
    {
      speaker: 'client',
      text: 'Like end of the month.',
      start: 95.66,
      end: 96.94,
    },
    {
      speaker: 'coldi',
      text: "Got it. I'll arrange for that to be confirmed in writing, including the agreed amount and start date. Before I do, would you like to speak with a member of our team now to get that finalised straight away?",
      start: 98.62,
      end: 109.74,
    },
    {
      speaker: 'client',
      text: 'Yes, please.',
      start: 111.26,
      end: 111.78,
    },
    {
      speaker: 'coldi',
      text: "I'm transferring you now to a member of our team who can finalize your repayment arrangement.",
      start: 114.2,
      end: 118.58,
    },
  ],

  'customer-support': [
    {
      speaker: 'coldi',
      text: 'Hi, am I speaking to.',
      start: 1.32,
      end: 2.12,
    },
    {
      speaker: 'client',
      text: 'Yes, hello.',
      start: 3.76,
      end: 4.4,
    },
    {
      speaker: 'coldi',
      text: 'This automated assistant, the UK EMI that you were interested in opening a bank account with for your business. This call will only take about a minute. Is that all right with you?',
      start: 5.86,
      end: 15.48,
    },
    {
      speaker: 'client',
      text: 'No business. Not ready yet. I want private account, personal.',
      start: 16.54,
      end: 20.44,
    },
    {
      speaker: 'coldi',
      text: "That's completely understandable. Would tomorrow morning or afternoon work better for a brief Google Meet call to see if you have all the information you need?",
      start: 21.28,
      end: 27.76,
    },
    {
      speaker: 'client',
      text: 'I need a personal account, not business account.',
      start: 29.74,
      end: 32.06,
    },
    {
      speaker: 'coldi',
      text: 'I understand our services are focused on business accounts. Would tomorrow morning or afternoon work better for a brief Google Meet call to discuss your options?',
      start: 33.16,
      end: 40.92,
    },
    {
      speaker: 'client',
      text: "What options I can have? I don't have any business right now.",
      start: 43.02,
      end: 47.18,
    },
    {
      speaker: 'coldi',
      text: 'I will pass your question to team for more details on personal account options. Meanwhile, would tomorrow morning or afternoon suit you better for a quick Google Meet call to discuss this further?',
      start: 48.48,
      end: 57.72,
    },
    {
      speaker: 'client',
      text: "Google me tomorrow morning? It's holiday day here. Maybe on Monday.",
      start: 60.54,
      end: 68.34,
    },
    {
      speaker: 'coldi',
      text: 'We have openings on Monday at 11, 11:15 or 11:30 in the morning. Would any of those work for you?',
      start: 73.14,
      end: 77.82,
    },
    {
      speaker: 'client',
      text: '11:40?',
      start: 78.74,
      end: 79.72,
    },
    {
      speaker: 'coldi',
      text: "11:40 Is not available. I'm afraid. The closest times on Monday are 11:30 or 11:45. Would either of those suit you better?",
      start: 81.38,
      end: 87.82,
    },
    {
      speaker: 'client',
      text: '45.',
      start: 89.1,
      end: 89.64,
    },
    {
      speaker: 'coldi',
      text: '25 Past 11 is not available. Unfortunately, the closest options are 11:15 or 11:30. Would either of those work for you?',
      start: 91.1,
      end: 97.96,
    },
    {
      speaker: 'client',
      text: "Yes. That's okay.",
      start: 99.74,
      end: 101.08,
    },
    {
      speaker: 'coldi',
      text: "Just to confirm, we'll send the Google Meet invite to the email address we have on file. Does that work for you?",
      start: 102.3,
      end: 107.76,
    },
    {
      speaker: 'client',
      text: 'Yeah.',
      start: 108.72,
      end: 108.9,
    },
    {
      speaker: 'coldi',
      text: "Great. You're booked in for Monday at 11:15 in the morning. Just to be clear, this will be a Google Meet, not a phone call. Have a great day.",
      start: 112.98,
      end: 119.32,
    },
  ],
};
