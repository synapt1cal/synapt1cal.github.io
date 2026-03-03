/* ============================================================
   SYNAPTICAL — <site-footer> Web Component
   
   Usage: Add <site-footer></site-footer> before </body>.
   Update the social links object below with your own URLs.
   ============================================================ */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    // ── Update these with your real links ─────────────────
    const socials = [
      { label: 'YouTube',   href: 'https://www.youtube.com/@synapt1cal' },
      { label: 'SoundCloud', href: 'https://soundcloud.com/synapt1cal' },
      { label: 'Instagram', href: 'https://www.instagram.com/synapticalofficial/' },
      { label: 'X / Twitter', href: 'https://x.com/synapt1cal' },
    ];

    const socialLinks = socials.map(s =>
      `<a href="${s.href}" class="footer-social-link" target="_blank" rel="noopener noreferrer">${s.label}</a>`
    ).join('');

    this.innerHTML = `
      <footer class="footer" role="contentinfo">
        <div class="footer-inner container">

          <div class="footer-brand">
            <span class="footer-brand-text">Synaptical</span>
          </div>

          <nav class="footer-socials" aria-label="Social links">
            ${socialLinks}
          </nav>

          <p class="footer-copy">
            &copy; ${year} Synaptical. All rights reserved.
          </p>

        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
