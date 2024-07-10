async function getWordData() {
    const word = document.getElementById('wordInput').value;
    const apiKey = 'dict.1.1.20240709T010226Z.8e51bfe6c72ce7d9.78ab03abc11253d00871305d5c1c0402a3453adc';
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