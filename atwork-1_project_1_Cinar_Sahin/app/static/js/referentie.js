(() => {
  const ref = {
    initialize() {
      this.cacheElements();
      this.buildUI();
    },
    cacheElements() {
      this.referenceCardsElements = document.querySelector("#reference");
    },
    buildUI() {
      this.referenceCardsElements.innerHTML = this.generateHTMLreferenceCards();
      console.log(this.referenceCardsElements);
    },
    generateHTMLreferenceCards() {
      
      return REFERENCES
      
        .map((ref) => {
          return`
          <div class="reference-aanleg">
          <img src="${ref.image}" id="${ref.id}" alt="Photo">
          <p>${ref.description}</p>
          </div>
        `;
        })
        .join("");
    },
  };

  ref.initialize();
})();