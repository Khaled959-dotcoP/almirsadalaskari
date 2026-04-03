const BLOG_KEY = 'blog_posts';

function getPosts() {
    return JSON.parse(localStorage.getItem(BLOG_KEY) || '[]');
}

function setPosts(posts) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
}

function renderNews() {
    const newsList = document.getElementById('newsList');
    const noNews = document.getElementById('noNews');
    const posts = getPosts();

    if (!posts.length) {
        newsList.innerHTML = '';
        noNews.style.display = 'block';
        return;
    }

    noNews.style.display = 'none';
    newsList.innerHTML = '';

    posts.forEach(item => {
        const card = document.createElement('article');
        card.className = 'news-item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="news-item-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            </div>
        `;
        newsList.appendChild(card);
    });
}

renderNews();
