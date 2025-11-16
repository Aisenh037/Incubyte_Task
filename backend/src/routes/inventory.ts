import express from 'express';
import { prisma } from '../app';

const router = express.Router();

// Get inventory for a sweet
router.get('/:sweetId', async (req, res) => {
  try {
    const { sweetId } = req.params;
    const inventory = await prisma.inventory.findMany({
      where: { sweetId },
      include: { sweet: true },
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Purchase sweet (decrease stock)
router.post('/purchase', async (req, res) => {
  try {
    const { sweetId, quantity } = req.body;
    const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });
    if (!sweet || sweet.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    await prisma.sweet.update({
      where: { id: sweetId },
      data: { stock: sweet.stock - quantity },
    });
    const inventory = await prisma.inventory.create({
      data: { sweetId, quantity: -quantity, type: 'purchase' },
    });
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: 'Purchase failed' });
  }
});

// Restock sweet (increase stock)
router.post('/restock', async (req, res) => {
  try {
    const { sweetId, quantity } = req.body;
    const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    await prisma.sweet.update({
      where: { id: sweetId },
      data: { stock: sweet.stock + quantity },
    });
    const inventory = await prisma.inventory.create({
      data: { sweetId, quantity, type: 'restock' },
    });
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: 'Restock failed' });
  }
});

export default router;
