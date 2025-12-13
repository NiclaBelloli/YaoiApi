async function getMangas() {
    try {
        const response = await fetch("https://api.myanimelist.net/v2/manga?q=berserk", {
            method: "GET",
            withCredentials: true,
            headers: {
                "X-MAL-CLIENT-ID": "455bf80d11fb98bc72f17c27afd1c6b3",
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("HTTP error", response.status)
        }
        console.log(response)
    }
    catch (error) {
        console.error("fetch error: ", error)
    }
}

getMangas();