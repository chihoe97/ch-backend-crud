'use strict'

import { Router } from 'express';
// Import routes
import catFacts from './catfacts.js';

const router = Router({
  caseSensitive: true
})

// Use imported routes in router
router.use('/catFacts', catFacts);

export default router;