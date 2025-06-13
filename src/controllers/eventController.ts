import { Request, Response, RequestHandler } from 'express';
import { prisma } from '../prisma/prismaClient';
import { Importance } from '@prisma/client';

interface AuthRequest extends Request {
  userId: string;
}

type AuthRequestHandler = RequestHandler<any, any, any, any, { userId: string }>;

export const getEvents: AuthRequestHandler = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { userId: req.userId },
      orderBy: { date: 'asc' },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getEvent: AuthRequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.userId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to access this event' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const createEvent: AuthRequestHandler = async (req, res) => {
  const { title, description, date, importance } = req.body;

  if (!req.userId) {
    return res.status(401).json({ error: 'User ID is required' });
  }

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        importance: importance as Importance,
        userId: req.userId,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent: AuthRequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, importance } = req.body;

  try {
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (existingEvent.userId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
        importance: importance as Importance,
      },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEvent: AuthRequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (existingEvent.userId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await prisma.event.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
}; 