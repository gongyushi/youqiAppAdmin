<template>
	<section class="site">
		<div class="siteList" v-if="siteData === 1">
			<p>用户消息列表</p>
			<div>
				<table>
					<thead>
						<tr>
							<td>图片</td>
							<td>标题</td>
							<td>信息来源</td>
							<td>信息内容</td>
							<td>创建时间</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list, index) in siteList" :key="index">
							<td>{{list.message_image}}</td>
							<td>{{list.message_title}}</td>
							<td>{{list.message_src}}</td>
							<td>{{list.message_content}}</td>
							<td>{{list.message_create_at}}</td>
							<td>
								<el-button round @click="siteEdit(index)">编辑</el-button>
								<el-button round @click="siteDel(index)">删除</el-button>
								<el-button round @click="sitePush(index)">推送</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	
		<div class="siteEdit" style="width:50%" v-if="siteData === 2">
			<p>编辑</p>
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
				<el-form-item label="标题">
					<el-input v-model="formLabelAlign.message_title"></el-input>
				</el-form-item>
				<el-form-item label="消息来源">
					<el-input v-model="formLabelAlign.message_src"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="formLabelAlign.message_content"></el-input>
				</el-form-item>
				<el-form-item label="详细内容">
					<el-input type="textarea" v-model="formLabelAlign.message_detail"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button type="primary" @click="updateSite">保存</el-button>
				<el-button type="primary" @click="back">取消</el-button>
			</div>
		</div>
	
	</section>
</template>

<script>
	export default {
		data() {
			return {
				//初始化数据
				siteData: 1,
				labelPosition: 'right',
				input: '',
				textarea: '',
				// 编辑
				formLabelAlign: {
					message_type: 2,
					message_title: '',
					message_src: '',
					message_content: "",
					message_detail: ""
				},
				siteList: [{
					"message_type": 2,
					"message_id": 111,
					"message_title": "BUG",
					"message_src": "消息来源",
					"message_content": "这是个问题", //简短的消息
					"message_image": "http://ip:5555/static/image.jpg",
					"message_create_at": "2018-02-22 22:22:22",
					"message_detail": "详细的消息详情"
				}]
			}
		},
		created() {
			let user_id = sessionStorage.getItem('userid')
			// 获取用户消息列表
			this.yqGet(`/users/${user_id}/messages/`, this.getListCB)
		},
		methods: {
			getListCB(res) {
				this.siteList = res.data
			},
			//编辑
			siteEdit(index) {
				this.siteData = 2;
				this.formLabelAlign = this.siteList[index]
			},
			// 返回
			back() {
				this.siteData = 1;
			},
			// 更新某一条消息
			updateSite() {
				let user_id = sessionStorage.getItem('userid')
				this.yqPost(`/users/${user_id}/messages/`, this.formLabelAlign, this.updateSuccess)
			},
			updateSuccess(res) {
				if(res.data.code === 0) {
				 	this.$message({
						message: '保存成功',
						type: 'success'
					});
					// 刷新当前页面
					location.reload()
				}
			},
			// 删除消息
			siteDel(index) {
				let user_id = sessionStorage.getItem('userid')
				let message_id = this.siteList[index].message_id		
				this.yqDel(`/users/${user_id}/messages/${message_id}/`, this.delSuccess, {
					headers: {
						"Content-Type": "applicaton/json",
    				"Authorization": sessionStorage.getItem('token')
					}
				})
			},
			delSuccess(res) {
				if(res.data.code === 0) {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					// 刷新当前页面
					location.reload()
				}
			}
		}
	}
</script>

<style>
	.site>div>p {
		margin: 10px 0;
	}
</style>
  