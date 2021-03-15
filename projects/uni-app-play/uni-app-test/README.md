##国云商城
国云商城是基于uniapp和uniCloud开发的在线商城系统，目前已适配H5、微信小程序、安卓和ios。项目正在逐步完善中，如果在试用或购买后发现问题，欢迎您随时提出。
第一次上架uniCloud项目，如遇问题请加作者QQ咨询，请勿随意差评，感谢您的理解。

### 咨询与售后
* 作者QQ：472045067
* 如您已购买本插件，可加入售后服务群获得技术、部署与上架指导，技术指导不限于本插件

####国云网络承接各类软件定制开发业务
* 联系人：于经理
* QQ：767677830 
* 非业务咨询请直接联系作者

###后台管理系统演示
[后台管理系统](https://static-95f1970c-da88-4722-9673-897de6038fc7.bspapp.com/admin/index.html)  
帐号test 密码12345678

###微信小程序演示
![微信小程序](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/451ccc60-d285-11ea-8a36-ebb87efcf8c0.jpg)

###H5演示
* h5版本尚未对接三方支付平台，支付、分享等功能无法使用，后续版本会提供支持。
![H5演示](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/e51c3ad0-d284-11ea-81ea-f115fe74321c.png)

###App演示
* App所用开放平台与小程序非同一主体，所以微信登录帐号与微信小程序不互通，微信分享小程序无法使用，配置同一主体不存在此问题。
![安卓版本演示](https://7478-tx-cloud-mix-mall-d6944c-1302673523.tcb.qcloud.la/1599142095177614441.jpg)

##开始使用
1. 将项目拖入HBuildX(新版HBuildX已预置国云商城，新建项目时选择电商模版即可直接创建项目)
2. 创建服务空间，详情参考[创建和绑定服务空间](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=%e5%88%9b%e5%bb%ba%e5%92%8c%e7%bb%91%e5%ae%9a%e6%9c%8d%e5%8a%a1%e7%a9%ba%e9%97%b4) 
3. 根目录cloudfunctions/common/config内配置对应参数
4. 上传cloudfunctions/common下的所有公用模块
5. 上传cloudfunctions下的所有云函数
6. 右键点击db_init.json 初始化数据库
7. 运行即可体验
* 注意：运行、发行到H5涉及跨域问题解决 [H5中使用uniCloud的跨域处理](https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5)
* 注意：初始化云数据库时如遇到报错数据表 xxx 数据导入失败：[PutItem] multiple write,duplicate key error collection，说明云数据库已存在该表且已存在相同数据，不勾选覆盖该表即可


##发行微信小程序
1. 在HBuildx顶部菜单点击运行->运行到微信小程序 
2. 在小程序开发工具右上角点击详情->本地设置->去除不校验合法域名的勾选。
3. 在控制台err信息中找到request域名，将该域名与https://apis.map.qq.com添加到request合法域名中
4. 进入用户设置->上传头像，在err信息中找到uploadFile域名并添加到合法域名中
5. 上传版本并审核即可
* 注意：手机预览、调试、发行小程序需配置域名白名单 [小程序中使用uniCloud的白名单配置](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e4%b8%ad%e4%bd%bf%e7%94%a8unicloud%e7%9a%84%e7%99%bd%e5%90%8d%e5%8d%95%e9%85%8d%e7%bd%ae)
* 注意：小程序需额外配置域名白名单 [腾讯地图sdk](https://apis.map.qq.com)

##发行H5
1. 在HBuildx顶部菜单点击发行->网站-H5手机版
2. 在弹出的对话框中选中将编译后的资源部署到[uniCloud-前端网页托管]并选择云服务空间，需注意HBx直接部署网页托管需要最新版，老版本没有这个选项，可以自己到web控制台进行托管。
3. 点击发行，等待项目编译部署即可。 
* 如果您不想购买服务器，那就来uniCloud白嫖一波吧~


###本项目使用插件
根据插件发布日期排序，如果您需要查看文档，请至以下地址查看：
* [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)
* [unipay](https://uniapp.dcloud.io/uniCloud/unipay)
* [SwipeAction 滑动操作](https://ext.dcloud.net.cn/plugin?id=181)
* [Popup 弹出层](https://ext.dcloud.net.cn/plugin?id=329)
* [【wxs+renderjs实现】高性能的下拉刷新上拉加载组件](https://ext.dcloud.net.cn/plugin?id=343)
* [Simple-Loading](https://ext.dcloud.net.cn/plugin?id=397)
* [Parser富文本插件【全端支持】](https://ext.dcloud.net.cn/plugin?id=805)
* [Transition 过渡动画](https://ext.dcloud.net.cn/plugin?id=985)
* [simple-Cache 让缓存指定时间范围内有效的插件](https://ext.dcloud.net.cn/plugin?id=1129)
* [选择地图](https://ext.dcloud.net.cn/plugin?id=1133)
* [短信验证码-阿里云版](https://ext.dcloud.net.cn/plugin?id=1947)
* [BaseCloud - APP版本更新业务模块（动效）](https://ext.dcloud.net.cn/plugin?id=2510)





