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
    }
    catch (error) {
        console.error(`fetch error: ${error}`)
    }
}

getMangas("naruto");