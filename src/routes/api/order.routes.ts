import express, { NextFunction, Request, Response } from 'express';
import { Authenticate } from '../../shared';

import { NotFound, OK, BadRequest } from '../../shared/utils/http-response.util';
import { orderDataAccess } from './../../data/order/data/order.data';

/* order router to hold all modules route. */
export const orderRouter = express.Router();

/**
 * the relative route for order.
 * No need to start with slash '/'.
 */
export const orderRelativeRouter = 'order';

/* Create a new order. */
orderRouter.post('/', Authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderDataAccess.create(req.body);

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.data) {
      OK(res, { data: result.data });
    }
  } catch (error) {
    next(error);
  }
});

/* Get order route by id. */
orderRouter.get('/:id', Authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderDataAccess.findById(parseInt(req.params.id));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get all orders route. */
orderRouter.get('', Authenticate, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderDataAccess.getAllOrders();

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get orders by user id route. */
orderRouter.get('/product/:userId', Authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderDataAccess.getOrdersByUserId(parseInt(req.params.userId));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get completed orders by user id route. */
orderRouter.get('/complete-product/:userId', Authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderDataAccess.getCompletedOrderByUserId(parseInt(req.params.userId));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});
