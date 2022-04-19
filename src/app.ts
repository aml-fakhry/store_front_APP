import express, { Application } from 'express';
import * as server from './server';

export const app: Application = express();

/* Set app root directory name */
export const appRootDir = __dirname;

/**
 * Setup express server.
 * Start express server after all are done.
 * And then setup database.
 */
server.setupServer(app);
server.startServer(app);
