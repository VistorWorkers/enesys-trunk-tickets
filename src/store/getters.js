// 当前登录状态
export const isLogin = state => {
    return state.loginInfo !== null
}

// 当前登录信息
export const loginInfo = state => {
    return state.loginInfo
}

// 当前页面
export const currPage = state => {
    return state.currPage
}

