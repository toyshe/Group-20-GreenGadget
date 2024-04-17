import axios from "axios";

const greengadgetApi = axios.create({
  baseURL: "https://group-20-greengadget.onrender.com/",
});

export default function postLoginInfo({ usernameOrEmail, password }) {
  return greengadgetApi
    .post("/login", { usernameOrEmail: usernameOrEmail, password: password })
    .then(({ data }) => {
      if (data.loginMessage === `Welcome back, ${usernameOrEmail}`) {
        return data.loginMessage;
      } else {
        return Promise.reject({ err: "Invalid credentials" });
      }
    })
    .catch(({ response: { data } }) => {
      return data.loginMessage;
    });
}

export function postSignUpInfo({
  username,
  name,
  password,
  email,
  phone,
  houseNumber,
  street,
  city,
  postcode,
  country,
  userType,
}) {
  return greengadgetApi
    .post("/users", {
      username,
      name,
      password,
      email,
      phone,
      house_number: houseNumber,
      street,
      city,
      postcode,
      country,
      user_type: userType,
    })
    .then(({ data }) => {
      console.log(data.users);
      return data.users;
    })
    .catch(({ response: { data } }) => {
      console.log(data.msg);
      return data.msg;
    });
}

export function getElectronics(category, sortBy, order) {
  if (!sortBy) {
    sortBy = "price";
  }
  if (!order) {
    order = "asc";
  }
  return greengadgetApi
    .get("/electronics", {
      params: { electronics_type: category, sort_by: sortBy, order },
    })
    .then(({ data }) => {
      return data.electronics;
    })
    .catch((err) => {
      throw err;
    });
}

export function getElectronicsById(electronicsId) {
  return greengadgetApi
    .get(`/electronics/${electronicsId}`)
    .then(({ data }) => {
      console.log(data.electronic);
      return data.electronic
    })
    .catch((err) => {
      throw err;
    });
}
