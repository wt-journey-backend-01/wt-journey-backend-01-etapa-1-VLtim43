//inject json data into home
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/lanches")
    .then((res) => res.json())
    .then((lanches) => {
      const burgerDivs = document.querySelectorAll(".parent > div:not(.div1)");
      lanches.slice(0, burgerDivs.length).forEach((lanche, index) => {
        burgerDivs[index + 1].innerHTML = `
          <div class="card">
          <div>
          </div>
          
          <div>
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
