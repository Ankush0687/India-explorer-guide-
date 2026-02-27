const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-bold text-gradient">
              Incredible India Tourism Guide
            </h3>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Your complete guide to exploring the beauty, heritage, and diversity of India.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-2 space-y-1 font-body text-sm text-muted-foreground">
              <li>
                <a href="https://www.incredibleindia.org/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                  Incredible India Official
                </a>
              </li>
              <li>
                <a href="https://tourism.gov.in/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                  Ministry of Tourism
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-2 space-y-1 font-body text-sm text-muted-foreground">
              <li>Email: info@incredibleindia.org</li>
              <li>Helpline: 1800-111-363</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Incredible India Tourism Guide. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
