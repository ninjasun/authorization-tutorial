import axios from "axios";

const fakeAuth = {
  isAuthenticated() {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  signIn(values, cb) {
    axios
      .post(
        "http://localhost:3001/login",
        { username: values.username, password: values.password },
        { withCredentials: true }
      )
      .then(function (res) {
        const token = res.data;
        // set token in cookie
        document.cookie = `token=${token}`;
        // set token in local storage
        localStorage.setItem("token", token);
        cb();
      })
      .catch(function (error) {
        console.log(error);
        throw new Error(error);
      });
  },
  signout(cb) {
    // set token in cookie
    document.cookie = `token=${null}`;
    // set token in local storage
    localStorage.removeItem("token");
    cb();
  },
};

export default fakeAuth;
