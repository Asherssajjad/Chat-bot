export type FlowStep = {
  trigger: string[];
  response: string;
  nextSteps?: string[];
  extraction?: string; // Fields to extract like 'name', 'phone', 'car_type'
};

export type NicheFlow = {
  id: string;
  name: string;
  initialMessage: string;
  steps: FlowStep[];
};

export const NICHE_FLOWS: Record<string, NicheFlow> = {
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
      {
        trigger: ['location', 'my location is', '@'], // Simple keyword matching
        response: 'Got it. Our agent will contact you shortly to confirm the availability. Thank you!',
        extraction: 'final_booking',
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
      {
        trigger: ['rent', 'lease'],
        response: 'Looking for a short-term or long-term lease?',
      },
    ],
  },
};

export const getResponseForMessage = (message: string, niche: string): string | null => {
  const normalizedMsg = message.toLowerCase();
  const flow = NICHE_FLOWS[niche];
  
  if (!flow) return null;

  for (const step of flow.steps) {
    if (step.trigger.some(t => normalizedMsg.includes(t))) {
      return step.response;
    }
  }

  return null; // Fallback to AI
};
