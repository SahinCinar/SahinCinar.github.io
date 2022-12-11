(() => {
    const serviceReference = {
      initialize() {
        this.cacheElements();
        this.buildUI();
      },
      cacheElements() {
        this.serviceReferenceCardsElements = document.querySelector("#referentie");
      },
      buildUI() {
        this.serviceReferenceCardsElements.innerHTML = this.generateHTMLserviceCards();
        console.log(this.serviceReferenceCardsElements);
      },
      generateHTMLserviceCards() {
        
        return REFERENCES.slice(0 , 6)
        
          .map((ref) => {
            return`
            <div class="reference-aanleg">
            <a href="#">
            <img src="${ref.image}" alt="Photo">
            <p>${ref.description}</p>
            </a>
            </div>
          `;
          })
          .join("");
      },
    };
  
    serviceReference.initialize();
  })();