<template>
	<section class="site">
		<div class="siteList" v-if="siteData === 1">
			<p>用户消息列表</p>
			<div >
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
						<tr v-for="(list,index) in siteList" :key="index">
							<td>{{list.message_image}}</td>
							<td>{{list.message_title}}</td>
							<td>{{list.message_type}}</td>
							<td>{{list.message_content}}</td>
							<td>{{list.message_create_at}}</td>
							<!-- TODO 看消息是否已经推送 -->
							<td>
									<el-button round @click="siteEdit(list.message_id)">编辑</el-button>
									<el-button round @click="delMsg(index, list.message_id)">删除</el-button>
									<el-button round @click="pushMsg(list.message_id)">推送</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="siteEdit" style="width:50%" v-if="siteData === 2">
			<p>编辑</p>
			<el-form :label-position="labelPosition" label-width="80px" :model="editContent">
				<el-form-item label="标题">
					<el-input v-model="editContent.message_title"></el-input>
				</el-form-item>
				<el-form-item label="消息来源">
					<el-input v-model="editContent.message_type"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="editContent.message_content"></el-input>
				</el-form-item>
				<el-form-item label="详细内容">
					<el-input type="textarea" v-model="editContent.message_detail"></el-input>
				</el-form-item>
			</el-form>
			<div>
					<el-button type="primary" @click="save">保存</el-button>
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
      labelPosition: "right",
      input: "",
      textarea: "",
      user_id: "",
      // 编辑
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        content: "",
        contentDel: ""
      },
      siteList: [
        {
          message_type: 2,
          message_id: 111,
          message_title: "BUG",
          message_type: "消息来源",
          message_content: "这是个问题", //简短的消息
          message_image: "http://ip:5555/static/image.jpg",
          message_create_at: "2018-02-22 22:22:22"
        }
      ],
      editContent: {
        message_type: 2,
        message_id: 123,
        message_title: "",
        message_type: "",
        message_content: "",
        message_detail: "",
        user_avatar_url: "",
        user_nick_name: ""
      },
      delIndex: null
    };
  },
  methods: {
    //编辑
    siteEdit(message_id) {
      this.siteData = 2;
      this.yqGet(
        `/messages/${message_id}/`,res=>{
			if (0 === res.code) {
				this.editContent = res.data;
			}
		});
    },
    // 保存
    save() {
      console.log(this.editContent)
      if (
        !this.editContent.message_title ||
        !this.editContent.message_type ||
        !this.editContent.message_content ||
        !this.editContent.message_detail
      ) {
        this.$message({
          message: "输入不正确",
          type: "warning"
        });
        return;
      }
      let reqContent = {
        message_type: this.editContent.message_type,
        message_title: this.editContent.message_title,
        message_type: this.editContent.message_type,
        message_content: this.editContent.message_content,
        message_detail: this.message_detail
      };
      this.yqPut(
        `/users/${this.user_id}/messages/${this.editContent.message_id}/`,
        this.editContent,
        res=>{
            if (0 === res.data.code) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.siteData = 1;
            }
        }
      );
    },
    // 返回
    back() {
      this.siteData = 1;
    },
    // 获取消息列表
    getMsgList() {
      this.yqGet(`/messages/types/2/`, res=>{
		  	if (0 === res.code) {
				this.siteList = res.data;
			}
	  });
    },
    // 删除信息
    delMsg(index, message_id) {
      this.delIndex = index;
      this.yqDel(
        `/users/${this.user_id}/messages/${message_id}/`,
        res=>{
          if (0 === res.data.code) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.siteList.splice(this.delIndex, 1);
          }
        }
      );
    },
    // 推送信息
    pushMsg(message_id) {
      this.yqPost(
        `/users/${this.user_id}/messages/${message_id}/push/`,res=>{
			if (0 === res.code) {
				this.$message({
				message: "推送成功",
				type: "success"
				});
      		}
		});
    },
  },
  created() {
    this.user_id = sessionStorage.getItem("user_id");
    this.getMsgList();
  }
};
</script>
  <style>
.site > div > p {
  margin: 10px 0;
}
</style>
