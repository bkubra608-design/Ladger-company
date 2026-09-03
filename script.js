/**
 * LEDGER - Master Interactive Scripts
 * Handles mobile nav, FAQ accordions, interactive mockups, AI Parser demo,
 * profit calculator, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveNav();
  initFaqAccordions();
  initInteractiveDashboard();
  initAiParserDemo();
  initProfitCalculator();
  initContactForm();
});

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.innerHTML = '✕';
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close when clicking a link inside drawer
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Highlight Current Active Navigation Link
 */
function highlightActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  const links = document.querySelectorAll('.nav-link, .mobile-nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const linkFile = href.split('/').pop();
    if (linkFile === filename || (filename === '' && (linkFile === 'index.html' || href === '/'))) {
      link.classList.add('active');
    }
  });
}

/**
 * FAQ Accordion Interactivity
 */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all others for a cleaner accordion feel
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Interactive Dashboard Mockup Simulation
 */
function initInteractiveDashboard() {
  const periodSelect = document.getElementById('demoPeriodSelect');
  if (!periodSelect) return;

  const revenueEl = document.getElementById('demoRevenue');
  const costsEl = document.getElementById('demoCosts');
  const profitEl = document.getElementById('demoProfit');
  const ordersCountEl = document.getElementById('demoOrders');
  const aovEl = document.getElementById('demoAov');
  const periodTypeEl = document.getElementById('demoPeriodType');

  const periodData = {
    daily: {
      revenue: 'Rs. 18,400',
      costs: 'Rs. 7,200',
      profit: 'Rs. 11,200',
      orders: '7 orders recorded',
      aov: 'Rs. 2,628',
      label: "Today's Sales"
    },
    monthly: {
      revenue: 'Rs. 125,000',
      costs: 'Rs. 65,000',
      profit: 'Rs. 60,000',
      orders: '48 orders recorded',
      aov: 'Rs. 2,604',
      label: "This Month"
    },
    yearly: {
      revenue: 'Rs. 1,480,000',
      costs: 'Rs. 790,000',
      profit: 'Rs. 690,000',
      orders: '584 orders recorded',
      aov: 'Rs. 2,534',
      label: "Year to Date"
    }
  };

  periodSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    const data = periodData[val] || periodData.monthly;

    if (revenueEl) revenueEl.textContent = data.revenue;
    if (costsEl) costsEl.textContent = data.costs;
    if (profitEl) profitEl.textContent = data.profit;
    if (ordersCountEl) ordersCountEl.textContent = data.orders;
    if (aovEl) aovEl.textContent = data.aov;
    if (periodTypeEl) periodTypeEl.textContent = data.label;
  });
}

/**
 * AI Message Parser Demo Simulation
 */
