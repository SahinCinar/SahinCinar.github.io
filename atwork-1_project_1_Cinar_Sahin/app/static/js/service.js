(() => {
    const service = {
      initialize() {
        this.cacheElements();
        this.buildUI();
      },
      cacheElements() {
        this.serviceCardsElements = document.querySelector("#service");
      },
      buildUI() {
        this.serviceCardsElements.innerHTML = this.generateHTMLserviceCards();
        console.log(this.serviceCardsElements);
      },
      generateHTMLserviceCards() {
        const curentPage = this.serviceCardsElements.dataset.type;
        return Service.filter((Service)=> Service.type === curentPage)
        //return Service
          .map((service) => {
            return`
             <div class="aanleg1">
            <a href="#">
            <img src="${service.image}" alt="">
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <button>Meer informatie</button>
            </a>
            </div>
          `;
          })
          .join("");
      },
    };
  
    service.initialize();
  })();