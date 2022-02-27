'use strict';
import { Router } from 'express';
const router = Router();

import {
  login,
  refreshToken,
  register,
  getInfo,
  changeInfo,
  forgotPassword,
} from '@controllers/common';

/**
 * Login
 * @route POST /auth/login
 * @group Authenticate - Authenticate operation
 * @param {string} email.body.required - username or email - eg: user@domain
 * @param {string} password.body.required - user's password.
 * @returns {object} 200 - Successful getting
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', login);

/**
 * Register
 * @route POST /auth/register
 * @group Authenticate - Authenticate operation
 * @param {string} userName.body.required - username - eg: username
 * @param {string} email.body.required - username or email - eg: email@gmail.com
 * @param {string} password.body.required - user's password.
 * @returns {object} 201 - Successful getting
 * @returns {Error}  default - Unexpected error
 */
router.post('/register', register);

/**
 * Refresh token
 * @route POST /auth/refresh-token
 * @group Authenticate - Authenticate operation
 * @param {string} refreshToken.body.required
 * @returns {object} 200 - Successful getting
 * @returns {Error}  default - Unexpected error
 */
router.post('/refresh-token', refreshToken);

/**
 * Infomation user
 * @route GET /auth/me
 * @group Authenticate - Authenticate operation
 * @returns {object} 200 - Successful getting
 * @returns {Error}  default - Unexpected error
 */
router.get('/me', getInfo);
router.put('/me', changeInfo);
router.post('/forgot', forgotPassword);

export { router };
