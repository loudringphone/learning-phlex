import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const audio_urls_str = this.data.get('audioUrls');
    const audio_urls = JSON.parse(audio_urls_str)
    let page = 1;
    let pages;
    const audio1 = new Audio(audio_urls.audio1);
    const audio2 = new Audio(audio_urls.audio2);
    const audio3 = new Audio(audio_urls.audio3);
    const audio4 = new Audio(audio_urls.audio4);
    const audio5 = new Audio(audio_urls.audio5);

    const paths = document.querySelectorAll('a')

    let chickenTimeouts = [];

    paths.forEach(function (path) {
      path.addEventListener('click', function() {
        if (chickenTimeouts.length > 0) {
          chickenTimeouts.forEach(chicken => clearTimeout(chicken));
        }
      });
    });

    const formSearch = document.getElementById('search')

    const searchFlickr = function (keywords) {
        console.log('Searching for', keywords);

        const flickrURL = 'https://api.flickr.com/services/rest';

        fetch(`${flickrURL}?method=flickr.photos.search&api_key=2f5ac274ecfac5a455f38745704ad084&text=${keywords}&format=json&nojsoncallback=1&page=${page}`)
            .then(response => response.json())
            .then(showImages)
            .then(info => console.log(info))
            .catch(error => console.error('Error:', error));
    };

    const showImages = function (results) {
        const imagesContainer = document.getElementById('images');
        if (!imagesContainer) {
            console.error("Images container not found");
            return;
        }

        const urls = results.photos.photo.map(generateURL);

        urls.forEach(function (url) {
            const img = document.createElement('img');
            img.src = url[0];

            const a = document.createElement('a');
            a.href = url[1];
            a.target = "_blank";

            a.appendChild(img);
            imagesContainer.appendChild(a);
        });
    };

    const generateURL = function (p) {
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

    let timeout;
    let chicken;

    const flyButton = document.getElementById('btnFly');
    if (flyButton) {
        flyButton.addEventListener('click', function () {
            const imgs = document.querySelectorAll('img');
            imgs.forEach(function (img, index) {
                chicken = setTimeout(function () {
                    const rand = Math.floor(Math.random() * 5) + 1;
                    switch (rand) {
                        case 1:
                            audio1.play();
                            break;
                        case 2:
                            audio2.play();
                            break;
                        case 3:
                            audio3.play();
                            break;
                        case 4:
                            audio4.play();
                            break;
                        case 5:
                            audio5.play();
                            break;
                    }
                    img.classList.add('fly');
                }, 1000 * (index + 1));
                chickenTimeouts.push(chicken)
            });
        });
    }

    const backTopButton = document.getElementById('backTop');
    if (backTopButton) {
        backTopButton.addEventListener('click', function () {
            document.getElementById('query').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    formSearch.addEventListener('submit', function (event) {
        event.preventDefault();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            document.querySelectorAll('p').forEach(function (p) {
                p.remove();
            });
    
            document.querySelectorAll('br').forEach(function (br) {
                br.remove();
            });
    
            document.querySelectorAll('img').forEach(function (img) {
                img.remove();
            });
    
            const wiki = document.getElementById('query').value;
            const yourAPIkey = 'AIzaSyB78d32yWEekzTclS_gZO9CqWVCMNptHgY';
            const yourCSEid = 'e3218dc0a18944649';
    
            fetch(`https://www.googleapis.com/customsearch/v1?key=${yourAPIkey}&cx=${yourCSEid}&q=${wiki.replace(/ /g, '%20')}%20wikipedia`)
                .then(response => response.json())
                .then(function (data) {
                    try {
                        let wikiURL = data.items[0].link;
                        const wikiTitle = wikiURL.substring(wikiURL.indexOf('/wiki/') + 6);
                        const dbpediaURL = `https://dbpedia.org/page/${wikiTitle}`;
    
                        fetch(dbpediaURL)
                            .then(response => response.text())
                            .then(function (data) {
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
    
                                    page = 1;
                                    const searchTerms = document.getElementById('query').value;
                                    searchFlickr(searchTerms);
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    } catch (error) {
                        const imagesContainer = document.getElementById('images');
                        if (imagesContainer) {
                            imagesContainer.insertAdjacentHTML('beforeend', '<br>');
                            imagesContainer.insertAdjacentHTML('beforeend', '<p style="font-weight:bold">No result on Wikipedia</p>');
                        }
                        page = 1;
                        const searchTerms = document.getElementById('query').value;
                        searchFlickr(searchTerms);
                    }
                })
                .catch(error => console.error('Error:', error));
        }, 1000);
    });
        

    window.addEventListener('scroll', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

            if (scrollBottom < 500) {
                if (page <= pages) {
                    const searchTerms = document.getElementById('query').value;
                    page = page + 1;
                    searchFlickr(searchTerms);
                    if (page === pages && !document.getElementById('noMorePhoto')) {
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