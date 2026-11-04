const envPrice = (key: string, fallback: number) => {
  const value = Number(process.env[key]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

const contactPhone = "+91 8968966640";
const contactPhoneDigits = contactPhone.replace(/\D/g, "");

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kohli-web-services.vercel.app");

export function createWhatsAppLink(message?: string) {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${contactPhoneDigits}${query}`;
}

export const planDurations = [12, 24, 48] as const;
export type PlanDuration = (typeof planDurations)[number];
export type PricingPlan = {
  name: "Single Plan" | "Premium Plan";
  durations: { months: PlanDuration; price: number }[];
  domainHostingIncluded: boolean;
  featured?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Single Plan",
    durations: [
      { months: 12, price: envPrice("NEXT_PUBLIC_SINGLE_12_MONTH_PRICE", 5299) },
      { months: 24, price: envPrice("NEXT_PUBLIC_SINGLE_24_MONTH_PRICE", 6399) },
      { months: 48, price: envPrice("NEXT_PUBLIC_SINGLE_48_MONTH_PRICE", 6999) },
    ],
    domainHostingIncluded: false,
  },
  {
    name: "Premium Plan",
    durations: [
      { months: 12, price: envPrice("NEXT_PUBLIC_PREMIUM_12_MONTH_PRICE", 7499) },
      { months: 24, price: envPrice("NEXT_PUBLIC_PREMIUM_24_MONTH_PRICE", 8999) },
      { months: 48, price: envPrice("NEXT_PUBLIC_PREMIUM_48_MONTH_PRICE", 14999) },
    ],
    domainHostingIncluded: true,
    featured: true,
  },
];

export const business = {
  name: "Kohli Web Studio",
  shortName: "KWS",
  tagline: "We build digital experiences.",
  phone: contactPhone,
  phoneLink: `tel:+${contactPhoneDigits}`,
  email: "shivamkohli2009@gmail.com",
  whatsapp: contactPhoneDigits,
  whatsappLink: createWhatsAppLink,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/",
  location: "India · Working worldwide",
  currency: "INR",
  packages: pricingPlans,
};

export const services = [
  { title: "Business websites", type: "business", icon: "PanelsTopLeft", description: "A polished, purposeful home for your business that turns a first impression into a next step.", benefits: ["Brand-led design", "Mobile-first build", "Search-ready foundations"] },
  { title: "E-commerce websites", type: "ecommerce", icon: "ShoppingBag", description: "A thoughtful storefront that makes discovering, choosing and buying feel effortless.", benefits: ["Product-led storytelling", "Checkout integration", "Store-owner friendly"] },
  { title: "Restaurant websites", type: "restaurant", icon: "Utensils", description: "A sensory introduction to your table, with a menu and reservation experience guests can use anywhere.", benefits: ["Digital menu", "Reservation enquiry", "Location & opening hours"] },
  { title: "Hotel websites", type: "hotel", icon: "Hotel", description: "Showcase your stay with considered room, amenity and location storytelling.", benefits: ["Room showcases", "Booking enquiry", "Destination-led gallery"] },
  { title: "Travel agency websites", type: "travel", icon: "Compass", description: "Turn inspiration into a clear itinerary enquiry with destination and package discovery.", benefits: ["Destination discovery", "Trip enquiry flow", "WhatsApp contact"] },
  { title: "Gym & wellness websites", type: "gym", icon: "Dumbbell", description: "Give your community a clear path to explore classes, meet the trainers and get started.", benefits: ["Class & membership info", "Trainer profiles", "Enquiry-led conversion"] },
  { title: "Personal portfolios", type: "portfolio", icon: "UserRound", description: "A distinct, expressive portfolio that gives your work the context and space it deserves.", benefits: ["Project-led storytelling", "Personal point of view", "Easy to share"] },
  { title: "Landing pages", type: "landing", icon: "MousePointerClick", description: "A focused campaign page with one clear message and a frictionless next action.", benefits: ["Single-goal structure", "Campaign-ready", "Conversion-focused"] },
  { title: "Custom web applications", type: "webapp", icon: "Blocks", description: "Purpose-built digital tools, designed around the way your people actually work.", benefits: ["Custom user journeys", "API integrations", "Scalable foundation"] },
];

export const faqs = [
  { question: "How do we get started?", answer: "Share a little about your business and what you have in mind. We’ll arrange a conversation, understand the goals, and follow up with a tailored scope and quotation." },
  { question: "How long does a website take?", answer: "Timing depends on the scope, content and integrations. A focused website can take a few weeks; larger custom projects typically need more discovery and build time. We’ll map this out together before work begins." },
  { question: "Can you work with my existing brand?", answer: "Absolutely. We can work within your current brand system, or discuss identity refinement if the project calls for it." },
  { question: "How do I enquire about a plan?", answer: "Choose a plan and duration on the pricing page, then select Get Started. Your enquiry will include the selected plan, duration and price." },
  { question: "Do you provide hosting and ongoing support?", answer: "We can help you choose and configure a suitable hosting setup. Ongoing support and maintenance can be discussed and included in a project proposal." },
  { question: "Can I update the website after it launches?", answer: "Yes. Depending on the project, we can build a CMS-ready editing experience or provide a handover with guidance for your team." },
];

export const projects = [
  { slug: "solstice-house", title: "Solstice House", category: "Hospitality", type: "hotel", description: "A quiet, design-led stay imagined between the forest and the sea.", image: "photo-1449158743715-0a90ebb6d2d8", accent: "sage", tags: ["Next.js", "Art direction", "Booking enquiry"], demo: "/demo/hotel" },
  { slug: "atelier-sorelle", title: "Atelier Sorelle", category: "Food & drink", type: "restaurant", description: "A neighbourhood kitchen with a seasonal menu and a story worth sitting down for.", image: "photo-1414235077428-338989a2e8c0", accent: "amber", tags: ["Next.js", "Menu design", "Reservations"], demo: "/demo/restaurant" },
  { slug: "northbound-co", title: "Northbound Co.", category: "Travel", type: "travel", description: "A slower way to discover the landscapes just beyond the familiar.", image: "photo-1464822759023-fed622ff2c3b", accent: "ice", tags: ["Next.js", "Trip enquiries", "WhatsApp"], demo: "/demo/travel" },
  { slug: "form-and-field", title: "Form & Field", category: "Commerce", type: "ecommerce", description: "Objects for everyday rituals, presented with room to breathe.", image: "photo-1494438639946-1ebd1d20bf85", accent: "sand", tags: ["E-commerce concept", "Product storytelling"], demo: "/contact" },
  { slug: "good-form-club", title: "Good Form Club", category: "Wellness", type: "gym", description: "A movement club where training is serious and the atmosphere is anything but.", image: "photo-1534438327276-14e5300c3a48", accent: "plum", tags: ["Membership concept", "Class discovery"], demo: "/contact" },
  { slug: "studio-north", title: "Studio North", category: "Creative", type: "portfolio", description: "A digital home for a multidisciplinary independent creative practice.", image: "photo-1497366754035-f200968a6e72", accent: "silver", tags: ["Portfolio concept", "Editorial design"], demo: "/contact" },
];

export const demoNote = "Demonstration concept created for Kohli Web Studio. This is not a real client or business.";
export const defaultWebsiteCopy = {
  heroDescription: "We turn ambitious ideas into thoughtful websites and digital products — made to move your business forward.",
  introTitle: "Not just a website.\nA better way to show up.",
  introCopy: "We’re an independent design and development studio for people building something meaningful. From the first conversation to the final detail, we bring the thinking and craft your next chapter deserves.",
  closingTitle: "Let’s build\nsomething real.",
};
