import { createEventHandler } from 'cloudflare-workers-adapter';
import app from './server.js';

addEventListener('fetch', createEventHandler(app));