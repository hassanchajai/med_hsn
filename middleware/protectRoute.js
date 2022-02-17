const AsyncCatch = require("./../utils/asyncCatch");
const { promisify } = require("util");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("./../utils/errorHandler");

const allProtectedURLs = ["/user/add", "/ship/add"];
exports.protect = AsyncCatch(async (req, res, next) => {
  /// we need to verify tree layer : token,verification token,check if user is exists ,check if user change password after the token was issued
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ").at(-1);
  }
  if (!token)
    return next(
      new ErrorHandler({
        message: "You're not authorized !",
        statusCode: 401,
      })
    );
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const userFresh = await userModel.findById(decodedToken.id);
  if (!userFresh)
    return next(
      new ErrorHandler({
        message: "The user belonging to this token does no longer exist.",
        statusCode: 401,
      })
    );
  if (await userFresh.changedAfter({ date: decodedToken.iat }))
    next(
      new ErrorHandler({
        message: "You changed password , you need to login again!",
        statusCode: 401,
      })
    );
  console.log(req.url);
  if (allProtectedURLs.includes(req.url) && decodedToken?.role !== "admin")
    next(
      new ErrorHandler({
        message:
          "You are not authorized, you need Authotorization for this action!",
        statusCode: 401,
      })
    );

  req.user = userFresh;
  next();
  // some cases we need to promisify function , node actually has a build-in function in util model
  // always try to convert function to asynchronous functions : don't block event loop
});
