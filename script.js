async function getWordData() {
    const word = document.getElementById('wordInput').value;
    const apiKey = 'YOUR_YANDEX_API_KEY';
    const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=en-en&text=${word}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWordData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('output').innerHTML = 'Failed to fetch data.';
    }
}

function displayWordData(data) {
    if (!data.def.length) {
        document.getElementById('output').innerHTML = 'No results found.';
        return;
    }

    let html = `<strong>Definition:</strong> ${data.def[0].tr[0].text}<br>`;
    if (data.def[0].tr[0].syn) {
        html += `<strong>Synonyms:</strong> ${data.def[0].tr[0].syn.map(s => s.text).join(', ')}<br>`;
    }
    if (data.def[0].tr[0].ant) {
        html += `<strong>Antonyms:</strong> ${data.def[0].tr[0].ant.map(a => a.text).join(', ')}<br>`;
    }
    document.getElementById('output').innerHTML = html;
}