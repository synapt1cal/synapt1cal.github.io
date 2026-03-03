/* ============================================================
   SYNAPTICAL — <site-nav> Web Component
   
   Usage: Add <site-nav></site-nav> at the top of any page body.
   The "active" link is detected automatically from the URL.
   ============================================================ */

class SiteNav extends HTMLElement {
  connectedCallback() {
    // Detect which page we're on for the active link state
    const path = window.location.pathname;

    const links = [
      { href: '/',             label: 'Home'    },
      { href: '/music.html',   label: 'Music'   },
      { href: '/writing.html', label: 'Writing' },
      { href: '/about.html',   label: 'About'   },
    ];

    const navLinks = links.map(link => {
      // Mark as active if the path matches exactly, or starts with href for sub-pages
      const isActive = (link.href === '/')
        ? (path === '/' || path === '/index.html')
        : path.startsWith(link.href.replace('.html', ''));

      return `<a href="${link.href}" class="nav-link${isActive ? ' nav-link--active' : ''}">${link.label}</a>`;
    }).join('');

    this.innerHTML = `
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <div class="nav-inner container">

          <a href="/" class="nav-brand" aria-label="Synaptical home">
            <span class="nav-brand-text">Synaptical</span>
            <span class="nav-brand-dot" aria-hidden="true"></span>
          </a>

          <div class="nav-links" id="nav-links" role="menubar">
            ${navLinks}
          </div>

          <!-- Mobile hamburger -->
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-links">
            <span></span><span></span><span></span>
          </button>

        </div>
      </nav>
    `;

    // ── Mobile toggle logic ────────────────────────────────
    const toggle = this.querySelector('#nav-toggle');
    const menu   = this.querySelector('#nav-links');

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('nav-links--open');
      toggle.classList.toggle('nav-toggle--open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked (on mobile)
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('nav-links--open');
        toggle.classList.remove('nav-toggle--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // ── Scroll shadow ──────────────────────────────────────
    const nav = this.querySelector('.nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    }, { passive: true });
  }
}

customElements.define('site-nav', SiteNav);
