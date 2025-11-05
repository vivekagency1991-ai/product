// product.js
const STORE_DATA = [
  { id:1, brand:'Polycab', title:'Minimal Sofa', price:'₹24,999', img:'https://picsum.photos/seed/sofa1/1200/900', description:'A modern minimalist sofa with premium fabric finish and wooden legs.' },
  { id:2, brand:'Polycab', title:'Oak Coffee Table', price:'₹7,999', img:'https://picsum.photos/seed/table1/1200/900', description:'Solid oak wood coffee table with smooth lacquered surface.' },
  { id:3, brand:'Orlo', title:'Designer Lamp', price:'₹2,499', img:'https://picsum.photos/seed/lamp1/1200/900', description:'Elegant designer lamp with soft golden glow for living rooms.' },
  { id:4, brand:'Hindware', title:'Wall Art - Calm', price:'₹1,099', img:'https://picsum.photos/seed/art1/1200/900', description:'A beautiful wall art print that adds calm vibes to your home.' },
  { id:5, brand:'Orlo', title:'Velvet Chair', price:'₹12,499', img:'https://picsum.photos/seed/chair1/1200/900', description:'A plush velvet lounge chair.' },
  { id:6, brand:'Hindware', title:'Rug 4x6', price:'₹4,199', img:'https://picsum.photos/seed/rug1/1200/900', description:'Handwoven area rug with soft pile.' },
];

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"), 10);
  const product = STORE_DATA.find(p => p.id === id) || STORE_DATA[0];

  document.getElementById("productTitle").textContent = product.title;
  document.getElementById("productBrand").textContent = product.brand;
  document.getElementById("productPrice").textContent = product.price;
  document.getElementById("productImage").src = product.img;
  document.getElementById("productDescription").textContent = product.description;

  // Related items (same brand)
  const related = STORE_DATA.filter(p => p.brand === product.brand && p.id !== product.id);
  const relatedContainer = document.getElementById("relatedItems");
  related.forEach(p => {
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(p.title)}">
      <h3>${escapeHtml(p.title)}</h3>
      <div class="price">${p.price}</div>
    `;
    el.addEventListener("click", () => {
      window.location.href = `product.html?id=${p.id}`;
    });
    relatedContainer.appendChild(el);
  });

  document.getElementById("year3").textContent = new Date().getFullYear();
});

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]});
}