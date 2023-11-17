import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "terms" ]
  
  initialize() {
    const audio_urls_str = this.data.get('audioUrls');
    const audio_urls = JSON.parse(audio_urls_str)
    this.audio1 = new Audio(audio_urls.audio1);
    this.audio2 = new Audio(audio_urls.audio2);
    this.audio3 = new Audio(audio_urls.audio3);
    this.audio4 = new Audio(audio_urls.audio4);
    this.audio5 = new Audio(audio_urls.audio5);
    this.chickenTimeouts = []
    this.page = 1
    this.pages = 1
    this.fetchTimeout = setTimeout(()=>{})
    const generateURL = (p) => {
      return [
        [
          'http://farm',
          p.farm,
          '.static.flickr.com/',
          p.server,
          '/',
          p.id,
          '_',
          p.secret,
          '_q.jpg' // change 'q' to something else for different sizes (see documentation)
        ].join(''),
        `https://www.flickr.com/photos/${p.owner}/${p.id}`
      ];
    };
    const showImages = (results) => {
      const imagesContainer = document.getElementById('images');
      if (!imagesContainer) {
        console.error("Images container not found");
        return;
      }
      this.pages = results.photos.pages
      const urls = results.photos.photo.map(generateURL);

      urls.forEach((url) => {
        const img = document.createElement('img');
        img.src = url[0];

        const a = document.createElement('a');
        a.href = url[1];
        a.target = "_blank";

        a.appendChild(img);
        imagesContainer.appendChild(a);
      });
    };
    this.searchFlickr = (keywords) => {
      console.log('Searching for', keywords);
      this.page = 1
      const flickrURL = 'https://api.flickr.com/services/rest';

      fetch(`${flickrURL}?method=flickr.photos.search&api_key=2f5ac274ecfac5a455f38745704ad084&text=${keywords}&format=json&nojsoncallback=1&page=${this.page}`)
          .then(response => response.json())
          .then(showImages)
          .then(info => console.log(info))
          .catch(error => console.error('Error:', error));
    };
  }
  search(event) {
    event.preventDefault();
    const terms = this.termsTarget.value
    clearTimeout(this.fetchTimeout);
    this.fetchTimeout = setTimeout(() => {
      document.querySelectorAll('p').forEach((p) => {
        p.remove();
      });

      document.querySelectorAll('br').forEach((br) => {
        br.remove();
      });

      document.querySelectorAll('img').forEach((img) => {
        img.remove();
      });
      const wiki = document.getElementById('query').value;
      const yourAPIkey = 'AIzaSyB78d32yWEekzTclS_gZO9CqWVCMNptHgY';
      const yourCSEid = 'e3218dc0a18944649';

      fetch(`https://www.googleapis.com/customsearch/v1?key=${yourAPIkey}&cx=${yourCSEid}&q=${wiki.replace(/ /g, '%20')}%20wikipedia`)
        .then(response => response.json())
        .then((data) => {
          try {
              let wikiURL = data.items[0].link;
              const wikiTitle = wikiURL.substring(wikiURL.indexOf('/wiki/') + 6);
              const dbpediaURL = `https://dbpedia.org/page/${wikiTitle}`;

              fetch(dbpediaURL)
                .then(response => response.text())
                .then((data) => {
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(data, 'text/html');
                  const titleElement = doc.querySelector('title');
                  const descriptionElement = doc.querySelector('meta[property="og:description"]');
                  let title
                  if (titleElement) {
                      title = titleElement.textContent;
                  }
                  let description
                  if (descriptionElement) {
                    title = wikiTitle.replace(/_/g, ' ');
                    description = descriptionElement.getAttribute('content');

                    const imagesContainer = document.getElementById('images');
                    if (imagesContainer) {
                        imagesContainer.insertAdjacentHTML('beforeend', '<br>');
                        imagesContainer.insertAdjacentHTML('beforeend', `<p>${description}</p>`);
                        imagesContainer.insertAdjacentHTML('beforeend', `<p style="font-weight:bold">${decodeURIComponent(title)}</p>`);
                    }

                    this.searchFlickr(terms);
                  }
                })
                .catch(error => console.error('Error:', error));
            } catch (error) {
                    const imagesContainer = document.getElementById('images');
                    if (imagesContainer) {
                      imagesContainer.insertAdjacentHTML('beforeend', '<br>');
                      imagesContainer.insertAdjacentHTML('beforeend', '<p style="font-weight:bold">No result on Wikipedia</p>');
                    }
                    this.searchFlickr(terms);
                  }
                })
                .catch(error => console.error('Error:', error));
    }, 1000)
  };
  fly() {
    let chicken;
    const imgs = document.querySelectorAll('img');
    imgs.forEach((img, index) => {
      chicken = setTimeout(() => {
        const rand = Math.floor(Math.random() * 5) + 1;
        switch (rand) {
          case 1:
            this.audio1.play();
            break;
          case 2:
            this.audio2.play();
            break;
          case 3:
            this.audio3.play();
            break;
          case 4:
            this.audio4.play();
            break;
          case 5:
            this.audio5.play();
            break;
        }
        img.classList.add('fly');
      }, 1250 * (index + 1));
      this.chickenTimeouts.push(chicken)
    });
  }
  backTop() {
    document.getElementById('query').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  scroll() {
    
  }
  connect() {
    const paths = document.querySelectorAll('a')
    paths.forEach((path) => {
      path.addEventListener('click', () => {
        if (this.chickenTimeouts.length > 0) {
          this.chickenTimeouts.forEach(chicken => clearTimeout(chicken));
        }
      });
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

        if (scrollBottom < 500) {
          if (this.page <= this.pages) {
            this.page = this.page + 1;
            this.searchFlickr(this.termsTarget.value);
            if (this.page === this.pages && !document.getElementById('noMorePhoto')) {
              const p = document.createElement('p');
              p.id = 'noMorePhoto';
              p.textContent = 'No more photos!';
              document.body.appendChild(p);
            }
          }
        }
      }, 300);
    });
  }
}