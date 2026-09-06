import { Link } from 'react-router-dom';

interface FooterLinkGroup {
  heading: string;
  links: { label: string; to: string }[];
}

const LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: 'Practice',
    links: [
      { label: 'NDA Papers', to: '/nda' },
      { label: 'CDS Papers', to: '/cds' },
      { label: 'All Papers', to: '/papers' },
    ],
  },
  {
    heading: 'Exams',
    links: [
      { label: 'NDA', to: '/nda' },
      { label: 'CDS', to: '/cds' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Exam Guide', to: '/guide' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Use', to: '/terms' },
      { label: 'Disclaimer', to: '/disclaimer' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dp-surface border-t border-dp mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white font-extrabold text-sm tracking-tight select-none flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--dp-accent) 0%, var(--dp-accent-2, #7c3aed) 100%)',
                  clipPath: 'polygon(12% 0%, 88% 0%, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0% 88%, 0% 12%)',
                }}
              >
                DP
              </div>
              <span className="text-dp-primary font-bold text-lg tracking-tight leading-none">
                Defence<span className="gradient-accent">Prep</span>
              </span>
            </Link>
            <p className="text-dp-muted text-sm leading-relaxed max-w-xs">
              Sharpen your edge with authentic past papers and precision practice for India's premier defence examinations.
            </p>
          </div>

          {/* Link Columns */}
          {LINK_GROUPS.map((group) => (
            <div key={group.heading} className="flex flex-col gap-3">
              <h4 className="text-dp-primary text-xs font-semibold uppercase tracking-widest">
                {group.heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-dp-muted hover:text-dp-primary text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + Bottom Bar */}
        <div className="border-t border-dp mt-12 pt-7 flex flex-col gap-3">
          <p className="text-dp-muted text-xs leading-relaxed max-w-3xl">
            DefencePrep is an independent educational practice platform and is not affiliated with UPSC, the Ministry of Defence, or the Indian Armed Forces. All trademarks and examination names belong to their respective owners.
          </p>
          <p className="text-dp-muted text-xs">
            © {year} DefencePrep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
