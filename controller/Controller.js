const emailRegX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const utils = require("../config/urils");
const DB = require("../config/db");

const signup = (req, res) => {
  if (!req.body.username) {
    return res.status(401).json({
      success: false,
      message: "Username is required.",
    });
  } else if (!req.body.email) {
    return res.status(401).json({
      success: false,
      message: "Email is required.",
    });
  } else if (!emailRegX.test(req.body.email)) {
    return res.status(401).json({
      success: false,
      message: "Email is Invalid.",
    });
  } else if (!req.body.password) {
    return res.status(401).json({
      success: false,
      message: "Password is required.",
    });
  } else {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: utils.genPassword(req.body.password),
    };
    DB.query(
      `insert into auth (username, email, salt, hash, method) values ('${user.username}', '${user.email}', '${user.password.salt}','${user.password.hash}', 'manual')`,
      (error, result) => {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            return res.status(201).json({
              success: false,
              message: "Email already exist.",
              error: "email",
            });
          } else {
            throw error;
          }
        } else {
          const jwt = utils.issueJWT(result.insertId);
          return res.status(200).json({
            success: true,
            message: "User registerd successfully.",
            user: {
              id: result.inserId,
              username: user.username,
              email: user.email,
            },
            token: jwt.token,
            expires: jwt.expires,
          });
        }
      }
    );
  }
};

const signin = (req, res) => {
  if (!req.body.email) {
    return res.status(401).json({
      success: false,
      message: "Email is required.",
    });
  } else if (!emailRegX.test(req.body.email)) {
    return res.status(401).json({
      success: false,
      message: "Email is Invalid.",
    });
  } else if (!req.body.password) {
    return res.status(401).json({
      success: false,
      message: "Password is required.",
    });
  } else {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    DB.query(
      `select id, username, email, salt, hash, method from auth where email='${user.email}'`,
      (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          const isValidPassword = utils.comparePassword(
            user.password,
            result[0].hash,
            result[0].salt
          );
          if (!isValidPassword) {
            return res.status(401).json({
              success: false,
              message: "Wrong password",
            });
          } else {
            const jwt = utils.issueJWT(result[0].id);
            return res.status(200).json({
              success: true,
              message: "You logged in successfully.",
              user: {
                username: result[0].username,
                email: result[0].email,
              },
              token: jwt.token,
              expires: jwt.expires,
            });
          }
        } else {
          return res.status(401).json({
            success: false,
            message: "Email not found.",
          });
        }
      }
    );
  }
};

const check = (req, res) => {
  return res.send(
    "this is authorized Data that you access using json web token."
  );
};

module.exports = {
  signup,
  signin,
  check,
};