function initAiParserDemo() {
  const parseBtn = document.getElementById('runAiParserBtn');
  const messageInput = document.getElementById('aiParserInput');
  if (!parseBtn || !messageInput) return;

  const samples = [
    {
      text: "Salam! Mujhe 2 handmade journals chahiye A5 size, Rs. 2500 wale, Quetta delivery kardo please. Name: Ayesha Khan",
      customer: "Ayesha Khan",
      product: "Handmade Journal (A5)",
      qty: "2",
      price: "Rs. 2,500",
      channel: "Instagram Direct",
      city: "Quetta",
      status: "In Progress"
    },
    {
      text: "Need 1 Leather Wallet (Vintage Tan) for Rs. 3800. Delivery to House 14, F-7/2 Islamabad. Contact 0300-1234567. Payment Cash on Delivery",
      customer: "Hamza Tariq",
      product: "Leather Wallet (Vintage Tan)",
      qty: "1",
      price: "Rs. 3,800",
      channel: "WhatsApp Business",
      city: "Islamabad",
      status: "COD Confirmed"
    },
    {
      text: "Hi I want 3 scented soy candles (Lavender & Vanilla) Rs 4,200. Sent advance Rs 1000 via Easypaisa. Rest COD to Gulberg Lahore. Name Fatima",
      customer: "Fatima Noor",
      product: "Soy Candle Pack (Lavender/Vanilla)",
      qty: "3",
      price: "Rs. 4,200 (Adv. Rs 1,000)",
      channel: "Facebook Messenger",
      city: "Lahore",
      status: "Partial Advance"
    }
  ];

  let currentSampleIdx = 0;

  // Preset buttons
  const presetBtns = document.querySelectorAll('.parser-preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10) || 0;
      currentSampleIdx = idx;
      messageInput.value = samples[idx].text;
      executeParsing(samples[idx]);
    });
  });

  parseBtn.addEventListener('click', () => {
    const rawText = messageInput.value.trim();
    if (!rawText) return;

    parseBtn.innerHTML = 'Parsing message...';
    parseBtn.disabled = true;

    setTimeout(() => {
      // Find matching sample or smart defaults
      const sample = samples[currentSampleIdx] || {
        customer: "Customer Inquiry",
        product: "Extracted Product Line",
        qty: "1",
        price: "Rs. 2,500",
        channel: "WhatsApp / Direct",
        city: "Karachi",
        status: "Ready to Book"
      };

      executeParsing(sample);
      parseBtn.innerHTML = '✨ Parse Message Again';
      parseBtn.disabled = false;
    }, 450);
  });

  function executeParsing(data) {
    const elCustomer = document.getElementById('parsedCustomer');
    const elProduct = document.getElementById('parsedProduct');
    const elQty = document.getElementById('parsedQty');
    const elPrice = document.getElementById('parsedPrice');
    const elChannel = document.getElementById('parsedChannel');
    const elCity = document.getElementById('parsedCity');

    if (elCustomer) elCustomer.textContent = data.customer;
    if (elProduct) elProduct.textContent = data.product;
    if (elQty) elQty.textContent = data.qty;
    if (elPrice) elPrice.textContent = data.price;
    if (elChannel) elChannel.textContent = data.channel;
    if (elCity) elCity.textContent = data.city;
  }
}

/**
 * Profit Calculator Simulator
 */
function initProfitCalculator() {
  const saleInput = document.getElementById('calcSalePrice');
  const costInput = document.getElementById('calcCostPrice');
  const qtyInput = document.getElementById('calcQuantity');
  const profitOutput = document.getElementById('calcNetProfit');
  const marginOutput = document.getElementById('calcMargin');

  if (!saleInput || !costInput || !profitOutput) return;

  function recalculate() {
    const sale = parseFloat(saleInput.value) || 0;
    const cost = parseFloat(costInput.value) || 0;
    const qty = parseFloat(qtyInput?.value) || 1;

    const totalSale = sale * qty;
    const totalCost = cost * qty;
    const profit = totalSale - totalCost;
    const margin = totalSale > 0 ? Math.round((profit / totalSale) * 100) : 0;

    profitOutput.textContent = `Rs. ${profit.toLocaleString()}`;
    if (marginOutput) {
      marginOutput.textContent = `${margin}% margin`;
      marginOutput.className = profit >= 0 ? 'profit-pos' : 'profit-neg';
    }
  }

  saleInput.addEventListener('input', recalculate);
  costInput.addEventListener('input', recalculate);
  if (qtyInput) qtyInput.addEventListener('input', recalculate);
}

/**
 * Contact Form Validation and Submission
 */
function initContactForm() {
  const form = document.getElementById('ledgerContactForm');
  if (!form) return;

  const alertBox = document.getElementById('contactFormAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      if (alertBox) {
        alertBox.className = 'form-alert error';
        alertBox.textContent = 'Please fill out all required fields (Name, Email, and Message).';
        alertBox.style.display = 'block';
      }
      return;
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (alertBox) {
        alertBox.className = 'form-alert error';
        alertBox.textContent = 'Please provide a valid email address.';
        alertBox.style.display = 'block';
      }
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      if (alertBox) {
        alertBox.className = 'form-alert success';
        alertBox.textContent = 'Thank you for reaching out to Ledger! Your message has been received. Our team will get back to you within 24 hours.';
        alertBox.style.display = 'block';
      }
    }, 600);
  });
}
