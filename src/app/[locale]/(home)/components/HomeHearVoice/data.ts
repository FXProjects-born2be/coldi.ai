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
      text: 'Hey, am I talking to Luca, right?',
      start: 3.44,
      end: 4.62,
    },

    {
      speaker: 'client',
      text: 'Yes,....',
      start: 6.24,
      end: 6.34,
    },

    {
      speaker: 'coldi',
      text: 'This is Paul Whitmore calling on behalf of. We work with freelancers and small business owners across the United Kingdom to help protect their work and income with tailored insurance. Quick question to start. Are you currently working for yourself or running a business?',
      start: 8.96,
      end: 21.92,
    },

    {
      speaker: 'client',
      text: "I'm running a business.",
      start: 24.3,
      end: 25.3,
    },

    {
      speaker: 'coldi',
      text: "Awesome. Just to point you in the right direction, what industry are you in? Would you say you're more of a freelancer, contractor or small business owner?",
      start: 27.84,
      end: 34.68,
    },

    {
      speaker: 'client',
      text: 'Construction contractor.',
      start: 37.16,
      end: 38.54,
    },

    {
      speaker: 'coldi',
      text: 'And do you currently have any insurance in place or are you still looking?',
      start: 40.6,
      end: 43.18,
    },

    {
      speaker: 'client',
      text: "No, I don't have any insurance.",
      start: 45.74,
      end: 47.14,
    },

    {
      speaker: 'coldi',
      text: 'Thanks, that helps. Want to hear what we typically offer for professionals in your space?',
      start: 48.38,
      end: 52.3,
    },

    {
      speaker: 'client',
      text: 'Okay.',
      start: 56.58,
      end: 56.94,
    },

    {
      speaker: 'coldi',
      text: "Appreciate that. So, based on what you shared, we usually recommend a mix of COVID like Professional Indemnity if you're giving advice or services, Public liability if you're dealing with clients or physical work, or Cyber Cover if you're handling data. Everything's flexible, built around your actual risks, and you only pay for what you need. Would you like to see what kind of protection would make sense in your case?",
      start: 58.26,
      end: 79.1,
    },

    {
      speaker: 'client',
      text: 'Well, first I want to know why would I need that protection? Why would I need insurance in first place?',
      start: 81.38,
      end: 86.22,
    },

    {
      speaker: 'coldi',
      text: "But if you're giving advice, dealing with clients, using equipment, or even just sending invoices, there's always risk. A single mistake or dispute could cost thousands. Insurance protects your time, income and reputation, so you're not stuck dealing with it alone. Have you ever run into an issue with a client or project that could have gone badly?",
      start: 87.54,
      end: 103.86,
    },

    {
      speaker: 'client',
      text: 'Well, yes, but it never cost me thousands of dollars.',
      start: 106.02,
      end: 109.04,
    },

    {
      speaker: 'coldi',
      text: "Appreciate that. So, based on what you shared, we usually recommend a mix of COVID like Professional Indemnity if you're giving advice or services, Public Liability if you're dealing with clients or physical work, or Cyber Cover if you're handling data. Everything's flexible, built around your actual risks and you only pay for what you need. Would you like to see what kind of protection would make sense in your case?",
      start: 111.08,
      end: 131.26,
    },

    {
      speaker: 'client',
      text: 'So this sounds like a sales call. Is it a sales call?',
      start: 133.08,
      end: 135.82,
    },

    {
      speaker: 'coldi',
      text: "I'm just here to ask a couple of questions and if it sounds useful, connect you with a licensed advisor who can explain the right options for your line of work. You're totally in control, zero pressure. Would it be alright if I asked a quick question or two to see if this even applies to you?",
      start: 137.42,
      end: 150.6,
    },

    {
      speaker: 'client',
      text: "Well, before I commit to anything, first I would like to speak with my wife, if that's okay.",
      start: 152.2,
      end: 156.86,
    },

    {
      speaker: 'coldi',
      text: 'I completely understand. Would you like me to arrange a quick call with them directly so they can get all the details firsthand?',
      start: 157.24,
      end: 162.78,
    },

    {
      speaker: 'client',
      text: 'Yes',
      start: 163.22,
      end: 163.24,
    },

    {
      speaker: 'coldi',
      text: 'Fantastic. When will be the best time to contact back.',
      start: 163.26,
      end: 165.4,
    },

    {
      speaker: 'client',
      text: 'And by the way, tell me, how did you get my number?',
      start: 167.24,
      end: 169.42,
    },

    {
      speaker: 'coldi',
      text: "We work with databases and platforms that help us connect with people who are self employed or run small businesses like yourself. It's GDPR compliant and we're simply reaching out to offer relevant cover based on your line of work. Is that something you're currently exploring?",
      start: 171.38,
      end: 184.58,
    },

    {
      speaker: 'client',
      text: "Well, you know what? I looked at it, but I didn't put anything down. I was just curious.",
      start: 188.74,
      end: 194.22,
    },

    {
      speaker: 'coldi',
      text: "Totally fair. A lot of smart people are curious, believe me. Let me ask you this. When you looked at it, did you have a sense of what it's about or was it a little unclear?",
      start: 196.74,
      end: 204.44,
    },

    {
      speaker: 'client',
      text: 'Well, not really.',
      start: 206.66,
      end: 207.5,
    },

    {
      speaker: 'coldi',
      text: "Because if it wasn't clear, that's exactly why I'm here, to give you the real picture. Explain how it works. Very simple, very powerful. Want me to break it down for you real quick?",
      start: 209.62,
      end: 218.1,
    },

    {
      speaker: 'client',
      text: 'Yes, sure.',
      start: 219.92,
      end: 220.4,
    },

    {
      speaker: 'coldi',
      text: "Appreciate that. So, based on what you shared, we usually recommend a mix of COVID like Professional Indemnity if you're giving advice or services, Public Liability if you're dealing with clients or physical work, or Cyber Cover if you're handling data. Everything's flexible, built around your actual risks and you only pay for what you need. Would you like to see what kind of protection would make sense in your case?",
      start: 222.56,
      end: 243.3,
    },

    {
      speaker: 'client',
      text: 'Yes, sure.',
      start: 245.58,
      end: 246.06,
    },

    {
      speaker: 'coldi',
      text: "Right now we've got some bundled plans that make things super simple, especially for people juggling contracts or doing multiple types of work. Most clients are surprised how affordable it can be for real protection. Would it be useful to see how we can help you set that up?",
      start: 248.22,
      end: 260.72,
    },

    {
      speaker: 'client',
      text: 'Yes.',
      start: 263.38,
      end: 263.68,
    },

    {
      speaker: 'coldi',
      text: "Here's how it works. I'll transfer you to a licensed advisor. They'll go over your setup, explain the best fit, and if it sounds good, you can activate your policy right away. Or just take the info and think about it. Shall I connect you now? It will just take a minute.",
      start: 265.38,
      end: 278.42,
    },

    {
      speaker: 'client',
      text: 'Well, first I would like to speak with my lovely wife. Can you give me a call later today, please?',
      start: 278.56,
      end: 283.58,
    },

    {
      speaker: 'client',
      text: 'Fantastic. When will be the best time to contact back?',
      start: 284.88,
      end: 286.92,
    },

    {
      speaker: 'client',
      text: "Later today at 8:00'. Clock.",
      start: 288.84,
      end: 290.64,
    },

    {
      speaker: 'coldi',
      text: 'Talk later. Bye bye.',
      start: 292.16,
      end: 292.9,
    },

    {
      speaker: 'client',
      text: 'Bye.',
      start: 294.56,
      end: 294.84,
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
