<template>
	<section class="article">
		<div v-if="articleInit === 1">
			<p>
				<el-button type="primary" plain @click="addArticle">新建文章</el-button>
			</p>
			<el-select v-model="article_type" placeholder="请选择" @change="get_article_list_type">
				<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<table>
				<thead>
					<tr>
						<td>标题</td>
						<td>副标题</td>
						<!-- <td>内容</td> -->
						<td>图片</td>
						<td>作者</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(list, index) in articleData" :key="index">
						<td>{{list.article_title}}</td>
						<td>{{list.article_subtitle}}</td>
						<td>
							<div class="centerImg">
								<img :src="list.background[0]" alt="">
							</div>
						</td>
						<!-- <td>{{list.article_content}}</td> -->
						<td>{{list.article_author}}</td>
						<td>
							<el-button round @click="lookArticle(index)">查看文章</el-button>
							<el-button round @click="lookComment(index)">查看评论</el-button>
							<el-button round @click="articleEdit(index)">编辑</el-button>
							<el-button round @click="articleDel(index)">删除</el-button>
							<el-button round @click="zan(index)">点赞</el-button>							
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	
		<!-- 添加文章 -->
		<div class="addArticle" v-if="articleInit === 2">
			<ul>
				<li>
					<span>文章类型</span>
					<div>
						<el-select v-model="releaseData.article_type" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<span>标题</span>
					<div>
						<div>
							<el-input style="width: 200px;" v-model="releaseData.article_title" placeholder="请输入标题"></el-input>
						</div>
					</div>
	
				</li>
				<li>
					<span>副标题</span>
					<div>
						<div>
							<el-input style="width: 200px;" v-model="releaseData.article_subtitle" placeholder="请输副标题"></el-input>
						</div>
					</div>
				</li>
				<li>
					<span>描述内容</span>
					<div>
						<!-- <el-input style="width: 400px;" type="textarea" :rows="2" placeholder="请输入内容" v-model="releaseData.article_content">
							</el-input> -->
						<div class="editor-container">
							<UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
							<!-- <UE :defaultMsg=defaultMsg :config=config :id=ue2 ref="ue2"></UE> -->
						</div>
					</div>
				</li>
	
				<li>
					<span>作者</span>
					<div>
						<div>
							<el-input style="width: 200px;" v-model="releaseData.article_author" placeholder="请输入作者"></el-input>
						</div>
					</div>
				</li>
				<li>
					<p>商品列表</p>
					<el-table ref="multipleTable" :data="shopList" tooltip-effect="dark" style="width: 100%;height: 500px;overflow: auto;" @selection-change="addShopChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
	
						<el-table-column prop="commodity_name" label="商品名称" width="120">
						</el-table-column>

						<el-table-column
							prop="commodity_title"
							label="商品标题"
							width="120">
						</el-table-column>

						<el-table-column
							label="商品图片"
							width="120">
							<template slot-scope="scope">
								<img :src="shopList[scope.$index].commodity_pics[0]" alt="" width="120">
							</template>
						</el-table-column>

						<el-table-column
							label="商品链接"
							width="120">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="jump_out_link(shopList[scope.$index].commodity_link)">查看商品</el-button>
							</template>
						</el-table-column>

						<el-table-column
							prop="commodity_key"
							label="商品关键词"
						show-overflow-tooltip>
						</el-table-column>

					</el-table>
				</li>
			</ul>
			<div>
				<el-button type="primary" plain @click="addArticleKeep">添加</el-button>
				<el-button type="primary" plain @click="back">取消</el-button>
			</div>
		</div>
	
		<!-- 编辑文章 -->
		<div class="articleEdit" v-if="articleInit === 3">
			<!-- <p>编辑文章</p> -->
			<ul>
				<li>
					<p>文章类型</p>
					<el-select v-model="editArticleData.article_type" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</li>
				<li>
					<span>标题</span>
					<div>
						<div>
							<el-input style="width: 200px;" v-model="editArticleData.article_title" placeholder="请输入内容"></el-input>
						</div>
					</div>
	
				</li>
				<li>
					<span>副标题</span>
					<div>
						<div>
							<el-input style="width: 200px;" v-model="editArticleData.article_subtitle" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</li>
				<li>
					<span>描述内容</span>
					<div>
						<!-- <el-input style="width: 400px;" type="textarea" :rows="2" placeholder="请输入内容" v-model="editArticleData.article_content">
						</el-input> -->
						<UE :defaultMsg=editArticleData.article_content :config=config :id=ue2 ref="ue2"></UE>
					</div>
				</li>
				<li>
					<span>作者</span>
					<div>
						<div>
							<el-input style="width: 200px;" v-model="editArticleData.article_author" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</li>
				<li>
					<!-- <ul>
							<li v-if="list in articleData.background"><img :src="" alt="">
							</li>
						</ul> -->
				</li>
			</ul>
			<div>
				<el-button type="primary" plain @click="articleEditKeep">保存</el-button>
				<el-button type="primary" plain @click="back">取消</el-button>
			</div>
		</div>
	
		<!-- 文章评论列表 -->
		<div class="articleComment" v-if="articleInit === 4">
			<p>文章评论列表</p>
			<div>
				<el-button type="primary" plain @click="back">返回</el-button>
			</div>
			<table>
				<thead>
					<tr>
						<td>评论人</td>
						<td>评论内容</td>
						<td>评论时间</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(list, index) in articleComment" :key="index">
						<td>{{list.comment_author}}</td>
						<td>{{list.comment_content}}</td>
						<td>{{list.comment_datetime}}</td>
						<td>
							<el-button type="primary" plain @click="articleCommentDetele(index)">删除</el-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	
		<!-- 查看文章 -->
		<div class="articleEdit" v-if="articleInit === 5">
			<p>查看文章</p>
			<ul>
				<li>
					<span style="margin-right: 20px;" class="articleSpan">标题</span>
					<!-- <div>
							<div> -->
					{{lookArticleData.article_title}}
					<!-- <el-input style="width: 200px;" v-model="lookArticleData.article_title" placeholder="请输入内容"></el-input> -->
					<!-- </div>
						</div> -->
	
				</li>
				<li>
					<span style="margin-right: 20px;" class="articleSpan">副标题</span>
					<!-- <div>
							<div> -->
					{{lookArticleData.article_subtitle}}
					<!-- <el-input style="width: 200px;" v-model="lookArticleData.article_subtitle" placeholder="请输入内容"></el-input> -->
					<!-- </div>
						</div> -->
				</li>
				<li>
					<span style="margin-right: 20px;" class="articleSpan">描述内容</span>
					<!-- <div> -->
					<!-- <el-input
								style="width: 400px;"
								type="textarea"
								:rows="2"
								placeholder="请输入内容"
								v-model="lookArticleData.article_content">
							</el-input> -->
					{{lookArticleData.article_content}}
					<!-- </div> -->
				</li>
				<li>
					<span style="margin-right: 20px;" class="articleSpan">作者</span>
					<!-- <div>
							<div> -->
					{{lookArticleData.article_author}}
					<!-- <el-input style="width: 200px;" v-model="" placeholder="请输入内容"></el-input> -->
					<!-- </div>
						</div> -->
				</li>
				<li>
					<ul>
						<li class="centerImg" style="width:100px" v-for="(item, index) in lookArticleData.background" :key="index">
							<img style="width:100%" :src="item" alt="">
						</li>
					</ul>
				</li>
			</ul>
			<div>
				<table>
					<thead>
						<tr>
							<td>商品名称</td>
							<td>商品标题</td>
							<td>商品图片</td>
							<td>商品价格</td>
							<td>商品关键词</td>
							<td>商品详情</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in lookArticleData.related_commodities" :key="index">
							<td>{{item.commodity_name}}</td>
							<td>{{item.commodity_title}}</td>
							<td>
								<div class="centerImg" style="width:50px">
									<img :src="item.commodity_pics[0]" alt="">
								</div>
							</td>
							<td>{{item.commodity_price}}</td>
							<td>{{item.commodity_key}}</td>
							<td>{{item.commodity_detail}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="margin:30px 0">
				<!-- <el-button type="primary" plain @click="articleEditKeep">保存</el-button> -->
				<el-button type="primary" plain @click="back">返回</el-button>
			</div>
		</div>
	
	</section>
</template>

<script>
	import UE from './ue';
	export default {
		components: {
			UE
		},
		data() {
			return {
				// 富文本框
				defaultMsg: '<span style="orphans: 2; widows: 2; font-size: 22px; font-family: KaiTi_GB2312; background-color: rgb(229, 51, 51);"></span>',
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				ue1: "ue1", // 不同编辑器必须不同的id
				ue2: "ue2",
				article_type: "", // 添加文章要选择的文章类型
				options: [],
				// 初始化
				shopList: [], //商品列表初始化
				articleInit: 1,
				input: "",
				textarea: "",
				articleData: [{
					article_title: "更新 随时随地查看最新特价商品3",
					article_subtitle: "这是副标题3",
					article_content: "<title>随时随地查看最新特价商品3</title>",
					background: [
						"/static/nav-20180202-01.jpg",
						"/static/nav-20180202-01.jpg"
					],
					article_author: "张三",
					atricle_like_number: 111,
					article_type: 1,
					article_id: 3
				}],
				// 所有评论
				articleComment: [{
					comment_content: "这是评论内容1",
					comment_author: "评论人1",
					comment_datetime: "2018-03-03 03:03:03", //评论创建时间
					comment_target_id: "111" //回复那个评论,可空
				}],
				// 发布文章的数据
				releaseData: {
					article_title: "",
					article_subtitle: "",
					article_content: "",
					article_author: "",
					atricle_like_number: "",
					article_type: 4,
					related_commodities: [],
					article_background: []
				},
				// 查看文章
				lookArticleData: {},
				editArticleData: {},
				current_articleId: null,
				delIndex: null // 删除评论的下标
			};
		},
		created() {
			this.get_article_list_topics();
			this.get_article_list_type();
			this.shopListFun(); //商品列表接口调用
		},
		methods: {
			// 点赞
			zan(index) {
				let article_type = this.articleData[index].article_type
				let article_id = this.articleData[index].article_id
				console.log('zan')
				this.yqPatch(`/topics/${article_type}/${article_id}/like/`, res => {
					console.log(res)
				})
			},

			// 跳转到外部链接
			jump_out_link(url) {
				location.href = url
			},

			//商品列表接口封装
			shopListFun() {
				let commodity_type = 8;
				this.yqGet(`/commodities/types/${commodity_type}/`, res => {
					if (res.code == 0) {
						this.shopList = res.data;
						addShopSelection: []
					}
				})
			},

			addShopChange(val) {
				console.log(val)
				let shopListId = [] //商品列表Id初始化
				val.forEach(item => {
					shopListId.push(item.commodity_id)
				})
				this.releaseData.related_commodities = shopListId
			},
			// 获取文章所有类型的接口
			get_article_list_topics() {
				this.yqGet(`/topics/types/`, res => {
					console.log(res);
					if (res.code === 0) {
						this.options = res.data;
					}
				});
			},
	
			// 根据文章类型获取文章列表
			get_article_list_type() {
				// console.log(this.article_type)
				let type = this.article_type || 1;
				// 获取最新的文章列表信息
				this.yqGet(`/topics/types/${type}/`, res => {
					if (res.code === 0) {
						this.articleData = res.data;
					}
				});
			},
	
			// 发布文章
			addArticleKeep() {
				let content = this.$refs.ue.getUEContent(); // 调用子组件方法
				this.$notify({
					title: '获取成功，可在控制台查看！',
					message: content,
					type: 'success'
				});
				console.log(content)
				this.releaseData.article_content = content;
				this.yqPost("/topics/", this.releaseData, res => {
					console.log("发布成功");
					console.log(res);
					if (res.data.code === 0) {
						this.$message({
							message: "发布成功",
							type: "success"
						});
						setTimeout(() => {
							location.reload();
						}, 1000);
					}
				});
			},
			//新建文章
			addArticle() {
				this.articleInit = 2;
			},
			//文章列表-查看评论
			lookComment(index) {
				this.articleInit = 4;
				// 获取一篇文章信息文章下面的所有评论
				let article_id = this.articleData[index].article_id;
				let article_type = this.articleData[index].article_type;
				
				this.current_articleId = article_id;
				this.yqGet(`/topics/${article_type}/${article_id}/comments/`, res => {
					if (res.code === 0) {
						this.articleComment = res.data;
					}
				});
			},
	
			//文章列表-编辑
			articleEdit(index) {
				this.articleInit = 3;
				this.editArticleData = this.articleData[index];
			},
			//编辑文章-保存
			articleEditKeep() {
				let article_type = this.editArticleData.article_type;
				let article_id = this.editArticleData.article_id;
				let related_commodities = []
				this.editArticleData.related_commodities.forEach(element => {
					related_commodities.push(element.commodity_id)
				});
				// 编辑文章富文本框
				// let content = this.$refs.ue.getUEContentTxt(); // 调用子组件方法
				// this.$notify({
				//   title: '获取成功，可在控制台查看！',
				//   message: content,
				//   type: 'success'
				// });
				// console.log(content)
				// this.editArticleData.article_content=content;
				this.editArticleData.related_commodities = related_commodities;
				this.yqPut(
					`/topics/${article_type}/${article_id}/`,
					this.editArticleData,
					res => {
						console.log(res);
					}
				);
			},
			//文章评论列表-删除
			articleCommentDetele(index) {
				// 删除一篇文章信息文章下面的特定评论
				let article_id = this.current_articleId;
				let comment_id = this.articleComment[index].comment_id;
				this.delIndex = index;
				this.yqDel(`/topics/${article_id}/comments/${comment_id}/`, res => {
					if (res.data.code === 0) {
						this.articleComment.splice(this.delIndex, 1);
						this.$message({
							message: "删除成功",
							type: "success"
						});
					}
				});
			},
	
			//返回
			back() {
				this.articleInit = 1;
			},
			// 查看具体某一篇文章
			lookArticle(index) {
				this.articleInit = 5;
				let article_id = this.articleData[index].article_id;
				let article_type = this.articleData[index].article_type;
				this.yqGet(`/topics/${article_type}/${article_id}/`, res => {
					console.log(res)
					if (res.code === 0) {
						this.lookArticleData = res.data;
					}
				});
			}
		}
	};
</script>

<style scoped>
	.info {
		border-radius: 10px;
		line-height: 20px;
		padding: 10px;
		margin: 10px;
		background-color: #ffffff;
	}
	
	.article {
		border: 1px solid #dcdcdc;
		padding: 30px;
	}
	
	.article>div>p {
		margin-bottom: 10px;
	}
	
	.article ul>li {
		margin: 10px 0;
	}
	
	.article ul>li>div {
		margin-top: 10px;
	}
	
	.articleComment>div {
		margin-bottom: 10px;
	}
	
	.articleDel {
		border: 1px solid #dcdcdc;
		padding: 10px;
	}
	
	.articleDel>ul>li {
		padding: 0 10px;
	}
	
	.articleDel>ul>li::after {
		clear: both;
		content: "";
		display: block;
		margin-bottom: 20px;
	}
	
	.articleEdit tr>td {
		width: 16.6%;
		text-align: center;
		text-align: -webkit-center;
	}
	
	.articleDel>ul>li>span {
		width: 100px;
		display: inline-block;
		float: left;
		line-height: 36px;
	}
	
	.articleDel>ul>li input {}
	
	.articleSpan {
		display: inline-block;
	}
</style>