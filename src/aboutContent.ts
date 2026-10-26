/**
 * About page content. Kept in a plain (non-"use client", JSX-free) module so
 * the About page sections and the MCP server read the same source. Icons stay
 * in the components, keyed by title.
 */
export const storyParagraphs = [
  'Boostify was born from a vision to revolutionize how businesses connect with their audiences in the digital age. Founded by a team of passionate innovators with diverse expertise in technology, media, and marketing, we have built a company that thrives on creativity, technical excellence, and delivering measurable results.',
  'Our journey began with a simple belief: that every business, regardless of size, deserves access to world class digital marketing solutions. Today, we combine cutting-edge technology with strategic thinking to help our clients not just compete, but dominate in their respective markets.',
  'With backgrounds spanning software and telecommunications engineering to broadcast media, our team brings a unique perspective to digital marketing. We understand both the technical infrastructure that powers digital platforms and the creative storytelling that captures audiences.',
];

export const founders = [
  {
    photo: '/assets/team/randula.jpg',
    name: 'Randula Arukgoda',
    role: 'Co-Founder & CEO',
    degree: 'BSc. (Hons) Electronic and Telecommunication Engineering, CINEC',
    linkedin: 'https://www.linkedin.com/in/randula-arukgoda-922487215/',
    description:
      "Randula's engineering background combined with strategic marketing insights drives our data-driven approach. With exposure working alongside leading enterprises, his analytical mindset ensures every campaign is optimized for maximum performance and measurable ROI.",
  },
  {
    photo: '/assets/team/akeshala.jpg',
    name: 'Akeshala Marasinghe',
    role: 'Co-Founder & CTO',
    degree: 'BSc. (Hons) Engineering, University of Moratuwa',
    linkedin: 'https://www.linkedin.com/in/akeshala/',
    description:
      'With over 5 years of experience in the software industry across leading local and foreign companies, Akeshala brings technical expertise and innovative thinking to every project.',
  },
  {
    photo: '/assets/team/hasila.jpg',
    name: 'Hasila Heshan',
    role: 'Co-Founder & CCO',
    degree: '5+ years experience with leading television and radio companies',
    linkedin: 'https://www.linkedin.com/in/hasila-heshan-pathirana/',
    description:
      'With more than five years of industry experience, including work at leading television and radio companies, Hasila brings broad media production expertise. His work spans national-level marketing campaigns, weddings, music videos, digital marketing, and event videography.',
  },
];

export const expertise = [
  {
    title: 'Web & Mobile Development',
    description:
      'Custom websites and mobile applications designed with modern technologies, intuitive user experiences, and scalable architectures.',
  },
  {
    title: 'Digital Marketing',
    description:
      'Performance-driven campaigns that increase visibility, generate quality leads, and maximize your return on investment.',
  },
  {
    title: 'Social Media Management',
    description:
      "Creative content planning, audience engagement, and brand growth strategies across today's leading social platforms.",
  },
  {
    title: 'Business Process Automation',
    description:
      'Intelligent workflows that cut manual effort, reduce errors, and help your teams operate faster with greater consistency.',
  },
  {
    title: 'Brand Identity & Design',
    description:
      'Building memorable brands through professional logos, visual identity systems, and compelling marketing materials.',
  },
  {
    title: 'Creative Media Production',
    description:
      'Professional photography, videography, promotional content, and visual storytelling that strengthens your brand presence.',
  },
] as const;

export type ExpertiseTitle = (typeof expertise)[number]['title'];

export const industries = [
  { title: 'Manufacturing', description: 'Automation, production systems, industrial branding, and digital transformation.' },
  { title: 'Healthcare', description: 'Healthcare marketing, patient engagement, and digital service platforms.' },
  { title: 'Education', description: 'Educational institutions, training centers, and e-learning platforms.' },
  { title: 'Retail & E-Commerce', description: 'Online stores, customer acquisition, digital advertising, and sales optimization.' },
  { title: 'Hospitality & Tourism', description: 'Hotels, restaurants, travel businesses, and destination marketing.' },
  { title: 'Startups & SMEs', description: 'Complete digital solutions for growing businesses, from branding to scalable technology platforms.' },
] as const;

export type IndustryTitle = (typeof industries)[number]['title'];
