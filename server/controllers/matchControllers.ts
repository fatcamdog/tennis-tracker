import { Request, Response } from 'express';

import prisma from '../db/prisma';

// // Get all matches
export const getMatches = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    // separate matches into two different sections: ongoing and finished
    const ongoingMatches = await prisma.match.findMany({
      where: {
        userId: id,
        finished: false,
      },
      include: { pointDetails: true, user: true },
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });

    const finishedMatches = await prisma.match.findMany({
      where: {
        userId: id,
        finished: true,
      },
      include: { pointDetails: true, user: true },
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
    res.json({ ongoingMatches, finishedMatches });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

// // Get a single match
export const getMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const match = await prisma.match.findUnique({
      where: { id: parseInt(id) },
      include: { pointDetails: true, user: true },
    });
    res.json(match);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

// // Create a match
export const createMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const {
      opponent,
      won,
      finished,
      userSets,
      oppSets,
      userGames,
      oppGames,
      userPoints,
      oppPoints,
      userDisplayPoints,
      oppDisplayPoints,
      numSets,
      trackingMode,
      duration,
      tiebreak,
      serving,
      suddenDeath,
    } = req.body;

    if (!opponent) throw new Error('Must have an opponent');

    const match = await prisma.match.create({
      data: {
        opponent,
        won,
        finished,
        userSets,
        oppSets,
        userGames,
        oppGames,
        userPoints,
        oppPoints,
        userDisplayPoints,
        oppDisplayPoints,
        numSets,
        trackingMode,
        duration,
        tiebreak,
        serving,
        side: 'deuce',
        suddenDeath,

        user: { connect: { id } },
      },
    });

    res.json(match);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

// // Delete a match
export const deleteMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await prisma.match.delete({
      where: { id: parseInt(id) },
    });
    res.json(match);
  } catch (error: any) {
    console.log(error.message);
  }
};

// // Update a match with point details
export const updateMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      opponent,
      won,
      finished,
      userSets,
      oppSets,
      userGames,
      oppGames,
      userPoints,
      oppPoints,
      userDisplayPoints,
      oppDisplayPoints,
      numSets,
      trackingMode,
      duration,
      tiebreak,
      serving,
      suddenDeath,
      side,

      pointWon,
      unreturned,
      fault,
      pointSide,
      location,
      stroke,
      method,
      hitter,
      wasServing,
    } = req.body;
    const match = await prisma.match.update({
      where: { id: parseInt(id) },
      data: {
        opponent,
        won,
        finished,
        userSets,
        oppSets,
        userGames,
        oppGames,
        userPoints,
        oppPoints,
        userDisplayPoints,
        oppDisplayPoints,
        numSets,
        trackingMode,
        duration,
        tiebreak,
        serving,
        side,
        suddenDeath,

        pointDetails: {
          create: {
            won: pointWon,
            serving: wasServing,
            userGames,
            oppGames,
            userDisplayPoints,
            oppDisplayPoints,
            unreturned,
            fault,
            side: pointSide,
            location,
            stroke,
            method,
            hitter,
          },
        },
      },
    });

    res.json(match);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

// // Edit the values of a match
export const editMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      opponent,
      won,
      finished,
      userSets,
      oppSets,
      userGames,
      oppGames,
      userPoints,
      oppPoints,
      userDisplayPoints,
      oppDisplayPoints,
    } = req.body;

    const match = await prisma.match.update({
      where: { id: parseInt(id) },
      data: {
        opponent,
        won,
        finished,
        userSets,
        oppSets,
        userGames,
        oppGames,
        userPoints,
        oppPoints,
        userDisplayPoints,
        oppDisplayPoints,
      },
    });

    res.json(match);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
