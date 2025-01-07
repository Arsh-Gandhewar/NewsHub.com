document.querySelector('.beautiful-button').addEventListener('click', async () => {
    const apiKey = '897670308b384ea5bdd98efb7683e9cd'; // Your API Key
    const topic = document.getElementById('keywords').value;
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const articles = data.articles.slice(0, 4); // Get the top 4 articles

        // Get all textareas for news display
        const newsAreas = document.querySelectorAll('.text .form-control');

        // Clear previous content
        newsAreas.forEach((area) => area.value = '');

        // Populate the textareas with news content
        articles.forEach((article, index) => {
            if (newsAreas[index]) {
                newsAreas[index].value = `${article.title}\n\n${article.description || 'Description not available.'}`;
            }
        });

    } catch (error) {
        console.error('Error fetching news:', error);
        alert('Failed to fetch news. Please try again.');
    }
});
