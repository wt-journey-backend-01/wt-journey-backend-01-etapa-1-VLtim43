document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/lanches")
    .then((res) => res.json())
    .then((lanches) => {
      const burgerDivs = document.querySelectorAll(".parent > div:not(.div1)");
      lanches.slice(0, burgerDivs.length).forEach((lanche, index) => {
        burgerDivs[index].innerHTML = `
          <strong>${lanche.nome}</strong><br/>
          <small>${lanche.ingredientes}</small>
        `;
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar lanches:", err);
    });
});
