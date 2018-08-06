/**
 * Created by zhuzheng on 2018/8/5.
 */
import axios from 'axios'
import * as config from '@service/config'

export function login(data) {
    let params = config.login;
    params.data = data;
    return axios(params);
}