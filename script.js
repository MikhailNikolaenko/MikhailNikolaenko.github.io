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

    let html = '<h3>Results:</h3>';

    data.def.forEach(item => {
        html += `<p><strong>${item.text}</strong> (${item.pos}) - Transcription: ${item.ts}</p>`;
        if (item.tr && item.tr.length) {
            html += '<ul>';
            item.tr.forEach(tr => {
                html += `<li>${tr.text} (${tr.pos}) - Transcription: ${tr.ts}`;
                if (tr.syn && tr.syn.length) {
                    const synonyms = tr.syn.map(syn => `${syn.text} (${syn.pos})`).join(', ');
                    html += ` - <strong>Synonyms:</strong> ${synonyms}`;
                }
                html += '</li>';
            });
            html += '</ul>';
        }
    });

    document.getElementById('output').innerHTML = html;
}