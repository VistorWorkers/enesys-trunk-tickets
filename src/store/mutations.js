import * as types from '@store/mutation-types'
import {hex_md5} from '@utils/md5.js'

const mutations = {
    [types.SET_ISLOGIN] (state, {loginInfo, loginData}) {
        // 更新vuex state
        state.loginInfo = loginInfo

        if (loginData) {
            // 离线登录验证数据
            let validateStr_offline = {
                validateStr: hex_md5(`${loginData.loginAccount}_${loginData.password}`),
                time       : new Date().getTime(),
                deptName   : loginInfo.deptName,
                staffName  : loginInfo.staffName,
                staffId    : loginInfo.staffId
            }
            // md5 加密登录账号
            let csrName = hex_md5(loginData.loginAccount)
            // 更新离线登录验证数据
            window.localStorage.setItem(csrName, JSON.stringify(validateStr_offline))
        }
        // 更新最后一次登录信息
        localStorage.setItem("csrInfo", JSON.stringify(loginInfo))
    },
    [types.SET_CURRPAGE] (state, currPage){
        state.currPage = currPage
    }
}

export default mutations