const Manga = require('../Models/Manga');

exports.manga_insert = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Missing title or description' });
        }
        console.log(title, description)
        const manga = new Manga({ title, description });
        await manga.save();
        res.status(201).json(manga);
    } catch (err) {
        console.error('Error creating manga:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.manga_search = async (req, res) => {
    try {
        const { q } = req.query;
        const mangas = await Manga.find({ title: new RegExp(q, 'i') });
        res.status(200).json(mangas);
    } catch (err) {
        console.error('Error searching mangas:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.manga_request = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            res.status(400).send("Bad Request: Missing or Invalid Search Parameter")
            return;
        }
        const response = await fetch(`https://api.myanimelist.net/v2/manga?q=${encodeURIComponent(q)}`, {
            method: "GET",
            headers: {
                "X-MAL-CLIENT-ID": "455bf80d11fb98bc72f17c27afd1c6b3",
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("HTTP error", response.status)
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error("fetch error: ", error)
        res.status(500).send("Internal Server Error");
    }
}