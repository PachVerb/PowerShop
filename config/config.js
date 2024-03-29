const name = "美物优品购"; //全局商城name
const schemeName = "美物优品购"; //唤醒app需要的schemeName
export default {
  name: name,
  schemeLink: `${schemeName}://`, //唤起app地址
  downloadLink: "https://pickmall.cn/download-page/index.html", //下载地址，下载app的地址
  shareLink: "https://fzsnkj.cn", //分享地址，也就是在h5中默认的复制地址
  appid: "wx18e4642f17c0b680", //小程序唯一凭证，即 AppID，可在「微信公众平台 - 设置 - 开发设置」页中获得。（需要已经成为开发者，且帐号没有异常状态）
  aMapKey: "1f78544934b66c9fbc0104117f663973", //在高德中申请Web服务key
  scanAuthNavigation: ["https://m-b2b2c.pickmall.cn/"], //扫码认证跳转域名配置 会根据此处配置的路由进行跳转
  iosAppId: "id1564638363", //AppStore的应用地址id 具体在分享->拷贝链接中查看
  logo: "https://powershop-1323249886.cos.ap-nanjing.myqcloud.com/MANAGER/undefined/e285925be3664d68b55139d097d72c96.png", //logo地址
  customerServiceMobile: "13290733387", //客服电话
  customerServiceEmail: "3689408373@qq.com", //客服邮箱
  imWebSrc: "https://fzsnkj.cn/ims", //IM地址
  baseWsUrl: "wss://fzsnkj.cn/lili", // IM WS 地址
  enableGetClipboard: false, //是否启用粘贴板获取 scanAuthNavigation 中的链接，如果匹配则会跳转到对应页面
  enableMiniBarStartUpApp: false, //是否在h5中右侧浮空按钮点击启动app
  /**
   * 如需更换主题请修改此处以及uni.scss中的全局颜色
   */
  mainColor: "#ff3c2a", // 主题色
  lightColor: "#ff6b35", // 高亮主题色
  aiderLightColor: "#ff9f28", // 辅助高亮颜色
  defaultUserPhoto: "/static/missing-face.png", // 默认用户头像
  enableFetchMobileLogin: true // 是否启用获取手机号登录 如果微信小程序提示封禁手机号获取权限 可将此选项设置成false作为备用登录方案
};
