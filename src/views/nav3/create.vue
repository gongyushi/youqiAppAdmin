<template>
	<section class="create">
		<div>
			<ul>
			<li>
				<div>
					<img src="https://pro.modao.cc/uploads3/images/1728/17289814/raw_1519442092.png" alt="">
				</div>
				 <el-button type="primary">生成二维码</el-button>
			</li>
			<li>
				<div>
					<img src="https://pro.modao.cc/uploads3/images/1728/17289867/raw_1519442191.png" alt="">
				</div>
				 <el-button type="primary">生成二维码</el-button>
			</li>
		</ul>
		</div>
		
	</section>
</template>
<script>
export default {
  
}
</script>
<style>
	.create>div{
		border: 1px solid #dcdcdc;
		padding: 10px;
	}
	.create>div>ul:after{
		clear: both;
		display: block;
		content: "";
	}
	.create>div>ul>li{
		float: left;
		margin: 20px;
		text-align: -webkit-center;
	}
	.create>div>ul>li>div{
		width: 117px;
		height: 133px;
		margin-bottom: 10px;
		border:1px solid #dcdcdc;
	}
	.create>div>ul>li>div img{
		width: 100%;
	}
</style>

