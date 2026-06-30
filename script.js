
async function consultarCEP() {
    const cep = document.getElementById('cep-input').value;
    const resultadoDiv = document.getElementById('cep-resultado');
    
    if (cep.length !== 8) {
        resultadoDiv.innerHTML = "Por favor, digite um CEP válido com 8 números.";
        return;
    }

    resultadoDiv.innerHTML = "Buscando...";

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        const data = await response.json();

        if (response.ok) {
            resultadoDiv.innerHTML = `
                <strong>Rua:</strong> ${data.street} <br>
                <strong>Bairro:</strong> ${data.neighborhood} <br>
                <strong>Cidade/UF:</strong> ${data.city} - ${data.state}
            `;
        } else {
            resultadoDiv.innerHTML = "CEP não encontrado.";
        }
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao conectar com a BrasilAPI.";
    }
}


async function consultarDDD() {
    const ddd = document.getElementById('ddd-input').value;
    const resultadoDiv = document.getElementById('ddd-resultado');
    
    if (ddd.length !== 2) {
        resultadoDiv.innerHTML = "Por favor, digite um DDD válido (2 números).";
        return;
    }

    resultadoDiv.innerHTML = "Buscando...";

    try {
        const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
        const data = await response.json();

        if (response.ok) {
            resultadoDiv.innerHTML = `
                <strong>Estado:</strong> ${data.state} <br>
                <strong>Cidades Registradas:</strong> ${data.cities.length} <br>
                <em>(Ex: ${data.cities[0]}, ${data.cities[1]}...)</em>
            `;
        } else {
            resultadoDiv.innerHTML = "DDD não encontrado.";
        }
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao conectar com a BrasilAPI.";
    }
}


async function consultarFeriados() {
    const ano = document.getElementById('ano-input').value;
    const resultadoDiv = document.getElementById('feriados-resultado');
    
    if (ano.length !== 4) {
        resultadoDiv.innerHTML = "Por favor, digite um ano válido (Ex: 2024).";
        return;
    }

    resultadoDiv.innerHTML = "Buscando...";

    try {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        const data = await response.json();

        if (response.ok) {

            let html = `<strong>Feriados em ${ano}:</strong><br>`;
            for(let i = 0; i < 3; i++) {
                if(data[i]) {
                    html += `- ${data[i].date.split('-').reverse().join('/')}: ${data[i].name}<br>`;
                }
            }
            html += `<em>... e mais ${data.length - 3} feriados.</em>`;
            resultadoDiv.innerHTML = html;
        } else {
            resultadoDiv.innerHTML = "Feriados não encontrados para este ano.";
        }
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao conectar com a BrasilAPI.";
    }
}