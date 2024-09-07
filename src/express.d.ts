import { User } from "src/user/entities/user.entity";

declare global {
    namespace Express {
      interface Request {
        user?: User; // Add your user property here
      }
    }
  }