<template>
	<section class="home">
		<div class="homeSurvey">
			<p>昨日活跃</p>
			<ul>
				<li>
					<h2>访问量</h2>
					<p>{{ pv }}</p>
				</li>
				<li>
					<h2>独立访客</h2>
					<p>{{ uv }}</p>
				</li>
			</ul>
			<p>新增用户列表</p>
			<table>
				<thead>
					<tr>
						<td>图片</td>
						<td>姓名</td>
						<td>手机号</td>
						<td>邮箱</td>
						<td>性别</td>
						<td>加入时间</td>
						<td>邀请码</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in lookUserList">
						<td style="text-align: -webkit-center;">
							<div class="centerImg">
								<img :src="list.avatar" alt="">
							</div>
						</td>
						<td>{{list.nick_name}}</td>
						<td>{{list.phone}}</td>
						<td>{{list.mail}}</td>
						<td>{{list.gender}}</td>
						<td>{{list.create_at}}</td>
						<td>{{list.invitation_code}}</td>
					</tr>
				</tbody>
			</table>
			<div>
				<el-pagination class="fr"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="10"
					layout="prev, pager, next, jumper"
					:total="totalPage">
				</el-pagination>
			</div>
		</div>
		<div class="announ" v-if="homeData.announIndex">
			<p>公告</p>
			<div class="announAdd">
				<el-button round @click="addAnnoun">添加公告</el-button>
			</div>
			<table>
				<thead>
					<tr>
						<td>标题</td>
						<td>创建时间</td>
						<!-- <td>更新时间</td> -->
						<td>内容</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr :model="announList">
						<td>{{announList.notice_title}}</td>
						<td>{{announList.create_at}}</td>
						<!-- <td>{{announList.update_at}}</td> -->
						<td>{{announList.notice_content}}</td>
						<td>
							<el-button round @click="editAnnoun">编辑</el-button>
							<el-button round @click="delNotice">删除</el-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 添加公告 -->
		<div class="addAnnoun" style="width:50%;" v-if="homeData.addAnnounIndex">
			<p>添加公告</p>
			<el-form ref="form" :model="addNoticeData" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="addNoticeData.notice_title"></el-input>
				</el-form-item>
				<el-form-item label="公告内容">
					<el-input type="textarea" v-model="addNoticeData.notice_content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addAnnounKeep">立即创建</el-button>
					<el-button  @click="backAnnoun">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 编辑公告 -->
		<div class="homeEdit" style="width:50%;" v-if="homeData.homeEditIndex">
			<p>编辑公告</p>
			<el-form ref="form" :model="editNoticeData" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="editNoticeData.notice_title"></el-input>
				</el-form-item>
				<el-form-item label="公告内容">
					<el-input type="textarea" v-model="editNoticeData.notice_content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="homeEditKeep">保存</el-button>
					<el-button @click="backAnnoun">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>


