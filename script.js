



const slides = document.querySelectorAll(".yogurt-slide");
const dots = document.querySelectorAll(".dot");
const hero = document.getElementById("hero");

let current = 0;

function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));

    // change background according to flavor
    const newBg = slides[index].getAttribute("data-bg");
    hero.style.background = newBg;
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        current = i;
        showSlide(i);
    });
});

function autoSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

setInterval(autoSlide, 4000); // switch every 4 seconds

showSlide(0);



document.addEventListener('DOMContentLoaded', () => {
  // ---- data ----
  const flavors = [
    {
      id: "strawberry",
      img: "straw.jpeg",       // <-- ensure this path is correct
      title: "Strawberry Delight",
      desc: "Sweet and tangy strawberry yogurt made with fresh, organic strawberries",
      price: "#2,000",
      nutrition: [
        { value: "35cl", label: "Big Size" },
        { value: "25cl", label: "Small Size" },
        { value: "3g", label: "Fat" }
      ]
    },
    {
      id: "vanilla",
      img: "van.jpeg",             // <-- ensure this path is correct
      title: "Classic Vanilla",
      desc: "Smooth and creamy vanilla yogurt with a timeless, comforting flavor",
      price: "#2,000",
      nutrition: [
        { value: "35cl", label: "Big Size" },
        { value: "25cl", label: "Small Size" },
        { value: "2g", label: "Fat" }
      ]
    }
  ];

  // ---- DOM refs ----
  const placeholder = document.querySelector("#current-flavor-image .image-placeholder");
  const titleEl = document.getElementById("current-flavor-title");
  const descEl = document.getElementById("current-flavor-desc");
  const priceEl = document.getElementById("current-flavor-price");
  const nutritionEl = document.querySelector("#current-flavor-image .nutrition-facts");
  const flavorCards = document.querySelectorAll(".flavor-card");
  const nextBtn = document.getElementById("next-flavor-btn");

  if (!placeholder) {
    console.error("Couldn't find .image-placeholder inside #current-flavor-image");
    return;
  }

  // Helper: find flavor object by id
  function getFlavorById(id) {
    return flavors.find(f => f.id === id);
  }

  // Render function
  function renderFlavor(flavorObj) {
    if (!flavorObj) { console.error("No flavor object provided to renderFlavor"); return; }

    // Fade-out current image if exists
    const existingImg = placeholder.querySelector("img");
    if (existingImg) {
      existingImg.classList.add("hidden");
      // remove after animation
      setTimeout(() => { if (existingImg.parentNode) existingImg.remove(); }, 280);
    }

    // Inject new image (hidden initially for fade in)
    const img = document.createElement("img");
    img.src = flavorObj.img;
    img.alt = flavorObj.title;
    img.className = "flavor-img hidden";
    img.addEventListener('load', () => {
      // small delay then show (fade-in)
      requestAnimationFrame(() => {
        img.classList.remove('hidden');
      });
    });
    img.addEventListener('error', () => {
      console.error("Image failed to load:", flavorObj.img);
      // fallback: show placeholder text
      placeholder.innerHTML = `<div style="padding:20px;color:#666">Image not found: ${flavorObj.img}</div>`;
    });

    placeholder.appendChild(img);

    // Update text and price
    titleEl.textContent = flavorObj.title;
    descEl.textContent = flavorObj.desc;
    priceEl.textContent = flavorObj.price;

    // Update nutrition facts
    nutritionEl.innerHTML = flavorObj.nutrition.map(n => 
      `<div class="fact"><strong>${n.value}</strong> ${n.label}</div>`
    ).join("");

    // Update active class on cards
    flavorCards.forEach(card => {
      card.classList.toggle('active', card.dataset.flavor === flavorObj.id);
    });

    console.log("Rendered flavor:", flavorObj.id);
  }

  // Initialize with strawberry (or first flavor)
  let currentIndex = 0;
  renderFlavor(flavors[currentIndex]);

  // Card click handlers
  flavorCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.flavor;
      const idx = flavors.findIndex(f => f.id === id);
      if (idx >= 0) {
        currentIndex = idx;
        renderFlavor(flavors[currentIndex]);
      } else {
        console.warn("Clicked flavor id not in flavors array:", id);
      }
    });
  });

  // Next button cycles flavors
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % flavors.length;
    renderFlavor(flavors[currentIndex]);
  });

  // Optional: make shop button scroll to contact (if you have .shop-btn)
  const shopBtn = document.querySelector(".shop-btn");
  if (shopBtn) {
    shopBtn.addEventListener('click', () => {
      const contact = document.querySelector("#contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth" });
    });
  }
});




