import axios from 'axios';
const electronicsApi = axios.create({
    baseURL:'https://group-20-greengadget.onrender.com'
});

export default function getAllElectronics(categories, sortBy, order, page ){
    if(!sortBy){
        sortBy = "Price";
    }
    if(!order){
        order="asc";
    }
    return electronicsApi
        .get(`/electronics`, {params: {categories, sort_by: sortBy, order, p:page }})
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw err;
        });
}

export function getElectronicsById(electronics_id){
    return electronicsApi.get(`/electronics/${electronics_id}`).then((response) => {
        return response.data;
    }).catch(err=> {
        throw err;
    })
}


export function displayCategories() {
    return electronicsApi
    .get(`/categories`)
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
        throw err;
    });
}