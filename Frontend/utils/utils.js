import axios from "axios";

const greengadgetApi = axios.create({
  baseURL: "https://group-20-greengadget.onrender.com/",
});

export default function postLoginInfo({ usernameOrEmail, password }) {
  return greengadgetApi
    .post("/login", { usernameOrEmail: usernameOrEmail, password: password })
    .then(({ data: {loginMessage} }) => {
      if (loginMessage.username === usernameOrEmail || loginMessage.email === usernameOrEmail) {
        return loginMessage;
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
  avatar
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
      avatar_img_url: avatar
    })
    .then(({ data }) => {
      return data.users;
    })
    .catch(({ response: { data } }) => {
      return data.msg;
    });
}

export function getElectronics(category, sortBy, order, page) {
  if (!sortBy) {
    sortBy = "price";
  }
  if (!order) {
    order = "asc";
  }
  return greengadgetApi
    .get("/electronics", {
      params: { electronics_type: category, sort_by: sortBy, order, page: page },
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
      return data.electronic
    })
    .catch((err) => {
      throw err;
    });
}

export function postElectronics({name, model, electronicsType, storageInGB, description, price, quantity, file, username}){
  console.log('in here');
  return greengadgetApi.post('/electronics', 
  {name, model, electronics_type: electronicsType, storage_in_gb: storageInGB, description, price, quantity, img_url: file, shopkeeper_username: username })
  .then(({data}) => {
    return data.electronics
  })
  .catch((err) => {
    console.log(err);
  })
}

export function getCategories(){
  return greengadgetApi.get('/categories').then(({data}) => {
    return data.categories
  }).catch((err) => {
    throw err
  })
}

export function getBasketByUserId(user_id){
  return greengadgetApi.get(`/basket/${user_id}`).then(({data}) => {
    return data.basket
  }).catch((err) => {
    throw err
  })
}

export function postBasket({username, electronics_id, basket_quantity}){
  return greengadgetApi.post('/basket', {username, electronics_id, basket_quantity}).then(({data}) => {
    console.log(data.basket, '<<status in utils');
    
  }).catch((err) => {
    console.log("i'm in the catch");
    
    throw err
  })

}

export function deleteItemInBasket(user_id, electronics_id){
  return greengadgetApi.delete(`/basket/${user_id}/${electronics_id}`).then(({data}) => {
    return data.basket
  })
}

export function patchItemInBasket(user_id, electronics_id, {updatedQuantity}){
  console.log(user_id, electronics_id, updatedQuantity);
  
  return greengadgetApi.patch(`/basket/${user_id}/${electronics_id}`, {updatedQuantity}).then(({data}) => {
    return data.basket
    
  }).catch(({response: {data}}) => {
    console.log(data, 'in utils');
    
    return data.msg
  })
}