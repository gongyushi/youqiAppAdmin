<template>
	<section>
		<div class="order">
			<ul>
				<li>
					<div>
						<span>1年超值套餐</span>
						<p>$1990.00</p>
						<hr>
						<h2>简介</h2>
						<div>这个套餐很好，买了它以后你上网都赚钱，睡觉睡到自然醒，数钱数到手抽筋</div>
						<el-radio v-model="radio" label="1">备选项</el-radio>
  						<el-radio v-model="radio" label="2">备选项</el-radio>
					</div>
					 <el-button style="width:90%; margin-left:5%" type="primary">立即购买</el-button>
				</li>
				<li>
					<div>
						<span>2年超值套餐</span>
						<p>$2990.00</p>
						<hr>
						<h2>简介</h2>
						<div>这个套餐很好，买了它以后你上网都赚钱，睡觉睡到自然醒，数钱数到手抽筋</div>
						<el-radio v-model="radio" label="1">备选项</el-radio>
  						<el-radio v-model="radio" label="2">备选项</el-radio>
					</div>
					 <el-button style="width:90%; margin-left:5%" type="primary">立即购买</el-button>
				</li>
				<li>
					<div>
						<span>3年超值套餐</span>
						<p>$3990.00</p>
						<hr>
						<h2>简介</h2>
						<div>这个套餐很好，买了它以后你上网都赚钱，睡觉睡到自然醒，数钱数到手抽筋</div>
						<el-radio v-model="radio" label="1">备选项</el-radio>
  						<el-radio v-model="radio" label="2">备选项</el-radio>
					</div>
					 <el-button style="width:90%; margin-left:5%" type="primary">立即购买</el-button>
				</li>
				<li>
					<div>
						<span>4年超值套餐</span>
						<p>$4990.00</p>
						<hr>
						<h2>简介</h2>
						<div>这个套餐很好，买了它以后你上网都赚钱，睡觉睡到自然醒，数钱数到手抽筋</div>
						<el-radio v-model="radio" label="1">备选项</el-radio>
  						<el-radio v-model="radio" label="2">备选项</el-radio>
					</div>
					 <el-button style="width:90%; margin-left:5%" type="primary">立即购买</el-button>
				</li>
			</ul>
		</div>
		
		
	</section>
</template>


<script>
export default {
  data() {
    return {
			keyWord: '',
			radio: '1'
    }
  }
}
</script>
<style scoped>
	.order>ul{
		width: 100%;
		margin: 20px 0;
		overflow: hidden;
	}
	.order>ul>li{
		width: 23%;
		float: left;
		list-style: none;
		margin-right:20px;
	}
	.order>ul>li>div{
		width: 100%;
		border:1px solid #dcdcdc;
		padding: 20px;
		margin-bottom: 20px;
	}
	.order>ul>li span{
		font-size: 24px;
		display: block;
		text-align: center;
	}
	.order>ul>li p{
		font-size: 50px;
		display: block;
		text-align: center;
		margin: 10px 0;
	}
	.order>ul>li h2{
		margin:10px 0; 
	}
	.order>ul>li div{
		margin: 10px 0;
	}
</style>

