/**
 * Created by zhuzheng on 2018/8/5.
 */
import {SERVER_URL, ATTACHMENTS_URL} from '@config/config'


let serverUrl = localStorage.getItem('serverURL')
let attachments_Url = localStorage.getItem('attachmentsURL')
let serverUrl_login

serverUrl = serverUrl_login = serverUrl ? serverUrl + '/' : SERVER_URL
attachments_Url = attachments_Url ? attachments_Url + '/' : ATTACHMENTS_URL

// 登陆请求接口
export const login = {
    url        : serverUrl_login + 'loginValidate',
    type       : 'post',
    dataType   : 'json',
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    process    : null
}