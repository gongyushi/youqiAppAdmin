<template>
	<section>
		<div class="userManage">
			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">全部</el-tab-pane>
				<el-tab-pane label="黑名单" name="second">黑名单</el-tab-pane>
				<el-tab-pane label="余额查看" name="three">余额查看</el-tab-pane>
			</el-tabs>
			<!-- 查看所有用户 -->
			<div class="userAll" v-if="dataInit === 1">
					<table>
						<thead>
							<tr>
								<td>
									<label for="chooseAll">全选</label>
									<input type="checkbox" value="1" v-model="chooseAll" id="chooseAll">
								</td>
								<td>图片</td>
								<td>姓名</td>
								<td>手机号</td>
								<td>邮箱</td>
								<td>创建时间</td>
								<td>性别</td>
								<td>邀请码</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(list,index) in tableData" :key="index">
								<td><input type="checkbox" :value="list.user_id" v-model="allArr"></td>
								<td>
									<div class="centerImg">
											<img :src="list.avatar" alt="">
										</div>
								</td>
								<td>{{list.nick_name}}</td>
								<td>{{list.phone}}</td>
								<td>{{list.mail}}</td>
								<td>{{list.create_at}}</td>
								<td>{{list.gender}}</td>
								<td>{{list.invitation_code}}</td>
							</tr>
						</tbody>
					</table>
					<div>
						  <el-pagination class="fr"
								@current-change="handleCurrentChange"
								:current-page.sync="currentPage3"
								:page-size="10"
								layout="prev, pager, next, jumper"
								:total="totalPage">
							</el-pagination>
					</div>
					<div class="userOperation ">
							<el-button round @click="intoBlack">拉黑用户</el-button>
							<!-- <el-button round @click="removeBlack">移除</el-button> -->
					</div>
			</div>

			<!-- 查看黑名单用户 -->
			<div class="userAll" v-if="dataInit === 2">
					<table>
						<thead>
							<tr>
								<td>
									<label for="blackAll">全选</label>
									<input type="checkbox" value="1" v-model="chooseAllBlack" id="blackAll">																		
								</td>								
								<td>图片</td>
								<td>姓名</td>
								<td>手机号</td>
								<td>邮箱</td>
								<td>创建时间</td>
								<td>性别</td>
								<td>邀请码</td>
							</tr>
						</thead>
						<tbody>
								<tr v-for="(list,index) in blacklist" :key="index">
									<td>
										<input type="checkbox" :value="list.user_id" v-model="blackArr">									
									</td>
									<td>
										<div class="centerImg">
											<img :src="list.avatar" alt="">
										</div>
									</td>
									<td>{{list.nick_name}}</td>
									<td>{{list.phone}}</td>
									<td>{{list.mail}}</td>
									<td>{{list.create_at}}</td>
									<td>{{list.gender}}</td>
									<td>{{list.invitation_code}}</td>
								</tr>
						</tbody>
					</table>
					<div>
						  <el-pagination class="fr"
								@current-change="handleCurrentChange"
								:current-page.sync="currentPage3"
								:page-size="10"
								layout="prev, pager, next, jumper"
								:total="totalPage">
							</el-pagination>
					</div>
					<div class="userOperation ">
							<el-button round @click="removeBlack">移除黑名单</el-button>
					</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
			blacklist:[],  // 黑名单用户列表
			blackArr: [], // 黑名单用户的id数组
			allArr: [], // 选择所有用户的ID数组
			chooseAll: [],
			chooseAllBlack: [],
			dataInit: 1, // 1  全部用户  2   黑名单
			activeName2: "first", //tabs
			tableData: [],
			currentPage3:1,
			totalPage:0     //翻页总条数
    };
  },
  created() {
    // 获取所有用户列表
    this.getUserList(1);
  },
  watch: {
    chooseAll() {
      if (this.chooseAll.length) {
        this.tableData.map(item => {
          this.allArr.push(item.user_id);
        });
      } else {
        this.allArr = [];
      }
    },
    chooseAllBlack() {
      if (this.chooseAllBlack.length) {
        this.blacklist.map(item => {
          this.blackArr.push(item.user_id);
        });
      } else {
        this.blackArr = [];
      }
    }
  },
  methods: {
    // 拉黑
    intoBlack() {
		console.log(this.allArr)
      this.yqPost(
        "/users/blacklist/batch/",
        { user_ids: this.allArr },res=>{
			 if (0 === res.code) {
				this.$message({
				message: "操作成功",
				type: "success"
				});
				// this.getUserList(1);
			}
		});
    },
    // 移除黑名单
    removeBlack() {
      this.yqDel(
        `/users/blacklist/batch/?user_ids=${this.blackArr.join(',')}`,{},
        res=>{
					if (0 === res.code) {
						this.$message({
							message: "操作成功",
							type: "success"
						});
						this.getBlackList(1);
					}
				}
      );
    },
		//用户列表
    getUserList(page) {
      this.yqGet(`/users/?by=create_at&get="2018-01-01 00:00:00"&page=${page}&per-page=10`, res => {
        if (0 === res.code) {
					this.tableData = res.data.data;
					this.totalPage=res.data.count;
        }
      });
    },

    handleClick(tab, event) {
			if(tab.name === "first"){
				this.dataInit = 1;
				// 获取所有用户列表
					this.getUserList(1);
			}else if (tab.name === "second") {
				this.dataInit = 2;
				this.getBlackList(1);
			}
    },
    // 获取黑名单列表
    getBlackList(page) {
			this.yqGet(`/users/blacklist/?&page=${page}&per-page=10`, res=>{
				if (0 === res.code) {
						this.blacklist = res.data.data;
						this.totalPage=res.data.count;
				}
			});
		},
		// 页面
		handleCurrentChange(val) {
				if(this.dataInit==1){
						this.getUserList(val);
				}else if(this.dataInit==2){
						this.getBlackList(val)
				}
				
    }
  }
};
</script>
<style>
.userManage {
  border: 1px solid #dcdcdc;
  padding: 30px;
}
.userManage > ul > li {
  float: left;
}
.el-tabs__content {
  display: none;
}
.userOperation {
  margin-top: 20px;
}
</style>

