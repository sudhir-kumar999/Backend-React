const globalMiddleware = (req, res, next) => {
  const islog = false;
  if (islog) {
    console.log("login first");
    return res.send("login first from global");
  }
  next();
};

module.exports = globalMiddleware;
