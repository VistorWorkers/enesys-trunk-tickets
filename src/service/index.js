/**
 * Created by zhuzheng on 2018/8/5.
 */
import axios from 'axios'
import * as config from '@service/config'

export const ERR_SUCCESS = '0000'

const JSON2FormData = (jsonObj) => {
    let params = []
    Object.keys(jsonObj).forEach((key) => {
        params.push(`${key}=${jsonObj[key]}`)
    })
    return encodeURI(params.join('&'))
}

export function login(data) {
    let params = config.login
    params.data = JSON2FormData(data)
    return axios(params)
}

// 劫持响应数据
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});