<script>
export default {
	data() {
		return {
			//查看新增用户信息
			lookUserList:[{
				"user_id": "123213412",
				"nick_name": "张三",
				"phone": "1386048922",
				"mail": "1386048922@qq.com",
				"avatar": "/avatar/123233412.jpg",
				"is_app_admin": 1,
				"gender": 1,    // 0代表女性, 代表男性
				"create_at": "2018-02-02 22:22:22",
				"invitation_code": "邀请码"
			}],
			homeData:{
				announIndex:true,             //公告列表
				addAnnounIndex:false,         //添加公告
				homeEditIndex:false,          //编辑公告
				"notice_title": "这是公告",
				"notice_content": "公告内容"
			},
			announList: {
				"notice_title": "这是公告",
				"create_at": "创建时间",
				"notice_content": "新的公告内容",
				"update_at": "更新时间",
				"notice_id": "123"
			},
			addNoticeData: {
				"notice_title": "",
				"notice_content": ""
			},
			editNoticeData: {
				"notice_title": "",
				"notice_content": ""
			},
			pv: 0,	//访问量
			uv: 0,	//独立访问量
			totalPage:0,    //用户总条数
			currentPage:1,   //用户当前
			anTotalPage:0,    //公告总条数
			anCurrentPage:1   //公告当前
		}
	},
	methods:{
		//添加公告
		addAnnoun(){
			this.homeData.announIndex=false;
			this.homeData.addAnnounIndex=true;
			this.homeData.homeEditIndex=false;

		},
		//编辑公告
		editAnnoun(){
			this.homeData.announIndex=false;
			this.homeData.addAnnounIndex=false;
			this.homeData.homeEditIndex=true;
		},
		// 添加公告-立即创建
		addAnnounKeep() {
			if(!this.addNoticeData.notice_title || !this.addNoticeData.notice_content) {
				this.$message({
          message: '信息填写不完整',
          type: 'warning'
        });
				return;
			} else {
				this.yqPost('/system/notices/', this.addNoticeData, this.addNoticeDataSuc);
			}
		},
		// 添加公告成功
		addNoticeDataSuc(res) {
			if(0 === res.data.code) {
				this.$message({
					message: '创建成功',
					type: 'success'
				});
				this.announList.notice_title = this.addNoticeData.notice_title
				this.announList.notice_content = this.addNoticeData.notice_content
			}
		},
		//编辑公告-保存
		homeEditKeep() {
			this.yqPut(`/system/notices/${this.announList.notice_id}`, this.editNoticeData, res=>{
				if(0 === res.code) {
				this.$message({
					message: '保存成功',
					type: 'success'
				});
				this.announList.notice_title = this.editNoticeData.notice_title
				this.announList.notice_content = this.editNoticeData.notice_content
			}
			});
		},
		// 删除公告
		delNotice() {
			this.yqDel(`/system/notices/${announList.notice_id}/`, this.delNoticeSuc);
		},
		// 删除公告成功
		delNoticeSuc() {
			if(0 === res.data.code) {
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.getLatestNotice()
			}
		},
		//返回/取消
		backAnnoun(){
			this.homeData.announIndex=true;
			this.homeData.addAnnounIndex=false;
			this.homeData.homeEditIndex=false;
		},
		// 获取昨日活跃
		getYesterdayActivity() {
			let user_id = sessionStorage.getItem('user_id');
			// let reqUrl = `/summary/${user_id}/`;
			this.yqGet(`/system/summary/`,res=>{
				if(0 === res.code) {
					this.pv = res.data.PV;
					this.uv = res.data.UV;
				}
			});
		},
		// 处理昨日活跃数据
		getYesterdayActivitySuc(res) {
			
		},
		// 获取用户列表
		getUserList(page) {
			this.yqGet(`/users/?by=created_at&gte=2018-04-01 18:39:47&page=${page}&per-page=10`,res=>{
				if(0 === res.code) {
				this.lookUserList = res.data.data;
				this.totalPage=res.data.count;
			}
			});
		},
		// 获取最新公告
		getLatestNotice() {
			this.yqGet(`/system/notices/lastest/?page=1&per-page=10`, res=>{
				if(0 === res.code) {
					this.announList = res.data;
				}
			});
		},
		// 翻页按钮
		handleCurrentChange(val) {
			this.getUserList(val); // 获取用户列表
    	}
	},
	created() {
		this.getYesterdayActivity();
		this.getUserList(1); // 获取用户列表
		this.getLatestNotice();
	}
}
</script>
<style scoped>
	.homeSurvey>ul:after{
		content: '';
		display: block;
		clear: both;
	}
	.homeSurvey>ul>li{
		width: 30%;
		margin-right: 10px;
		float: left;
		border: 1px solid #dcdcdc;
		padding: 20px;
		height: 150px;
		line-height: 50px;
	}
	.homeSurvey>ul>li>h2{
		text-align: center
	}
	.homeSurvey>ul>li>p{
		text-align: center
	}
	.home>div>p{
		margin: 10px 0;
	}
	.announ{
		margin-top: 30px;
	}
	.announAdd{
		margin: 10px 0;
	}
</style>
