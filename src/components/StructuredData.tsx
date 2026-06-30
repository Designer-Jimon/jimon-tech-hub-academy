export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jimontechhub.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Jimon Tech Hub Academy",
    alternateName: "JTH Academy",
    description:
      "Empowering Africans Through AI, Digital Skills, and Innovation.",
    url: siteUrl,
    logo: `${siteUrl}/images/og/jimon-tech-hub-cover.jpg`,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-813-632-9918",
      contactType: "sales",
      email: "info@jimontechhub.com",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://facebook.com/jimontechhub",
      "https://instagram.com/jimontechhub",
      "https://linkedin.com/company/jimontechhub",
      "https://youtube.com/@jimontechhub",
    ],
  };

  const courseSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Artificial Intelligence (AI) Fundamentals",
      description:
        "Build a strong foundation in AI, Generative AI, Prompt Engineering, and ethical AI usage.",
      provider: { "@type": "EducationalOrganization", name: "Jimon Tech Hub Academy" },
      offers: {
        "@type": "Offer",
        category: "Paid",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "AI Video Creation & Animation",
      description:
        "Create engaging videos, animations, voiceovers, and digital campaigns with AI tools.",
      provider: { "@type": "EducationalOrganization", name: "Jimon Tech Hub Academy" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Website Creation Through Vibe Coding",
      description:
        "Build websites using AI prompts and modern development tools without extensive traditional coding.",
      provider: { "@type": "EducationalOrganization", name: "Jimon Tech Hub Academy" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "E-Commerce Development (Shopify & WooCommerce)",
      description:
        "Launch and manage successful online stores using Shopify and WooCommerce.",
      provider: { "@type": "EducationalOrganization", name: "Jimon Tech Hub Academy" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Digital Marketing",
      description:
        "Learn how to build brands, attract customers, and grow businesses online.",
      provider: { "@type": "EducationalOrganization", name: "Jimon Tech Hub Academy" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Entrepreneurship & Tech Business Development",
      description:
        "Turn your digital skills into sustainable businesses and remote work opportunities.",
      provider: { "@type": "EducationalOrganization", name: "Jimon Tech Hub Academy" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Emerging Technologies & Future Skills",
      description:
        "Stay ahead by mastering no-code tools, low-code platforms, AI agents, and workflow automation.",
      provider: { "@type": "EducationalOrganization", name: "Jimon Tech Hub Academy" },
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need prior experience before joining?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Our programs accommodate complete beginners and experienced learners alike.",
        },
      },
      {
        "@type": "Question",
        name: "How do I register?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All registrations happen through our external Google Form system.",
        },
      },
      {
        "@type": "Question",
        name: "Can I learn online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide online, onsite, and hybrid learning opportunities.",
        },
      },
      {
        "@type": "Question",
        name: "Will I work on real projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Practical projects are a core part of every program.",
        },
      },
      {
        "@type": "Question",
        name: "Do you teach Shopify and WooCommerce?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our e-commerce program covers both platforms extensively.",
        },
      },
      {
        "@type": "Question",
        name: "Will AI tools be used throughout the training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI integration forms a major component of our learning philosophy.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {courseSchemas.map((course) => (
        <script
          key={course.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(course),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

