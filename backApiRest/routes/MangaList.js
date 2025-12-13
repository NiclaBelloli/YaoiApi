var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const {q} = req.query;
        if (!q){
            res.status(400).send("Bad Request: Missing or Invalid Search Parameter")
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
});

module.exports = router;