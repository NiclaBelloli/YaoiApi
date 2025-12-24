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