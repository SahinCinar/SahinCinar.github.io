(() => {
  const app = {
    initialize() {
      let params = (new URL(document.location)).searchParams;
      let day = params.get('day');
      let slug = params.get('slug');
      this.cacheElements();
      this.fetchEvents(day, slug);
      this.fetchCategories();
      this.fetchNews();
    },
    cacheElements() {
      this.$categoryName = document.getElementById('categorie-mid');
      this.$categoryContent = document.getElementById('day_artical');
      this.$news = document.getElementById('news');
      this.$randomEventsHome = document.getElementById('artical-list');
      this.$detailPage = document.getElementById('detail-page');
      this.$searchPage = document.getElementById('searchbar')
    },
    async fetchCategories() {
      try {
        const response = await fetch('https://www.pgm.gent/data/gentsefeesten/categories.json');
        return category = await response.json();

      } catch (error) {
        console.log(error);
      }
    },
    async fetchEvents(day, slug) {
      try {
        const response = await fetch('https://www.pgm.gent/data/gentsefeesten/events_500.json');
        const events = await response.json();
        const category = await this.fetchCategories();
        this.categoryNames(events, day);
        this.categories(events, day);
        this.eventsHome(events);
        this.detailDay(events, day, slug);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchNews() {
      try {
        const response = await fetch('https://www.pgm.gent/data/gentsefeesten/news.json');
        const news = await response.json();
        this.newsArticle(news);
      } catch (error) {
        console.log(error);
      }
    },
    categoryNames(events, day) {
      let categoryArr = [];
      let filteredCategory = events.filter((event) => {
        const value = event.category.join('');
        const exists = category.includes(value);
        // d = d waarde geven
        // d == d waarde vergelijken, 1 =="1" true
        //  d === d waarde vergelijken en ook het type = true
        //  1 === 1 true, 1 === "1" false
        if (!exists && event.day == day) {
          categoryArr.push(
            value
          )
        }
      })
      let categoryNames = categoryArr.sort().map((name) => {
        return `
        <ul>
        <a href="#${name}">
        <li><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32"  height="32" viewBox="0 0 32 32">
        <title>category</title>
        <path d="M10.741 32c-2.648 0-5.137-1.031-7.009-2.902s-2.903-4.361-2.903-7.009 1.031-5.137 2.903-7.009l13.006-13.006c1.338-1.337 3.115-2.074 5.006-2.074s3.668 0.737 5.006 2.073c1.337 1.337 2.073 3.115 2.073 5.007s-0.737 3.67-2.073 5.007l-13.022 13.006c-1.591 1.592-4.413 1.594-6.005 0.001-0.791-0.792-1.245-1.887-1.245-3.005 0-1.135 0.442-2.202 1.244-3.003l12.016-12.002c0.553-0.551 1.45-0.553 2.003 0.001 0.551 0.553 0.551 1.449-0.001 2.001l-12.017 12.002c-0.267 0.267-0.414 0.622-0.414 1.001 0 0.373 0.151 0.738 0.415 1.002 0.53 0.529 1.472 0.531 2.004 0l13.021-13.007c0.802-0.801 1.244-1.868 1.244-3.004s-0.442-2.203-1.244-3.004c-1.606-1.606-4.403-1.606-6.009 0l-13.006 13.006c-1.337 1.338-2.074 3.115-2.074 5.007s0.737 3.669 2.074 5.007c1.337 1.337 3.115 2.073 5.007 2.073s3.67-0.737 5.007-2.073l13.006-13.006c0.553-0.553 1.448-0.553 2.001 0s0.553 1.448 0 2.001l-13.006 13.006c-1.872 1.871-4.361 2.902-7.009 2.902z"></path>
        </svg>${name}</li>
        </a>
        </ul>
        `;
      }).join('')
      if (this.$categoryName) {
        this.$categoryName.innerHTML = categoryNames;
      }
    },
    categories(events, day) {
      let category = [];
      let filteredCategory = events.filter((event) => {
        const value = event.category.join(' , ');
        const exists = category.includes(value);
        if (!exists && event.day == day) {
          category.push(
            value
          )
        }
      })

      const html = category.sort().map((category) => {
        const filteredEvents = events.filter((event) => {
          return event.day === day && event.category.includes(category);
        });
        return `
        
        <h2 id="${category}">${category}<svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="white" width="18" height="32" viewBox="0 0 18 32">
        <title>arrow-up</title>
        <path d="M17.809 9.9l-8.88-9.9-8.929 9.897 2.225 2.007 5.189-5.752-0 25.848h2.997l0-25.863 5.169 5.763z"></path>
        </svg>
        </h2>
        <ul>
        ${filteredEvents.map((event) =>{ 
          return ` 
   
          <li>
          <a href="detail.html?day=${day}&slug=${event.slug}"> 
          <div class="${event.title}">
          <img src="${event.image?.thumb ? event.image.thumb:"../static/img/activiteiten.jpg"}">
          <div class="day_artical-text">
            <h3>${event.title}<h3>
            <span><p>${event.location}</p></span>
            <p>${event.start} u.</p>
          </div>
          </div>
          </a>
          </li>
          `; }).join('')}
      </ul>
        `
      }).join('')
      if (this.$categoryContent) {
        this.$categoryContent.innerHTML = html;
      }
      console.log(events);
    },
    newsArticle(news) {
      let html =
        news.map((article) => {
          return `
        <div class="nieuws_article">
        <div class="resizing">
        <ul>
          <li><a href=""><img src="https://www.pgm.gent/data/gentsefeesten/${article.picture.medium}" alt="${article.title}"><span><h3>${article.title}</h3><svg version="1.1" fill="white" xmlns="http://www.w3.org/2000/svg" width="85" height="32" viewBox="0 0 85 32">
            <title>arrow-right-long</title>
            <path d="M68.393 0l-3.434 3.808 9.845 8.881h-74.803v5.129h74.828l-9.865 8.848 3.424 3.817 16.946-15.2z"></path>
            </svg></span></a></li>
        </ul>
      </div>
      </div>
        `
        })
      if (this.$news) {
        this.$news.innerHTML = html;
      }
    },
    eventsHome(events) {
      let length = events.length;
      let random = Math.floor(Math.random() * length);
      let html = events.slice(random, random + 8).map((event) => {
        return `
          <li>
          <h3>${event.day_of_week} ${event.day} juli</h3>
          <img src="${event.image?.thumb ? event.image.thumb : "static/img/artical-test.jpg"}" alt="test">
          <div class="artical_info">
          <h4>${event.title}</h4>
          <span>
          <p>${event.location}</p>
          </span>
          <p>${event.start} u.</p>
          </div>
          </li>
       `
      }).join('')
      if (this.$randomEventsHome) {
        this.$randomEventsHome.innerHTML = html;
      }
    },
    detailDay(events, day, slug) {
      let detail = events.filter((event) => {
        return event.day === day && event.slug == slug

      }).map((event) => {
        return `
        <div class="resizing">
      <div class="detail_headtitle-resizing">
        <div class="detail_headtitle">
        <a href="day.html?day=${event.day}"><h3><svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="white" width="86" height="32" viewBox="0 0 86 32">
        <title>arrow-left</title>
        <path d="M6.405 13.819h78.461v5.101h-78.461v-5.101zM16.853 31.516l3.406-3.796-12.634-11.331 12.639-11.402-3.416-3.787-16.848 15.199 16.853 15.116z"></path>
        </svg>OVERZICHT ${event.day_of_week} ${event.day} JULI</h3></a>
        </div>
        <div class="container_detail">
            <h1>${event.title}</h1>
            <section><span><a href="#"><p><svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="black" width="21"  height="21" viewBox="0 0 21 32">
            <title>marker</title>
            <path d="M10.4 0c-5.457 0-10.4 4.537-10.4 10.136 0 5.597 4.51 12.28 10.4 21.864 5.89-9.584 10.4-16.267 10.4-21.864 0-5.599-4.941-10.136-10.4-10.136zM10.4 14.667c-2.154 0-3.9-1.791-3.9-4s1.746-4 3.9-4c2.154 0 3.9 1.791 3.9 4s-1.746 4-3.9 4z"></path>
            </svg>${event.location}</p></a></span>
            <p>${event.start} u. - ${event.end} u.</p></section>
            <p>${event.description}</p>
          </div>
        </div>
          <div class="info_detail">
            <img src="${event.image?.thumb ? event.image.thumb : "../static/img/activiteiten.jpg"}" alt="">
            <p>Organisator: <a href="#">${event.organizer}</a></p>
            <p>Website: <a href="#">${event.url}</a></p>
            <p>Categorieën: <a href="#">${event.category}</a></p>
            <p>Prijs: €20,00</p>
            <p>Leeftijd: Vanaf 8 jaar</p>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="white" width="277" height="32" viewBox="0 0 277 32">
            <title>outside-nl</title>
            <path d="M34.279 0h-34.184v32h277.27v-32h-243.086zM17.187 20.226c-2.374 0-4.273-1.899-4.273-4.273s1.899-4.273 4.273-4.273 4.273 1.899 4.273 4.273-1.899 4.273-4.273 4.273zM17.947 22.979v3.988c0 0.38-0.38 0.76-0.76 0.76s-0.76-0.38-0.76-0.76v-3.988c0-0.38 0.38-0.76 0.76-0.76 0.475 0.095 0.76 0.38 0.76 0.76zM10.16 15.193c0.38 0 0.76 0.38 0.76 0.76s-0.38 0.76-0.76 0.76h-3.988c-0.38 0-0.76-0.38-0.76-0.76s0.38-0.76 0.76-0.76h3.988zM8.831 7.691c0.19-0.19 0.38-0.19 0.57-0.19s0.38 0.095 0.57 0.19l2.849 2.849c0.285 0.285 0.285 0.76 0 1.044s-0.76 0.285-1.044 0l-2.849-2.849c-0.38-0.285-0.38-0.76-0.095-1.045zM8.926 23.264l2.849-2.849c0.19-0.19 0.38-0.19 0.57-0.19v0c0.19 0 0.38 0.095 0.57 0.19 0.285 0.285 0.285 0.76 0 1.044l-2.849 2.849c-0.285 0.285-0.76 0.285-1.044 0-0.38-0.285-0.38-0.76-0.095-1.044zM16.427 8.926v-3.988c0-0.38 0.38-0.76 0.76-0.76s0.76 0.38 0.76 0.76v3.988c0 0.38-0.38 0.76-0.76 0.76s-0.76-0.285-0.76-0.76zM21.65 10.54l2.849-2.849c0.19-0.19 0.38-0.19 0.57-0.19s0.38 0.095 0.57 0.19c0.285 0.285 0.285 0.76 0 1.044l-2.849 2.849c-0.285 0.285-0.76 0.285-1.044 0-0.38-0.285-0.38-0.76-0.095-1.044zM21.65 20.415c0.19-0.19 0.38-0.19 0.57-0.19v0c0.19 0 0.38 0.095 0.57 0.19l2.849 2.849c0.285 0.285 0.285 0.76 0 1.044s-0.76 0.285-1.044 0l-2.849-2.849c-0.38-0.285-0.38-0.76-0.095-1.044zM24.214 16.712c-0.38 0-0.76-0.38-0.76-0.76s0.38-0.76 0.76-0.76h3.988c0.38 0 0.76 0.38 0.76 0.76s-0.38 0.76-0.76 0.76h-3.988zM275.466 30.101h-241.187v-28.202h241.187v28.202zM46.338 7.596c3.988 0 6.172 1.424 6.172 4.463 0 1.709-0.855 2.944-2.279 3.608 1.709 0.665 2.754 1.899 2.754 3.988 0 2.659-1.709 4.843-6.172 4.843h-6.172v-16.902h5.697zM44.154 14.338h2.279c1.899 0 2.659-0.76 2.659-1.899s-0.57-1.899-3.039-1.899h-1.899v3.798zM44.154 21.65h2.469c2.089 0 3.039-0.76 3.039-2.279 0-1.614-1.044-2.184-3.323-2.184h-2.184v4.463zM70.552 7.596v10.065c0 5.033-2.754 7.122-6.552 7.122s-6.552-2.089-6.552-7.027v-10.16h3.418v10.065c0 2.944 0.95 4.178 3.039 4.178s3.039-1.234 3.039-4.178v-10.065h3.608zM79.478 24.593h-3.418v-16.997h3.418v16.997zM96.285 7.596v2.944h-4.653v14.053h-3.418v-14.053h-4.653v-2.944h12.724zM110.718 7.596v2.944h-7.122v3.798h6.362v2.944h-6.362v4.463h7.122v2.944h-10.54v-17.092h10.54zM127.715 7.596v16.902h-2.849l-6.647-10.445v10.445h-3.228v-16.902h2.849l6.647 10.635v-10.635h3.228zM131.323 24.593l5.887-16.997h3.323l5.887 16.902h-3.703l-1.044-3.229h-5.697l-1.044 3.229h-3.608zM136.926 18.421h3.798l-1.899-5.982-1.899 5.982zM158.291 12.819c-0.285-1.614-1.234-2.564-2.944-2.564-1.994 0-3.039 1.329-3.039 4.558v2.374c0 3.134 1.044 4.558 3.039 4.558 1.709 0 2.564-0.855 2.944-2.564h3.228c-0.57 3.798-2.659 5.507-6.172 5.507-3.798 0-6.457-2.279-6.457-7.501v-2.374c0-5.223 2.659-7.501 6.457-7.501 3.323 0 5.602 1.804 6.172 5.507h-3.228zM176.902 7.596v2.944h-4.653v14.053h-3.418v-14.053h-4.653v-2.944h12.724zM184.404 24.593h-3.418v-16.997h3.418v16.997zM192.095 7.596l3.703 11.395 3.703-11.395h3.798l-5.887 16.902h-3.134l-5.982-16.902h3.798zM210.611 24.593h-3.418v-16.997h3.418v16.997zM227.418 7.596v2.944h-4.653v14.053h-3.418v-14.053h-4.653v-2.944h12.724zM241.852 7.596v2.944h-7.122v3.798h6.362v2.944h-6.362v4.463h7.122v2.944h-10.54v-17.092h10.54zM249.828 24.593h-3.418v-16.997h3.418v16.997zM266.635 7.596v2.944h-4.653v14.053h-3.418v-14.053h-4.653v-2.944h12.724z"></path>
            </svg>
            </div>
            <div class="detail_media">
        <ul>
          <li><a href="#"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="black" width="32" height="32" viewBox="0 0 32 32">
            <title>twitter</title>
            <path d="M12.973 24c7.17 0 11.093-5.77 11.093-10.773 0-0.164-0.003-0.328-0.013-0.49 0.765-0.54 1.411-1.19 1.93-1.935l0.017-0.025c-0.653 0.288-1.41 0.498-2.202 0.591l-0.038 0.004c0.801-0.468 1.407-1.197 1.706-2.068l0.008-0.027c-0.714 0.419-1.544 0.739-2.427 0.912l-0.050 0.008c-1.473-1.526-3.942-1.603-5.512-0.172-0.755 0.684-1.228 1.668-1.232 2.761v0.001c0 0.29 0.035 0.58 0.103 0.863-3.134-0.153-6.055-1.59-8.036-3.956-1.032 1.73-0.504 3.942 1.208 5.054-0.65-0.019-1.255-0.192-1.787-0.483l0.021 0.010v0.048c0 1.802 1.307 3.355 3.125 3.712-0.308 0.085-0.662 0.133-1.027 0.133-0.259 0-0.513-0.025-0.758-0.071l0.025 0.004c0.512 1.541 1.975 2.598 3.642 2.63-1.321 1.011-2.996 1.62-4.814 1.62-0.009 0-0.018 0-0.027-0h0.001c-0.31 0-0.62-0.017-0.929-0.053 1.69 1.068 3.747 1.702 5.953 1.702 0.007 0 0.014 0 0.022-0h-0.001"></path>
            </svg></a></li>
          <li><a href="#"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="black" width="32" height="32" viewBox="0 0 32 32">
            <title>facebook</title>
            <path d="M17.49 25v-8.21h2.95l0.44-3.2h-3.39v-2.043c0-0.927 0.276-1.558 1.697-1.558l1.813-0.001v-2.862c-0.766-0.080-1.655-0.126-2.555-0.126-0.030 0-0.061 0-0.091 0h0.005c-2.614 0-4.403 1.491-4.403 4.23v2.36h-2.956v3.2h2.956v8.21h3.535z"></path>
            </svg></a></li>
          <li><a href="#"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>pinterest</title>
            <path d="M8.625 13.486c0 1.396 0.614 3.464 2.234 3.911 0.057 0 0.112 0.057 0.224 0.057 0.392 0 0.615-1.006 0.615-1.286 0-0.335-0.895-1.062-0.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-0.838 5.475-3.464 5.475-0.95 0-1.788-0.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-0.838-0.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 0.614 0.057 1.285 0.392 1.844-0.559 2.124-1.62 5.308-1.62 7.487 0 0.671 0.111 1.341 0.167 2.012v0.112l0.168-0.056c1.956-2.459 1.844-2.962 2.738-6.203 0.447 0.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.040 0-3.52-3.297-5.867-6.929-5.867-3.911-0.001-7.822 2.458-7.822 6.425z"></path>
            </svg></a></li>
        </ul>
        </div>
        <div class="detail_reservatie">
          <h3>Info + Reservatie</h3>
          <p>Tours of Ghent</p>
          <p>Vrijdagmarkt</p>
          <p>9000</p>
          <p>Ghent</p>
          <p><a href="#">toursofghent@gmail.com</a></p>
          <p><a href="http://www.toursofghent.com/">http://www.toursofghent.com/</a></p>
        </div>
        <div class="detail_info_map">
        <div class="detail-map">
        <span><p><svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="white" width="21"  height="32" viewBox="0 0 21 32">
        <title>marker</title>
        <path d="M10.4 0c-5.457 0-10.4 4.537-10.4 10.136 0 5.597 4.51 12.28 10.4 21.864 5.89-9.584 10.4-16.267 10.4-21.864 0-5.599-4.941-10.136-10.4-10.136zM10.4 14.667c-2.154 0-3.9-1.791-3.9-4s1.746-4 3.9-4c2.154 0 3.9 1.791 3.9 4s-1.746 4-3.9 4z"></path>
        </svg>${event.location}</p></span>
        <p>${event.location}</p>
        <p>9000 Gent</p>
        <a href="#">Open in Google Maps</a>
        <button><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
        <title>map</title>
        <path d="M10 23.766v-17.526l-4 2v17.528l4-2zM11.086 1.224c0.265-0.141 0.58-0.224 0.914-0.224s0.649 0.083 0.925 0.229l-0.011-0.005 7.086 3.542 7.106-3.552c0.26-0.133 0.568-0.211 0.894-0.211 1.104 0 1.998 0.894 2 1.997v22c0 0 0 0.001 0 0.001 0 0.779-0.445 1.453-1.095 1.784l-0.011 0.005-7.98 3.99c-0.265 0.141-0.58 0.224-0.914 0.224s-0.649-0.083-0.925-0.229l0.011 0.005-7.086-3.542-7.106 3.554c-0.26 0.133-0.568 0.211-0.894 0.211-1.105 0-2-0.895-2-2 0-0.001 0-0.002 0-0.003v0-22c0-0.778 0.445-1.453 1.095-1.783l0.011-0.005 7.98-3.988zM14 6.238v17.528l4 2v-17.526l-4-2zM22 8.238v17.528l4-2v-17.526l-4 2z"></path>
        </svg>DOWNLOAD FEESTPLAN</button>
        </div>
      <img src="/static/img/googlemaps.png" alt="Google Maps">
      </div>
      <div class="andere_evenementen">
            <h3>Andere Evenementen Van Deze Organisator</h3>
            </div>
            </div>
            ${events.filter((event2)=>{
              return event.organizer == event2.organizer;
            }).map((event)=>{
              return ` 
              <div class="resizing">
              <div class="container_andere">
              <p>${event.day_of_week} ${event.day} JULI ${event.start} u.</p>
              <span><p>${event.title}</p></span>
              <p>${event.organizer}</p>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="white" width="36" height="32" viewBox="0 0 36 32">
              <title>euro</title>
              <path d="M20.685 27.227c-4.464 0-8-2.343-9.724-6.011h11.757v-3.801h-12.818c-0.088-0.442-0.088-0.928-0.088-1.414 0-0.442 0-0.884 0.044-1.326h12.862v-3.801h-11.845c1.724-3.713 5.348-6.099 9.812-6.099 4.376 0 7.823 2.343 9.503 5.967h5.348c-1.945-6.409-7.646-10.74-14.807-10.74-7.337 0-13.171 4.42-15.205 10.873h-5.525v3.801h4.818c-0.044 0.442-0.044 0.884-0.044 1.326 0 0.486 0 0.972 0.044 1.414h-4.818v3.801h5.569c2.033 6.409 7.823 10.785 15.16 10.785 7.16 0 12.862-4.331 14.807-10.74h-5.348c-1.679 3.624-5.127 5.967-9.503 5.967z"></path>
              </svg>
            </div>
            </div>
        `
            }).join('')}
          </div>
        `
      }).join('');
      this.$detailPage.innerHTML = detail;
    }
  }
  app.initialize();
})();