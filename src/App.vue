<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {},
		created() {
			// 对Date的扩展，将 Date 转化为指定格式的String
			// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
			// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
			// 例子：
			// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
			// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
			Date.prototype.Format = function(fmt) {
				var o = {
					"M+": this.getMonth() + 1, //月份
					"d+": this.getDate(), //日
					"H+": this.getHours(), //小时
					"m+": this.getMinutes(), //分
					"s+": this.getSeconds(), //秒
					"q+": Math.floor((this.getMonth() + 3) / 3), //季度
					"S": this.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			};
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	
	.dpn {
		display: none;
	}
	
	.show {
		display: block;
	}
	
	li {
		list-style: none;
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	
	body {
		margin: 0px;
		padding: 0px;
		/*background: url(assets/bg1.jpg) center !important;
			background-size: cover;*/
		// background: #1F2D3D;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
	}
	
	
	/*表格设置*/
	
	table {
		width: 100%;
		margin: 0px auto;
		border-collapse: collapse;
		background: #fff;
		text-align: center;
		font-size: 12px;
		border: 1px solid #dcdcdc;
	}
	
	table tr {
		height: 50px;
		border-top: 1px solid #dcdcdc;
	}
	
	table thead {
		background: #fafbfc;
		color: #999;
	}
	
	table tbody>tr {
		color: #666;
	}
	
	table tbody>tr:hover {
		background: #fafafa;
	}
	
	table tbody>tr td {
		min-height: 30px;
	}
	
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	
	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	
	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	
	.toolbar {
		background: #f2f2f2;
		padding: 10px;
		//border:1px solid #dfe6ec;
		margin: 10px 0px;
		.el-form-item {
			margin-bottom: 10px;
		}
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all .2s ease;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
	/*图片居中*/
	.centerImg{
			display: table-cell;
			vertical-align: middle;
			box-sizing: border-box;
			width: 30px;
			height: 30px;
			border: 1px sold #dcdcdc;
	}
	.centerImg img{
			vertical-align: middle;
			width:100%;
	}
</style>