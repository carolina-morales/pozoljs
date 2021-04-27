import { Response } from 'express';

export const handleError = (error: Error, res: Response, component: string = '') => {
  const message = `[${error.name} ${component ? '| ' + component : ''}] ${error.message}`;
  console.error(message);
  return res.status(500).send(message);
}
