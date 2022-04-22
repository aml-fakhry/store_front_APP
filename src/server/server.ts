import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import DbService from '../database/database.helper';

import { userRouter, userRelativeRouter, productRelativeRouter, productRouter } from '../routes';
import { Logger } from '../shared';
import { errorHandler } from './../shared/middleware/error-handler.middleware';

dotenv.config();

export const Database = new DbService();

/**
 * Set request options for an express server.
 * @param app the express application.
 */
function setRequestOptions(app: Application) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

/**
 * Register routes for an express server.
 * @param app the express application.
 */
function registerRouter(app: Application) {
  /* That is the base route for api. */
  const apiBaseRoute = '/api/';

  /* Start to register routes */
  app.use(apiBaseRoute + userRelativeRouter, userRouter);
  app.use(apiBaseRoute + productRelativeRouter, productRouter);
}

/**
 * Setup an express server.
 * @param app the express application.
 */
export function setupServer(app: Application) {
  /**
   * the order matters.
   * 1- Set request options.
   * 2- Register routes.
   * 3- Add error-handler middleware.
   */
  setRequestOptions(app);
  registerRouter(app);
  app.use(errorHandler);
}

/**
 * Start an express server.
 * @param app the express application.
 */
export function startServer(app: Application) {
  app.listen(process.env.APP_PORT, () => {
    Logger.info(`Server is running now at http://localhost:${process.env.APP_PORT}`, null, true);
  });
}
