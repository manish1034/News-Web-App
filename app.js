
window.addEventListener('load', () => fetchNews("India"));
function relod() {
    window.location.reload();
}
async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await response.json();
    // console.log(data);
    // articles ki form mai data aaya hai and then uske andar sare articles present hai.
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const cardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        addData(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })

    function addData(cardClone, article) {
        const newsImg = cardClone.querySelector('#news-img');
        const newsSrc = cardClone.querySelector('#news-src');
        const newsTitle = cardClone.querySelector('#news-title');
        const newsDesc = cardClone.querySelector('#news-desc');
        const knowMore = cardClone.querySelector('#more');

        const date = new Date(article.publishedAt).toLocaleString("en-us", {
            timeZone: "Asia/Jakarta"
        });
        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsSrc.innerHTML = `${article.source.name} • ${date}`;
        newsDesc.innerHTML = article.description;

        knowMore.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })
    }
}

let curSelectedItem = null;
function onNavClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedItem?.classList.remove('active');
    curSelectedItem = navItem;
    curSelectedItem.classList.add('active');
}

const searchBtn = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener('click', () => {
    const query = searchText.value ;
    // if pressed by mistake with no input
    if(!query) return;
    fetchNews(query);
    curSelectedItem?.classList.remove('active');
    curSelectedItem = null;
})