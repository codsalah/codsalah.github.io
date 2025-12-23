/* Main JS for behavior */

// Theme Toggle
(function () {
  const themeToggle = document.getElementById('theme-toggle');

  function updateIcon(theme) {
    if (!themeToggle) return;

    if (theme === 'dark') {
      themeToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      `;
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      `;
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);

    // Initialize icon
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    updateIcon(theme);
  }
})();

// Reading Sidebar Logic
(function () {
  const sidebar = document.getElementById('reading-sidebar');
  if (!sidebar) return;

  const content = document.querySelector('.post-content');
  const ring = document.getElementById('progress-ring-fill');
  const percentText = document.getElementById('progress-percent');
  const closeBtn = document.getElementById('sidebar-close');
  const positionBtn = document.getElementById('sidebar-position');
  const fontBtns = document.querySelectorAll('.sidebar-btn');

  // 1. Reading Progress (Circular)
  window.addEventListener('scroll', () => {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.min(100, Math.max(0, (winScroll / height) * 100));

    if (ring) ring.setAttribute('stroke-dasharray', `${scrolled}, 100`);
    if (percentText) percentText.innerText = Math.round(scrolled) + "%";
  });

  // 2. Font Size Switcher
  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.getAttribute('data-size');

      // Update Active State
      fontBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Content Class
      content.classList.remove('font-s', 'font-m', 'font-l', 'font-xl');
      content.classList.add(`font-${size}`);

      // Persist preference
      localStorage.setItem('preferred-font-size', size);
    });
  });

  // Load preferred size
  const savedSize = localStorage.getItem('preferred-font-size');
  if (savedSize) {
    const btn = document.querySelector(`.sidebar-btn[data-size="${savedSize}"]`);
    if (btn) btn.click();
  }

  // 3. Position Toggle
  if (positionBtn) {
    positionBtn.addEventListener('click', () => {
      sidebar.classList.toggle('right');
      const isRight = sidebar.classList.contains('right');
      positionBtn.title = isRight ? "Move to left" : "Move to right";
      positionBtn.querySelector('svg').style.transform = isRight ? 'rotate(180deg)' : 'rotate(0deg)';
      localStorage.setItem('sidebar-position', isRight ? 'right' : 'left');
    });
  }

  // Load preferred position
  if (localStorage.getItem('sidebar-position') === 'right') {
    if (positionBtn) positionBtn.click();
  }

  // 5. Close Sidebar
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebar.style.opacity = '0';
      sidebar.style.pointerEvents = 'none';
      sidebar.style.transform = 'translateY(-50%) scale(0.9)';
    });
  }
})();

// Lightbox Logic
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const postImages = document.querySelectorAll('.post-content img');

  postImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
    document.body.style.overflow = ''; // Restore scroll
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
      lightbox.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
})();

// Smart Image Path Handler
(function () {
  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  const imageLocation = postContent.getAttribute('data-image-location');
  const articleSlug = postContent.getAttribute('data-article-slug');

  // Determine base path: use frontmatter value, or fallback to a convention
  // Convention: /assets/photos/article-slug/
  let basePath = imageLocation;
  if (!basePath || basePath === "") {
    if (articleSlug) {
      basePath = `/assets/photos/${articleSlug}/`;
    }
  }

  if (basePath) {
    // Normalize path: Replace backslashes and ensure trailing slash
    basePath = basePath.replace(/\\/g, '/');
    if (!basePath.endsWith('/')) basePath += '/';
    if (!basePath.startsWith('/') && !basePath.startsWith('http')) basePath = '/' + basePath;

    const images = postContent.querySelectorAll('img');
    images.forEach(img => {
      let src = img.getAttribute('src');
      if (!src) return;

      // Normalize incoming src (handle backslashes in markdown)
      src = src.replace(/\\/g, '/');

      // Check if src is purely a filename (no slashes) or relative
      const isAbsolute = src.startsWith('/') || src.startsWith('http');

      // If the user used obsidian style or just a filename, prepend the base path
      if (!isAbsolute) {
        // Strip out any redundant 'photos/' prefix if they accidentally included it 
        // e.g. if src is "photos/slug/img.png" and basePath is "/photos/slug/"
        if (src.startsWith('photos/')) {
          // We keep it as is if it's already a path they intended, 
          // but for "Zero Setup", we assume they just want the filename.
        }

        img.src = basePath + src;
      }
    });
  }
})();
