import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  const tokenFromAuthHeader =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (req.cookies?.token) {
    return { token: req.cookies.token, source: "cookie" };
  }

  if (tokenFromAuthHeader) {
    return { token: tokenFromAuthHeader, source: "auth-header" };
  }

  return { token: null, source: "none" };
};

const logAuthCheck = (req, token, source) => {
  console.info(
    `[AUTH][CHECK] origin=${req.headers.origin} path=${
      req.originalUrl || req.url
    } method=${req.method} cookies=${
      req.headers.cookie ? "present" : "none"
    } tokenPresent=${!!token} tokenSource=${source} time=${new Date().toISOString()}`
  );
};

const findUserForToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  return User.findById(decodedToken.userId).select(
    "-password -resetPassToken -resetPassExpire"
  );
};

export const optionalAuth = async (req, res, next) => {
  const { token, source } = getTokenFromRequest(req);
  logAuthCheck(req, token, source);

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const user = await findUserForToken(token);
    req.user = user || null;
    if (!user) req.authError = new Error("User not found");
    return next();
  } catch (error) {
    req.user = null;
    req.authError = error;
    return next();
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const { token, source } = getTokenFromRequest(req);
    logAuthCheck(req, token, source);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized- No token provided" });
    }

    const user = await findUserForToken(token);
    if (!user) {
      return res.status(404).json({ message: "User not found or token expired" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "You are not authorized to access this route" });
  }
};

export const checkStudentAuth = async(req,res,next)=>{
  const user = req.user;
  if(user.role !== "student"){
    return res.status(401).json({message:"You are not authorized to access this route"});
  }
  next();
}

export const checkTeacherAuth = async(req,res,next)=>{
  const user = req.user;
  if(user.role !== "teacher"){
    return res.status(401).json({message:"You are not authorized to access this route"});
  }
  next();
}

export const checkAdminAuth = async(req,res,next)=>{
  const user = req.user;
  if(user.role !== "admin"){
    return res.status(401).json({message:"You are not authorized to access this route"});
  }
  next();
}
