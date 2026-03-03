/* ============================================================
   SYNAPTICAL — <site-nav> Web Component
   Usage: Add <site-nav></site-nav> at the top of any page body.
   The "active" link is detected automatically from the URL.
   ============================================================ */

class SiteNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;

    const links = [
      { href: '/',             label: 'Home'     },
      { href: '/links.html',   label: 'Links'    },
      { href: '/writing.html', label: 'Writings' },
      { href: '/about.html',   label: 'About Me' },
      { href: '/gear.html',    label: 'My Gear'  },
      { href: '/contact.html', label: 'Contact'  },
    ];

    const navLinks = links.map(link => {
      const isActive = (link.href === '/')
        ? (path === '/' || path === '/index.html')
        : path.startsWith(link.href.replace('.html', ''));

      return `<a href="${link.href}" class="nav-link${isActive ? ' nav-link--active' : ''}">${link.label}</a>`;
    }).join('');

    this.innerHTML = `
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <div class="nav-inner container">

          <div class="nav-links" id="nav-links" role="menubar">
            ${navLinks}
          </div>
          
          <a href="/" class="nav-brand" aria-label="Synaptical home">
            <span class="nav-brand-text">Synaptical</span>
            <span class="nav-brand-dot" aria-hidden="true"></span>
          </a>

          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-links">
            <span></span><span></span><span></span>
          </button>

        </div>
      </nav>
    `;

    const toggle = this.querySelector('#nav-toggle');
    const menu   = this.querySelector('#nav-links');

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('nav-links--open');
      toggle.classList.toggle('nav-toggle--open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('nav-links--open');
        toggle.classList.remove('nav-toggle--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    const nav = this.querySelector('.nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    }, { passive: true });
  }
}

customElements.define('site-nav', SiteNav);
