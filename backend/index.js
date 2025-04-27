// index.js

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// CRUD for Product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        imageUrl,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// CRUD for Category
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
