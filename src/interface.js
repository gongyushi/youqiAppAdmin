import Vue from 'vue'
import axios from 'axios'

// element 项目
import { Loading, Notification } from 'element-ui';

import { COMMONURL, DEBUG } from './settings.json'

// vux 项目
// import { LoadingPlugin, ConfirmPlugin, ToastPlugin, AlertPlugin} from 'vux'
// Vue.use(ConfirmPlugin)
// Vue.use(LoadingPlugin)
// Vue.use(ToastPlugin)
// Vue.use(AlertPlugin)

// var qs = require('qs');
var youqi = axios.create({
  baseURL: COMMONURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

youqi.interceptors.request.use(function (config) {
  if (sessionStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
    config.headers.RefreshToken = 'Bearer ' + sessionStorage.getItem('refresh_token') 
  }
   
  if (DEBUG) {
    console.log('在发送请求之前做些什么')
    console.log(config)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  if (DEBUG) {
    console.log('对请求错误做些什么')
    console.log(error)
  }
  return Promise.reject(error)
})

// 添加响应拦截器
youqi.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  if (DEBUG) {
    console.log('对响应数据做点什么')
    console.log(res) // eslint-disable-line
  }
  if(res.data.code === 0) {
    return res
  } else if(res.data.code == '1401') {
    Notification.error({
      title: '错误',
      message: `Token过期,传递的RefreshToken有问题`
    });
  }else if(res.data.code == '1402') {
    Notification.error({
      title: '错误',
      message: '请先注册'
    });
  } else if ((res.data.code+'').startsWith('15')) {
    Notification.error({
      title: '错误',
      message: '服务器内部错误'
    });
  } else {
    Notification.error({
      title: '错误',
      message: `${res.data.message}`
    });
  }
}, function (error) {
  // 对响应错误做点什么
  if (DEBUG) {
    console.log('对响应错误做点什么')
    console.log(error)
  }
  return Promise.reject(error)
})

let yqPost = function (url, data, successFunc) {
  // axios 解决post传参
  // var params = new URLSearchParams()
  // for (let item in data) {
  //   params.append(item, data[item])
  // };
  window.loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  youqi.post(`${url}?p=wa`, data).then(res => {
    window.loading.close()
    if(!successFunc) {
      Notification({
        title: '警告',
        message: '缺少成功回调',
        type: 'worning'
      });
    } else {
      successFunc(res.data)      
    }
  }).catch(res => {
    window.loading.close()    
  })
}

let yqGet = function (url, successFunc) {
  //  window.loading = Loading.service({
  //   lock: true,
  //   text: 'Loading',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)'
  // });
  url = url.indexOf('?') > 0?`${url}&p=wa`:`${url}?p=wa`
  youqi.get(url).then(res => {
    // window.loading.close()    
    if(!successFunc) {
      Notification({
        title: '警告',
        message: '缺少成功回调',
        type: 'worning'
      });
    } else {
      successFunc(res.data)      
    }
  }).catch(res => {
    // window.loading.close()
  })
}

let yqPut = function (url, data, successFunc) {
  window.loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  url = url.indexOf('?') > 0?`${url}&p=wa`:`${url}?p=wa`  
  youqi.put(url, data).then(res => {
    window.loading.close()
    if(!successFunc) {
      Notification({
        title: '警告',
        message: '缺少成功回调',
        type: 'worning'
      });
    } else {
      successFunc(res.data)      
    }
  }).catch(res => {
    window.loading.close()        
  })
}

let yqPatch = function (url, data, successFunc) {
  window.loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  url = url.indexOf('?') > 0?`${url}&p=wa`:`${url}?p=wa`

  youqi.patch(url, data).then(res => {
    window.loading.close()
    if(!successFunc) {
      Notification({
        title: '警告',
        message: '缺少成功回调',
        type: 'worning'
      });
    } else {
      successFunc(res.data)      
    }
  }).catch(res => {
    window.loading.close()        
  })
}

let yqDel = function (url, successFunc) {
  window.loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  url = url.indexOf('?') > 0?`${url}&p=wa`:`${url}?p=wa`
  youqi.delete(url).then(res => {
    window.loading.close()        
    if(!successFunc) {
      Notification({
        title: '警告',
        message: '缺少成功回调',
        type: 'worning'
      });
    } else {
      successFunc(res.data)      
    }
  }).catch(res => {
    window.loading.close()        
  })
}

export { yqPost, yqGet, yqPut, yqDel, yqPatch }
