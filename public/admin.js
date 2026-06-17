document.addEventListener('DOMContentLoaded', loadPotions);

const form = document.getElementById('add-potion-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newPotion = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        imagem: document.getElementById('imagem').value,
        preco: parseFloat(document.getElementById('preco').value)
    };

    await fetch('/api/potions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPotion)
    });

    form.reset();
    loadPotions();
});

async function loadPotions() {
    const response = await fetch('/api/potions');
    const potions = await response.json();
    const container = document.getElementById('admin-potions-container');
    container.innerHTML = '';

    potions.forEach(potion => {
        const card = document.createElement('div');
        card.className = 'potion-card';
        card.innerHTML = `
            <h3>${potion.nome}</h3>
            <img src="${potion.imagem}" alt="${potion.nome}" style="max-height: 100px;">
            <p><strong>Valor:</strong> ${potion.preco} moedas</p>
            <button class="btn-delete" onclick="deletePotion(${potion.id})">Remover</button>
        `;
        container.appendChild(card);
    });
}

async function deletePotion(id) {
    if(confirm('Tem certeza que deseja remover esta poção?')) {
        await fetch(`/api/potions/${id}`, { method: 'DELETE' });
        loadPotions();
    }
}