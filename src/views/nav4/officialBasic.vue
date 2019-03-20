<template>
	<section>
		<!-- <div class="el-submenu__title"></div> -->
		<div class="basicMain">
	
			<el-tabs v-model="activeName2" type="card" @tab-click="basicTab">
				<el-tab-pane label="所有app信息" name="first">所有app信息</el-tab-pane>
			</el-tabs>
			<!-- 所有app信息列表 -->
			<div class="basicMessage" v-if="basicData === 1">
				<div style="margin:10px 0">
					<el-button type="primary" plain @click="addAppMessage">添加app信息</el-button>
				</div>
				<table>
					<thead>
						<tr>
							<td>APP名</td>
							<td>APP icon</td>
							<td>创建的时间</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list, index) in appList" :key="index">
							<td>{{list.application_name}}</td>
							<td>{{list.application_icon}}</td>
							<td>{{list.create_at}}</td>
							<td>
								<el-button type="primary" plain @click="addAppDel(list.application_id)">查看详情</el-button>
								<el-button type="primary" plain @click="getAppUserList(list.application_id)">app所有用户</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
	
			<!-- 添加app信息 -->
			<div class="basicAdd" v-if="basicData === 2">
				<el-form :label-position="labelPosition" label-width="80px" :model="addAppData">
					<el-form-item label="app名字">
						<el-input v-model="addAppData.application_name"></el-input>
					</el-form-item>
					<el-form-item label="app icon">
						<el-input v-model="addAppData.application_icon"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input type="date" v-model="addAppData.create_at"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button type="primary" plain @click="addAppClick">保存</el-button>
					<el-button type="primary" plain @click="basicBack">取消</el-button>
				</div>
			</div>
	
			<!-- 查看详情 -->
			<div class="basicDel" v-if="basicData === 4">
				<el-form :label-position="labelPosition" label-width="80px" :model="lookAppData">
					<el-form-item label="ID号">
						<el-input v-model="lookAppData.application_id"></el-input>
					</el-form-item>
					<el-form-item label="app名字">
						<el-input v-model="lookAppData.application_name"></el-input>
					</el-form-item>
					<el-form-item label="一级佣金比例">
						<el-input v-model="lookAppData.commission_first_value"></el-input>
					</el-form-item>
					<el-form-item label="二级佣金比例">
						<el-input v-model="lookAppData.commission_second_value"></el-input>
					</el-form-item>
					<el-form-item label="最低提现金额">
						<el-input v-model="lookAppData.commission_bottom_value"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input type="text" v-model="lookAppData.create_at"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button type="primary" plain @click="basicBack">返回</el-button>
				</div>
			</div>
	
			<!-- app所有用户 -->
			<div class="userApp" v-if="basicData === 3">
				<table>
					<thead>
						<tr>
							<td>用户</td>
							<td>手机</td>
							<td>邮箱</td>
							<td>图片</td>
							<td>性别</td>
							<td>加入时间</td>
							<td>邀请码</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list, index) in userAppData" :key="index">
							<td>{{list.nick_name}}</td>
							<td>{{list.phone}}</td>
							<td>{{list.mail}}</td>
							<td>{{list.avatar}}</td>
							<td>{{list.gender}}</td>
							<td>{{list.create_at}}</td>
							<td>{{list.invitation_code}}</td>
						</tr>
					</tbody>
				</table>
				<div style="margin:20px 0">
					<el-button type="primary" plain @click="basicBack">返回</el-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				// 初始化数据
				labelPosition: 'right',
				basicData: 1,
				// 添加app信息数据
				addAppData: {
					application_name: '',
					application_icon: '',
					create_at: ''
				},
				// 查看app相关信息
				lookAppData: {
					"application_name": "这是app的名字",
					"application_icon": "这是app的icon",
					"create_at": "2011-11-11 00:00:00",
					"application_id": 123125,
				},
				activeName2: 'first',
				input: '',
				appList: [{
					"application_id": 123123,
					"application_name": "这是app的名字",
					"application_icon": "这是app的icon",
					"create_at": "2011-11-11 00:00:00"
				}],
				userAppData: [{
					"user_id": "123213412",
					"nick_name": "张三",
					"phone": "1386048922",
					"mail": "1386048922@qq.com",
					"avatar": "/avatar/123233412.jpg",
					"is_app_admin": 1,
					"gender": 1, // 0代表女性, 代表男性
					"create_at": "2018-02-02 22:22:22",
					"invitation_code": "邀请码"
				}]
			}
		},
		created() {
			this.getAppList()
		},
		methods: {
			// 获取某个APP所有用户列表
			getAppUserList(id) {
				this.basicData = 3;
				this.yqGet(`/system/application/${id}/users/`, res=>{
					if(0 === res.code) {
						this.userAppData = res.data
					}
				})
			},
			getAppUserListCB(res) {
				if(0 === res.data.code) {
					this.userAppData = res.data.data
				}
			},

			// 添加APP
			addAppClick() {
				let create_at = ((new Date()).Format("yyyy-MM-dd HH:mm:ss"))
				this.addAppData = create_at
				this.yqPost(`/system/application/`, this.addAppData, this.addAppCB)
			},
			addAppCB(res) {
				if(0 === res.data.code) {
					this.$message({
						message: '添加成功',
						type: 'success'
					})
					this.getAppList()
				}
			},

			// 获取APP列表
			getAppList() {
				this.yqGet('/system/application/',res=>{
					console.log(res)
					if(0 === res.code) {
					this.appList = res.data
				}
				})
			},
			getAppListCB(res) {
				if(0 === res.data.code) {
					this.appList = res.data.data
				}
			},

			//   tab切换
			basicTab(tab, event) {
				if (this.activeName2 == "first") {
					this.basicData = 1;
				}
			},
			//添加app信息
			addAppMessage() {
				this.basicData = 2;
			},
			//查看详情
			addAppDel(id) {
				console.log(id)
				this.basicData = 4;
				this.yqGet(`/system/application/${id}/`,res=>{
					if(res.code==0){
						this.lookAppData=res.data;
					}
				})
				// this.lookAppData = this.appList[id]
			},
			basicBack() {
				this.basicData = 1;
			}
		}
	}
</script>

<style scoped>
	.basicMain {
		border: 1px solid #dcdcdc;
		padding: 10px;
	}
	
	.basicMain>p {
		font-size: 20px;
	}
	
	.basicMain>ul>li {
		padding: 10px;
	}
	
	.basicMain>ul>li::after {
		clear: both;
		content: '';
		display: block;
		margin-bottom: 20px;
	}
	
	.basicMain>ul>li>span {
		width: 100px;
		display: inline-block;
		float: left;
		line-height: 36px;
	}
	
	.basicMain>ul>li input {}
</style>

