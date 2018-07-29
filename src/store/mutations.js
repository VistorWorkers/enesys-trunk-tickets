import * as types from '@store/mutation-types'

const mutations = {
    [types.SET_ISLOGIN] (state, data) {
        state.loginInfo = data
    }
}

export default mutations