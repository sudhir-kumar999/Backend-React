import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyAccessToken } from "../utils/token.js";
dotenv.config();
const checkLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // || req.headers["authorization"].split("")[0];
    // console.log(token);
    if (!token) {
      return res.send("log in first");
    }
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // req.user = decoded;

    const decoded = verifyAccessToken(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("decoded",decoded);

    // next middleware / controller
    return next();
  } catch (error) {
    console.log("check login error", error);
  }
};

export default checkLogin;
