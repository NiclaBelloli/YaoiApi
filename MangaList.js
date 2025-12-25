const inputSearchManga = document.querySelector('.input-search-manga');
const mangaContainer = document.querySelector('.manga-grid');

async function fetchMangas(q) {
    try {
        const response = await fetch(`http://localhost:3000/manga-query?q=${encodeURIComponent(q)}`, {
            method: "GET",
        })
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json();
        console.log(data);
        for (const manga of data) {
            const mangaCard = document.createElement('div');
            mangaCard.classList.add('manga-card');
            mangaCard.innerHTML = `
            <h3>${manga.title}</h3>
            <img src="${manga.main_picture?.medium || 'backApiRest/public/images.jpg'}" alt="${manga.title}">`;
            mangaContainer.appendChild(mangaCard);
        }
    }
    catch (error) {
        console.error(`fetch error: ${error}`)
    }
}

async function getMangas(q) {
    try {
        const response = await fetch(`http://localhost:3000/mangaList?q=${encodeURIComponent(q)}`, {
            method: "GET",
        })
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json();
        console.log(data);
        for (const manga of data.data) {
            const mangaCard = document.createElement('div');
            mangaCard.classList.add('manga-card');
            mangaCard.innerHTML = `
            <h3>${manga.node.title}</h3>
            <img src="${manga.node.main_picture.medium}" alt="${manga.node.title}">`;
            mangaContainer.appendChild(mangaCard);
        }
    }
    catch (error) {
        console.error(`fetch error: ${error}`)
    }
}

inputSearchManga.addEventListener('input', (e) => {
    const searchQuery = e.target.value || '';
    getMangas(searchQuery);
    fetchMangas(searchQuery);
    mangaContainer.innerHTML = '';

})