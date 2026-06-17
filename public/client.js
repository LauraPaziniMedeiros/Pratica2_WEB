document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/potions')
        .then(response => response.json())
        .then(potions => {
            const container = document.getElementById('potions-container');
            potions.forEach(potion => {
                const card = document.createElement('div');
                card.className = 'potion-card';
                card.innerHTML = `
                    <h3>${potion.nome}</h3>
                    <img src="${potion.imagem}" alt="${potion.nome}">
                    <p><em>${potion.descricao}</em></p>
                    <p><strong>Valor:</strong> ${potion.preco} moedas</p>
                    <button class="btn-buy" onclick="alert('Comprado!')">Comprar</button>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar poções:', error));
});