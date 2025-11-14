import express from 'express';
import { prisma } from '../app';

const router = express.Router();

// Get all sweets
router.get('/', async (req, res) => {
  try {
    const sweets = await prisma.sweet.findMany();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sweets' });
  }
});

// Get sweet by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await prisma.sweet.findUnique({ where: { id: parseInt(id) } });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sweet' });
  }
});

// Create sweet
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const sweet = await prisma.sweet.create({
      data: { name, description, price, category, stock },
    });
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create sweet' });
  }
});

// Update sweet
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const sweet = await prisma.sweet.update({
      where: { id: parseInt(id) },
      data: { name, description, price, category, stock },
    });
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update sweet' });
  }
});

// Delete sweet
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sweet.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sweet' });
  }
});

// Search sweets
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const sweets = await prisma.sweet.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search sweets' });
  }
});

export default router;
