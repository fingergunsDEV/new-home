export function initializeApp() {
  // Demo Tabs Functionality
  const tabs = document.querySelectorAll('.demo-tab');
  const contents = document.querySelectorAll('.demo-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-demo`).classList.add('active');
    });
  });

  // Chart.js for Visitor Analytics
  const ctx = document.getElementById('visitors-chart')?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Visitors',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#4a90e2',
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            fill: true,
          },
          {
            label: 'Conversions',
            data: [2000, 3000, 2500, 4000, 3500, 5000],
            borderColor: '#f5a623',
            backgroundColor: 'rgba(245, 166, 35, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Export Buttons (Placeholder)
  document.getElementById('export-pdf')?.addEventListener('click', () => {
    alert('PDF export functionality to be implemented.');
  });

  document.getElementById('export-csv')?.addEventListener('click', () => {
    alert('CSV export functionality to be implemented.');
  });

  // Dropdown Menu Accessibility
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = toggle.closest('.dropdown');
      const menu = dropdown.querySelector('.dropdown-menu');
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}
