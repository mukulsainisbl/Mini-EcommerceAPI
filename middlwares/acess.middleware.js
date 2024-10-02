const accessMiddleware = (role) => {
  return (req, res, next) => {
    if (role.includes(req.role)) {
      next();
    } else {
      res.status(401).json("Unauthorised from access");
    }
  };
};

module.exports = accessMiddleware;
