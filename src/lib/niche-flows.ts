export type FlowStep = {
  trigger: string[];
  response: string;
  nextSteps?: string[];
  extraction?: string; // Fields to extract like 'name', 'phone', 'car_type'
  tag?: 'HOT' | 'WARM' | 'COLD';
};

export type NicheFlow = {
  id: string;
  name: string;
  initialMessage: string;
  steps: FlowStep[];
};

export const NICHE_FLOWS: Record<string, NicheFlow> = {
  LEAD_REPLY_AGENT: {
    id: 'lead-reply-agent',
    name: 'Lead Reply Agent',
    initialMessage: 'Hi 👋 Thanks for contacting us.\n\nHow can I help you today?\nReply with a number:\n\n1️⃣ Get service details\n2️⃣ See our social media work\n3️⃣ Purchase a service\n4️⃣ Talk to our team\n5️⃣ Other query',
    steps: [
      {
        trigger: ['1', 'service details', 'details'],
        response: 'Sure 👍 Please tell me which service you’re interested in.',
        tag: 'WARM'
      },
      {
        trigger: ['2', 'social media', 'work', 'portfolio'],
        response: 'Here’s our recent work:\n[PORTFOLIO_LINK_HERE]\nLet me know if you need details.',
        tag: 'WARM'
      },
      {
        trigger: ['3', 'purchase', 'buy'],
        response: 'Great 👍 Please share:\n• Service name\n• Budget range',
        tag: 'HOT'
      },
      {
        trigger: ['4', 'talk to team', 'human', 'agent'],
        response: 'No problem 👍 I’m connecting you with our team now.',
        tag: 'HOT'
      },
      {
        trigger: ['5', 'other', 'query'],
        response: 'Please briefly describe what you’re looking for.',
        tag: 'WARM'
      }
    ]
  },
  CAR_BOOKING: {
    id: 'car-booking',
    name: 'Car Booking',
    initialMessage: 'Hello! Welcome to Bareerah Car Rentals. Would you like to **Book a Car** or **Check Availability**?',
    steps: [
      {
        trigger: ['book', 'rent', 'need a car'],
        response: 'Awesome! We have Sedans, SUVs, and Luxury cars available. Which one do you prefer?',
        nextSteps: ['Sedan', 'SUV', 'Luxury'],
      },
      {
        trigger: ['sedan', 'suv', 'luxury'],
        response: 'Great choice. Now, please share your **Pickup Location** and **Date**.',
        extraction: 'location_and_date',
      },
    ],
  },
  REAL_ESTATE: {
    id: 'real-estate',
    name: 'Real Estate Inquiry',
    initialMessage: 'Hi! Looking for your dream home? I can help you find **Properties for Sale** or **Rent**.',
    steps: [
      {
        trigger: ['sale', 'buy', 'purchase'],
        response: 'We have amazing apartments and villas. What is your budget range?',
      },
    ],
  },
};

export const getResponseForMessage = (message: string, niche: string): { response: string, tag?: string } | null => {
  const normalizedMsg = message.toLowerCase();
  const flow = NICHE_FLOWS[niche];

  if (!flow) return null;

  // Check for exact numbers first (common in WhatsApp bots)
  const numberMatch = normalizedMsg.match(/^[1-5]$/);

  for (const step of flow.steps) {
    if (numberMatch && step.trigger.includes(numberMatch[0])) {
      return { response: step.response, tag: step.tag };
    }
    if (step.trigger.some(t => normalizedMsg.includes(t))) {
      return { response: step.response, tag: step.tag };
    }
  }

  return null; // Fallback to AI
};
