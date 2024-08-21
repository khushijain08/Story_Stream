import {myAxios} from "./helper"

export const loadAllCategories=()=>{
    return myAxios.get('/categories/')
    .then(respose=>{return respose.data})
}
