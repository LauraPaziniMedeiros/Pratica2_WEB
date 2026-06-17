import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

const Potion = sequelize.define('Potion', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  imagem: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
});

async function initDB() {
  await sequelize.sync({ force: true });
  await Potion.bulkCreate([
    {
      nome: 'Poção Blue Sky',
      descricao: 'Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.', 
      imagem: 'https://i.ibb.co/ZzS7xb2/rsz-sky.png',
      preco: 300 
    },
    {
      nome: 'Poção do Perfume Misterioso',
      descricao: 'Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.', 
      imagem: 'https://i.ibb.co/pyhZJXf/rsz-lilas.png',
      preco: 200 
    },
    {
      nome: 'Poção de Pinus', 
      descricao: 'Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.', 
      imagem: 'https://i.ibb.co/DkzdL1q/rsz-pinus.png',
      preco: 3000 
    },
    {
      nome: 'Poção da Beleza Eterna', 
      descricao: 'Veneno que mata rápido.', 
      imagem: 'https://i.ibb.co/9p872NK/rsz-1beleza.png',
      preco: 100 
    },
    {
      nome: 'Poção do Arco íro',
      descricao: 'Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.', 
      imagem: 'https://i.ibb.co/PrC09MP/rsz-2unicornio.png',
      preco: 120
    },
    {
      nome: 'Caldeirão das Verdades Secretas',
      descricao: 'As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.',
      imagem: 'https://i.ibb.co/s9Lyvj8/rsz-verdades.png',
      preco: 150 
    }
  ]);
}

app.get('/api/potions', async (req, res) => {
  const potions = await Potion.findAll();
  res.json(potions);
});

app.post('/api/potions', async (req, res) => {
  const { nome, descricao, imagem, preco } = req.body;
  const newPotion = await Potion.create({ nome, descricao, imagem, preco });
  res.status(201).json(newPotion);
});

app.delete('/api/potions/:id', async (req, res) => {
  const { id } = req.params;
  await Potion.destroy({ where: { id } });
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, async () => {
  await initDB();
  console.log(`Acesso em http://localhost:${PORT}/`)
});