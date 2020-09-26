var jwt = require("jsonwebtoken");

// Never do this!
let users = {
  john: { password: "passwordjohn" },
  mary: { password: "passwordmary" },
};

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("API login username: ", username);
  console.log("API login password: ", password);

  // Neither do this!
  if (!username || !password || users[username].password !== password) {
    return res.status(401).send();
  }

  //use the payload to store information about the user such as username, user role, etc.
  let payload = { username: username };

  //create the access token with the shorter lifespan
  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  //create the refresh token with the longer lifespan
  let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  //store the refresh token in the user array
  users[username].refreshToken = refreshToken;

  //send the access token to the client inside a cookie
  console.log("SEND token: ", accessToken);
  //res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
  res.status(200).send(accessToken);
};

exports.refresh = function (req, res) {
  let accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(403).send();
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (e) {
    return res.status(401).send();
  }

  //retrieve the refresh token from the users array
  let refreshToken = users[payload.username].refreshToken;

  //verify the refresh token
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (e) {
    return res.status(401).send();
  }

  let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  res.cookie("jwt", newToken, { secure: true, httpOnly: true });
  res.send();
};
