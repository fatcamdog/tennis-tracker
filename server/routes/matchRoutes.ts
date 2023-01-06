import { Router } from 'express';

import * as controller from '../controllers/matchControllers';
import requireAuth from '../middleware/requireAuth';

const router = Router();

// !! Require auth for routes
router.use(requireAuth);

// !! Get all matches
router.get('/', controller.getMatches);

// !! Get a single match
router.get('/:id', controller.getMatch);

// !! Create a match
router.post('/', controller.createMatch);

// !! Delete a match
router.delete('/:id', controller.deleteMatch);

// !! Update point details of a match
router.patch('/:id', controller.updateMatch);

// !! Edit the values of a match
router.patch('/edit/:id', controller.editMatch);

export default router;
