const LogoIcon = () => (
  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 7L2 14l10 5 10-5-10-5z" />
  </svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const DiscordIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.106c.36.698.772 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.315-9.673-3.548-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const CookieIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const footerLinks = {
  features: [
    { name: "IPFS", href: "#" },
    { name: "ACCESS CONTROL", href: "#" },
    { name: "ANALYTICS", href: "#" },
    { name: "WORKSPACES", href: "#" },
    { name: "GROUPS", href: "#" },
    { name: "DEDICATED IPFS GATEWAYS", href: "#" },
    { name: "CDN", href: "#" },
  ],
  product: [
    { name: "PRICING", href: "#" },
    { name: "STATUS", href: "#" },
  ],
  resources: [{ name: "DOCUMENTATION", href: "#" }],
  company: [
    { name: "ABOUT", href: "#" },
    { name: "CAREERS", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#7B61FF] text-[#f6f6f6] rounded-t-[3.5rem] py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <LogoIcon />
              <span className="text-2xl font-bold">TomFlash</span>
            </div>
            <p
              style={{ wordSpacing: 3 }}
              className="text-lg font-semibold mb-6"
            >
              SECURE FIRMWARE DELIVERY
            </p>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="hover:text-gray-200">
                <XIcon />
              </a>
              <a href="#" className="hover:text-gray-200">
                <DiscordIcon />
              </a>
              <a href="#" className="hover:text-gray-200">
                <YoutubeIcon />
              </a>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            <p className="mb-2">
              Copyright © 2026 TomFlash | All rights reserved
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
              <a href="#" className="hover:underline">
                Terms & conditions
              </a>
              <a href="#" className="hover:underline">
                Acceptable use
              </a>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">FEATURES</h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-gray-300 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">PRODUCT</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-gray-300 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-gray-300 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-gray-300 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
