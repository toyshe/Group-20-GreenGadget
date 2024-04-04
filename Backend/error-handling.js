exports.psqlErrors = (err, req, res, next) => {
  if (err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23505") {
    if (err.constraint === "users_username_key") {
      res.status(409).send({ msg: "Username already exists" });
    } else if (err.constraint === "users_email_key") {
      res.status(409).send({ msg: "Email already exists" });
    } else if (err.constraint === "users_phone_key") {
      res.status(409).send({ msg: "Phone number already exists" });
    }
  } else {
    next(err);
  }
};

exports.customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
};
