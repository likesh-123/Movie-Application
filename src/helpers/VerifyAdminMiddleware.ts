import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/UserModel";
import myCache from "../helpers/CacheHelper";

const TTL = parseInt(process.env.CACHE_EXPIRES_IN || "3600", 10);

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const cachedUser = myCache.get<IUser>(req.user.userId);

    if (cachedUser && cachedUser.role === "Admin") {
      next();
    } else {
      const user = await User.findById(req.user.userId);
      if (user && user.role === "Admin") {
        myCache.set(req.user.userId, user, TTL);
        next();
      } else {
        res.status(403).json({ message: "Access denied. Admins only." });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
