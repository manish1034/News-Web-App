
window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${api_key}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cards = document.getElementById('cards');
    const cardContainer = document.getElementById('card-container');

    cards.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = cardContainer.content.cloneNode(true);
        addData(cardClone,article);
        cards.appendChild(cardClone);
    })

    function addData(cardClone, article) {
        const newsSrc = cardClone.getElementById('news-src');
        const newsTitle = cardClone.getElementById('news-title');
        const newsImg = cardClone.getElementById('news-img');

        const date = new Date(article.publishedAt).toLocaleString("en-us", {
            timeZone: "Asia/Jakarta"
        });
        newsImg.src = article.urlToImage;
        newsSrc.innerHTML = `${article.source.name} • ${date}`;
        newsTitle.innerHTML = article.title;

        cardClone.firstChild.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })
    }
}

let currItem = null
function clickedItem(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currItem?.classList.remove('active');
    currItem = navItem;
    currItem.classList.add('active');
}