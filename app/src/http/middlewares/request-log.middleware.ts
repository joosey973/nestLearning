import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(
      `[${req.method}] / endpoint: '${req.originalUrl}' / IP: ${req.ip}`,
    );
    next();
  }
}