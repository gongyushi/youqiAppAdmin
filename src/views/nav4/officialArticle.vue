<template>
	<section class="article">
		<div  v-if="articleInit.articleListIndex">
			<p><el-button type="primary" plain @click="addArticle()">新建文章</el-button></p>
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
					<tr v-for="list in articleData">
						<td>{{list.article_title}}</td>
						<td>{{list.article_subtitle}}</td>
						<!-- <td>{{list.article_content}}</td> -->
						<td>{{list.background[0]}}</td>
						<td>{{list.article_author}}</td>
						<td>
							<el-button round @click="lookComment">查看评论</el-button>
							<el-button round @click="articleEdit">编辑</el-button>
							<el-button round>删除</el-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="addArticle" v-if="articleInit.addArticleIndex">
			<p>添加文章</p>
			<ul>
				<li>
					<span>标题</span>
					<div>
						<div><el-input style="width: 200px;" v-model="articleData.article_title" placeholder="请输入内容"></el-input></div>
					</div>
					
				</li>
				<li>
					<span>副标题</span>
					<div>
						<div><el-input style="width: 200px;" v-model="articleData.article_subtitle" placeholder="请输入内容"></el-input></div>
					</div>
				</li>
				<li>
					<span>描述内容</span>
					<div>
						<el-input
							style="width: 400px;"
							type="textarea"
							:rows="2"
							placeholder="请输入内容"
							v-model="articleData.article_content">
						</el-input>
					</div>
				</li>
				<li>
					<span>作者</span>
					<div>
						<div><el-input style="width: 200px;" v-model="articleData.article_author" placeholder="请输入内容"></el-input></div>
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
				<el-button type="primary" plain @click="addArticleKeep">保存</el-button>
				<el-button type="primary" plain @click="back">取消</el-button>
			</div>
		</div>
		<div class="articleEdit" v-if="articleInit.articleEditIndex">
			<p>编辑文章</p>
			<ul>
				<li>
					<span>标题</span>
					<div>
						<div><el-input style="width: 200px;" v-model="articleData.article_title" placeholder="请输入内容"></el-input></div>
					</div>
					
				</li>
				<li>
					<span>副标题</span>
					<div>
						<div><el-input style="width: 200px;" v-model="articleData.article_subtitle" placeholder="请输入内容"></el-input></div>
					</div>
				</li>
				<li>
					<span>描述内容</span>
					<div>
						<el-input
							style="width: 400px;"
							type="textarea"
							:rows="2"
							placeholder="请输入内容"
							v-model="articleData.article_content">
						</el-input>
					</div>
				</li>
				<li>
					<span>作者</span>
					<div>
						<div><el-input style="width: 200px;" v-model="articleData.article_author" placeholder="请输入内容"></el-input></div>
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
		<div class="articleComment" v-if="articleInit.articleCommentIndex">
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
					<tr v-for="list in articleComment">
						<td>{{list.comment_author}}</td>
						<td>{{list.comment_content}}</td>
						<td>{{list.comment_datetime}}</td>
						<td>
							<el-button type="primary" plain @click="articleCommentDetele">删除</el-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>
<script>
  export default {
    data() {
      return {
			  // 初始化
			articleInit:{
				articleListIndex:true,
				addArticleIndex:false,
				articleEditIndex:false,
				articleCommentIndex:false
			},
			input:"",
			textarea: '',
		  	articleData: [{
				"article_title": "更新 随时随地查看最新特价商品3",
				"article_subtitle": "这是副标题3",
				"article_content": "<title>随时随地查看最新特价商品3</title>",   
				"background": ["/static/nav-20180202-01.jpg", "/static/nav-20180202-01.jpg"],
				"article_author": "张三",
				"atricle_like_number": 111,
				"article_type": 1,
				"article_id": 3
			}],
			articleComment:[{
				"comment_content": "这是评论内容1",
				"comment_author": "评论人1",
				"comment_datetime": "2018-03-03 03:03:03",  //评论创建时间
				"comment_target_id": "111"         //回复那个评论,可空 
			}] 
       }
	},
	methods:{
		//新建文章
		addArticle(){
			this.articleInit.articleListIndex=false;
			this.articleInit.addArticleIndex=true;
		},
		//文章列表-查看评论
		lookComment(){
			this.articleInit.articleListIndex=false;
			this.articleInit.articleCommentIndex=true;
		},
		//文章列表-编辑
		articleEdit(){
			this.articleInit.articleListIndex=false;
			this.articleInit.articleEditIndex=true;
		},
		//文章列表-删除
		//添加文章-保存
		addArticleKeep(){

		},
		//编辑文章-保存
		articleEditKeep(){

		},
		//文章评论列表-删除
		articleCommentDetele(){

		},
		//返回
		back(){
			this.articleInit.articleListIndex=true;
			this.articleInit.addArticleIndex=false;
			this.articleInit.articleCommentIndex=false;
			this.articleInit.articleEditIndex=false;
		}
	}
  }
</script>
<style scoped>
	.article{
		border: 1px solid #dcdcdc;
		padding: 30px;
	}
	.article>div>p{
		margin-bottom: 10px;
	}
	.article ul>li{
		margin: 10px 0;
	}
	.article ul>li>div{
		margin-top: 10px
	}
	.articleComment>div{
		margin-bottom: 10px;
	}
	.articleDel{
		border: 1px solid #dcdcdc;
		padding:10px;
	}
	.articleDel>ul>li{
		padding:0 10px;
	}
	.articleDel>ul>li::after{
		clear: both;
		content: '';
		display: block;
		margin-bottom: 20px;
	}
	.articleDel>ul>li>span{
		width: 100px;
		display: inline-block;
		float: left;
		line-height: 36px;
	}
	.articleDel>ul>li input{
		
	}
</style>