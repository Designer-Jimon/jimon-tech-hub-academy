export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  price: number;
}

export const courses: Course[] = [
  {
    id: "ai-fundamentals",
    code: "AI01",
    title: "Artificial Intelligence (AI) Fundamentals",
    description:
      "Build a strong foundation in Artificial Intelligence, Generative AI, Prompt Engineering, and ethical AI usage.",
    price: 10000,
  },
  {
    id: "ai-business",
    code: "AI02",
    title: "AI Tools for Business & Productivity",
    description:
      "Master modern AI platforms to automate work, increase productivity, and improve business performance.",
    price: 10000,
  },
  {
    id: "ai-design",
    code: "AI03",
    title: "AI Graphic Design & Flyer Creation",
    description:
      "Learn how to create stunning visual designs using AI and professional design principles.",
    price: 20000,
  },
  {
    id: "ai-video",
    code: "AI04",
    title: "AI Video Creation & Animation",
    description:
      "Create engaging videos, animations, voiceovers, and digital campaigns with AI tools.",
    price: 20000,
  },
  {
    id: "vibe-coding",
    code: "WEB01",
    title: "Website Creation Through Vibe Coding",
    description:
      "Build websites using AI prompts and modern development tools without extensive traditional coding.",
    price: 50000,
  },
  {
    id: "ecommerce",
    code: "ECOM01",
    title: "E-Commerce Development",
    description:
      "Launch and manage successful online stores using Shopify and WooCommerce.",
    price: 50000,
  },
  {
    id: "digital-marketing",
    code: "DM01",
    title: "Digital Marketing",
    description:
      "Learn how to build brands, attract customers, and grow businesses online.",
    price: 20000,
  },
  {
    id: "entrepreneurship",
    code: "ENT01",
    title: "Entrepreneurship & Tech Business Development",
    description:
      "Turn your digital skills into sustainable businesses and remote work opportunities.",
    price: 20000,
  },
  {
    id: "emerging-tech",
    code: "FUT01",
    title: "Emerging Technologies & Future Skills",
    description:
      "Stay ahead by mastering the next generation of digital tools and innovations.",
    price: 30000,
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function generateReferenceCode(courseCode: string): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `JIMON-${courseCode}-${rand}`;
}

export const BANK_DETAILS = {
  bank: "Fidelity Bank",
  accountName: "Ezeugwu Emmanuel Ifebuche",
  accountNumber: "6370283509",
} as const;

export const WHATSAPP_NUMBER = "2348136329918";

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}
