import { Router } from 'express';
import { listUsers, getUser, deleteUser } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

/**
 * TODO: Define user routes (all require admin role)
 *
 * GET    /           → listUsers (requires authenticate and requireRole('admin'))
 * GET    /:id        → getUser (requires authenticate and requireRole('admin'))
 * DELETE /:id        → deleteUser (requires authenticate and requireRole('admin'))
 *
 * Apply authenticate middleware to all routes
 * Apply requireRole('admin') middleware to all routes
 */

const router = Router();

// Apply auth + admin role to all routes
router.use(authenticate);
router.use(requireRole('admin'));

// Routes
router.get('/', listUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
