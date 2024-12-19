
const express = require('express');


const app = express();


app.use(express.json());


let products = [
  { id: 1, title: 'Producto 1', description: 'Descripción 1', code: 'P1', price: 100, status: true, stock: 10, category: 'Categoría 1', thumbnails: [] },
  { id: 2, title: 'Producto 2', description: 'Descripción 2', code: 'P2', price: 200, status: true, stock: 20, category: 'Categoría 2', thumbnails: [] },
  { id: 3, title: 'Producto 3', description: 'Descripción 3', code: 'P3', price: 300, status: true, stock: 30, category: 'Categoría 3', thumbnails: [] },
];


const productsRouter = express.Router();


productsRouter.get('/', (req, res) => {
  const { limit } = req.query;
  const limitedProducts = limit ? products.slice(0, Number(limit)) : products;
  res.json(limitedProducts);
});


productsRouter.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = products.find((p) => p.id === Number(pid));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});


productsRouter.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || !price || stock === undefined || !category) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || []
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});


app.use('/api/products', productsRouter);


const cartsRouter = express.Router();


app.use('/api/carts', cartsRouter);


const PUERTO = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
