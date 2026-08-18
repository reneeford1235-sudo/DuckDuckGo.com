document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  const searchInput = document.querySelector(".duck-search input");
  const searchButton = document.querySelector(".duck-search .btn");
  const cards = [...document.querySelectorAll(".duck-card")];

  function searchDucks() {
    if (!searchInput) return;
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(card => card.classList.remove("highlight"));
    if (!query) return;

    const match = cards.find(card =>
      card.textContent.toLowerCase().includes(query)
    );

    if (match) {
      match.classList.add("highlight");
      match.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  if (searchButton) searchButton.addEventListener("click", searchDucks);
  if (searchInput) {
    searchInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        searchDucks();
      }
    });
  }

  const pins = document.querySelectorAll(".pin");
  pins.forEach((pin, index) => {
    pin.addEventListener("click", () => {
      const card = cards[index % cards.length];
      if (!card) return;
      cards.forEach(c => c.classList.remove("highlight"));
      card.classList.add("highlight");
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  const form = document.querySelector(".share-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      let message = form.querySelector(".form-message");
      if (!message) {
        message = document.createElement("p");
        message.className = "form-message";
        form.appendChild(message);
      }
      message.textContent = "Thanks for sharing this stop! Your duck's Michigan adventure keeps going. 🦆";
    });
  }

  const fileInput = document.querySelector('.upload input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const label = fileInput.closest(".upload");
      const small = label && label.querySelector("small");
      if (small && fileInput.files.length) {
        small.textContent = fileInput.files.length === 1
          ? fileInput.files[0].name
          : `${fileInput.files.length} photos selected`;
      }
    });
  }
});
