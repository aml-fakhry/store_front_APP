import express, { NextFunction, Request, Response } from 'express';

import { Authenticate } from '../../shared';
import { NotFound, OK, unAuthenticated, BadRequest } from '../../shared/utils/http-response.util';
import { productDataAccess } from './../../data/product/data/product.data';

/* product router to hold all modules route. */
export const productRouter = express.Router();

/**
 * the relative route for product.
 * No need to start with slash '/'.
 */
export const productRelativeRouter = 'product';

productRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productDataAccess.create(req.body);

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

/* Create a new category. */
productRouter.post('/category', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productDataAccess.createCategory(req.body);

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

/* Get product route by id. */
productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productDataAccess.findById(parseInt(req.params.id));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get product category route by id. */
productRouter.get('/category/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productDataAccess.findCategoryById(parseInt(req.params.id));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get all categories route. */
productRouter.get('/products/categories', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productDataAccess.getAllCategories();

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get all products route. */
productRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productDataAccess.getAllProducts();

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});
