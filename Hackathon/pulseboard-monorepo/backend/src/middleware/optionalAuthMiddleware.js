
import jwt from "jsonwebtoken";

const optionalAuthMiddleware = (
  req,
  res,
  next
) => {
  try {
    const token = req.cookies.token;

    // No token → anonymous user
    if (!token) {
      req.user = null;
      return next();
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    req.user = null;

    next();
  }
};

export default optionalAuthMiddleware;


/**
 * 
 * 1. Required Auth

Used for:

create poll
update poll
delete poll
my polls



2. Optional Auth

Used for:

public voting
public poll view
analytics

Allows:

logged-in users
anonymous users
 */