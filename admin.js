const BLOG_KEY = 'blog_posts';

function getPosts() {
    return JSON.parse(localStorage.getItem(BLOG_KEY) || '[]');
}

function savePosts(posts) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
}

function renderAdminNews() {
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

    posts.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'news-item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="news-item-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <button class="remove-news" data-index="${index}">حذف المنشور</button>
            </div>
        `;
        newsList.appendChild(card);
    });

    document.querySelectorAll('.remove-news').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = Number(this.dataset.index);
            const updated = getNews();
            updated.splice(idx, 1);
            saveNews(updated);
            renderAdminNews();
        });
    });
}

const adminPassword = 'MES3WAHY4XG4';
const userPass = prompt('أدخل كلمة المرور:');
if (userPass !== adminPassword) {
    alert('كلمة مرور خاطئة');
    window.location.href = 'index.html';
} else {
    const addForm = document.getElementById('addForm');

    addForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const image = document.getElementById('image').value.trim();

        if (!title || !content || !image) {
            alert('الرجاء ملء جميع الحقول');
            return;
        }

        const posts = getPosts();
        posts.unshift({ title, content, image });
        savePosts(posts);

        addForm.reset();
        renderAdminNews();
        alert('تم إضافة الخبر بنجاح');
    });

    renderAdminNews();
}