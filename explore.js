// explore.js — now includes brand + search functionality

const STORE_DATA = [
  { id:1, brand:'Polycab', title:'Minimal Sofa', priceText:'₹24,999', img:'https://picsum.photos/seed/sofa1/800/600' },
  { id:2, brand:'Polycab', title:'Oak Coffee Table', priceText:'₹7,999', img:'https://picsum.photos/seed/table1/800/600' },
  { id:3, brand:'Orlo', title:'Designer Lamp', priceText:'₹2,499', img:'https://picsum.photos/seed/lamp1/800/600' },
  { id:4, brand:'Hindware', title:'Wall Art - Calm', priceText:'₹1,099', img:'https://picsum.photos/seed/art1/800/600' },
  { id:5, brand:'Orlo', title:'Velvet Chair', priceText:'₹12,499', img:'https://picsum.photos/seed/chair1/800/600' },
  { id:6, brand:'Hindware', title:'Rug 4x6', priceText:'₹4,199', img:'https://picsum.photos/seed/rug1/800/600' },
  { id:7, brand:'Pigeon', title:'Indoor Planter', priceText:'₹899', img:'https://picsum.photos/seed/planter1/800/600' },
  { id:8, brand:'Pigeon', title:'Bamboo Shelves', priceText:'₹5,999', img:'https://picsum.photos/seed/shelf1/800/600' },
];

document.addEventListener('DOMContentLoaded', () => {
  const brandsContainer = document.getElementById('brandButtons');
  const itemsGrid = document.getElementById('itemsGrid');
  const searchInput = document.getElementById('searchInput');

  let selectedBrand = 'All';
  let searchTerm = '';

  const brands = ['All', ...Array.from(new Set(STORE_DATA.map(i => i.brand)))];

  // Create brand buttons
  function createBrandButtons() {
    brandsContainer.innerHTML = '';
    brands.forEach((b, idx) => {
      const btn = document.createElement('button');
      btn.className = 'brand-btn' + (idx === 0 ? ' active' : '');
      btn.textContent = b;
      btn.dataset.brand = b;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.brand-btn').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        selectedBrand = b;
        renderItems();
      });
      brandsContainer.appendChild(btn);
    });
  }

  // Render items based on brand & search
  function renderItems() {
    const filtered = STORE_DATA.filter(item => {
      const brandMatch = selectedBrand === 'All' || item.brand === selectedBrand;
      const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return brandMatch && searchMatch;
    });

    itemsGrid.innerHTML = '';

    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'card';
      empty.textContent = 'No matching products found.';
      itemsGrid.appendChild(empty);
      return;
    }

    filtered.forEach(item => {
      const el = document.createElement('article');
      el.className = 'item';
      el.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <h3>${item.title}</h3>
        <div class="meta">${item.brand}</div>
        <div class="price">${item.priceText}</div>
      `;
      el.addEventListener('click', () => {
        window.location.href = `product.html?id=${item.id}`;
      });
      itemsGrid.appendChild(el);
    });
  }

  // Search input listener
  searchInput.addEventListener('input', e => {
    searchTerm = e.target.value.trim();
    renderItems();
  });

  createBrandButtons();
  renderItems();
});