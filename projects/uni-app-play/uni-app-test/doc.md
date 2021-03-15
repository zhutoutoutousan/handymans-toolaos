注意：
	修改cloudfunctions下的文件需要提交云端才会生效，
	右键修改的文件夹-》上传公共模块/上传部署!!!
	
通用配置
1.cloudfunctions/common/config/index.js
	除个别前端配置，所有配置都在这里
2.根目录config的js，包含所有前端配置


小程序配置：
1.小程序直播配置（未开通小程序直播权限请勿配置该项，会报错）
	在manifest.json->源码视图 mp-weixin下添加如下配置即可
	"plugins": {
		"live-player-plugin" : {
			"version" : "1.1.4",
			"provider" : "wx2b03c6e691cd7370"
		}
	}
