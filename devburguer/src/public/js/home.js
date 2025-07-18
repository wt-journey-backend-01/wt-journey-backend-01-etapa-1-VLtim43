//inject json data into home
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/lanches")
    .then((res) => res.json())
    .then((lanches) => {
      const cardDivs = document.querySelectorAll(".grid_container .card");
      lanches.slice(0, cardDivs.length).forEach((lanche, index) => {
        cardDivs[index].innerHTML = `
          <div class="card_content">
            <div class="card_image">
              <img src="/images/hamburger.png" alt="${lanche.nome}" />
            </div>
            <div class="card_description">
              <h3>${lanche.nome}</h3>
              <p>${lanche.ingredientes}</p>
            </div>
          </div>
        `;
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar lanches:", err);
    });
});

// clear form on refresh
window.addEventListener("load", () => {
  const form = document.querySelector("form");
  if (form) {
    form.reset();
  }
});
