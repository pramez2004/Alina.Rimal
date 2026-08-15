// ===========================================================
// SITE CONTENT DATA
// Powers the editable text on Home and Contact — hero copy,
// about paragraphs, skills, why-collaborate cards, contact
// links, and FAQ. Edit this file directly, or use admin.html
// for a form-based editor that generates an updated version
// of this file for you to download and re-upload.
//
// Section headline wording (e.g. "Creative at heart, authentic
// by nature") stays fixed in the HTML — only the content under
// each headline is data-driven here.
// ===========================================================

const SITE = {
  hero: {
    tag: "Content Creator · Model · Beauty Specialist",
    subtitle:
      "A multifaceted creative with a passion for fashion, beauty, and storytelling — blending model presence with authentic content creation across social platforms.",
    photo: "assets/alina-hero.jpg",
    pills: [
      { label: "Instagram", url: "https://www.instagram.com/alina.rimal/" },
      { label: "TikTok", url: "https://www.tiktok.com/@alina.rimal22" },
      { label: "Fashion", url: "" },
      { label: "Beauty", url: "" },
    ],
  },

  about: {
    paragraphs: [
      "I'm Alina Rimal — a content creator, model, and beauty enthusiast based in Nepal. My work lives at the intersection of visual storytelling, personal style, and the beauty industry. I craft content that feels real, relatable, and visually compelling.",
      "With professional training in makeup artistry and hands-on experience building an engaged social media audience, I understand both the creative and strategic sides of content. I don't just create posts — I create experiences that connect brands with people.",
      "My background in modeling gives me a strong on-camera presence and an eye for aesthetics, while my genuine passion for fashion and beauty ensures every piece of content I make has soul behind it.",
    ],
    stats: [
      { value: "Multi", label: "Platform presence — Instagram & TikTok" },
      { value: "Pro", label: "Certified professional makeup training" },
      { value: "100%", label: "Passion for fashion & beauty industry" },
    ],
  },

  skills: [
    {
      name: "Photo & Video Creation",
      desc: "Skilled in creating high-quality photo and video content — from concept to final edit — that captures attention on fast-moving feeds.",
    },
    {
      name: "Writing & Storytelling",
      desc: "Strong writing and editing skills with a natural storytelling instinct — crafting captions and scripts that resonate and drive engagement.",
    },
    {
      name: "Beauty & Makeup Expertise",
      desc: "Professionally trained in makeup artistry, bringing authentic expertise to beauty content creation and product demonstrations.",
    },
    {
      name: "Social Media Strategy",
      desc: "Deeply familiar with Instagram and TikTok — understanding trends, algorithms, and how to create content that grows organically.",
    },
    {
      name: "Aesthetic & Visual Eye",
      desc: "A refined sense of style and composition developed through modeling, ensuring every visual is intentional and on-brand.",
    },
    {
      name: "Creative Ideation",
      desc: "A fresh, creative mindset that generates original content ideas — not just following trends, but setting them.",
    },
  ],

  why: [
    {
      title: "Industry fit",
      text: "Beauty and fashion aren't just a job — they're a genuine passion. With professional makeup training and a fashion-forward aesthetic, content connects with the audience from the inside out.",
    },
    {
      title: "Proven presence",
      text: "Already active across Instagram and TikTok with real content — not just ideas on a page, but a creator who shows up, delivers, and builds community consistently.",
    },
    {
      title: "Model-level quality",
      text: "A modeling background means every product is presented with poise, lighting awareness, and the visual polish that makes content stand out in crowded feeds.",
    },
  ],

  contact: {
    heroSub:
      "Open to brand collaborations, UGC, content creation, and modeling opportunities. Reach out below or drop a message directly.",
    intro: [
      "Excited about the opportunity to bring fresh, authentic content to your brand. Skills, passion, and professional training make for a creator ready to contribute from day one.",
      "Feel free to explore the work across platforms and reach out — always happy to connect and discuss how to support your brand's creative vision.",
    ],
    email: "alinarimal38@gmail.com",
    instagram: { handle: "@alina.rimal", url: "https://www.instagram.com/alina.rimal/" },
    tiktok: { handle: "@alina.rimal22", url: "https://www.tiktok.com/@alina.rimal22" },
    cvPath: "assets/alina-rimal-cv.pdf",
  },

  faq: [
    {
      q: "What type of content do you create?",
      a: "Fashion, beauty, and lifestyle content — from styled outfit and product features to short-form storytelling and modeling-focused visuals.",
    },
    {
      q: "Which platforms are you active on?",
      a: "Instagram and TikTok. Links to both are on the Works page and in the footer below.",
    },
    {
      q: "What kind of collaborations do you take on?",
      a: "Brand collaborations, UGC, content creation, product promotion, photoshoots, and modeling — you can select the type that fits when filling out the form above.",
    },
    {
      q: "Do you need products sent in advance?",
      a: "For product-based content, yes — shipping details can be sorted out once we're in touch, based on what the collaboration needs.",
    },
    {
      q: "How do we get started?",
      a: "Fill out the form above with a bit about your brand and what you have in mind, or reach out directly on Instagram or TikTok — whichever is easiest.",
    },
  ],
};
