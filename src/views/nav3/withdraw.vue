<template>
	<section>

		<div class="withdraw">
			<ul>
				<li><el-button type="primary" :plain="plain" @click.native="waitDraw">待提现</el-button></li>
				<li><el-button type="primary" :plain="!plain" @click.native="hasDraw">已提现</el-button></li>
			</ul>
			 <el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column
					prop="name"
					label="姓名"
					width="180">
				</el-table-column>
				<el-table-column
					prop="price"
					label="提现金额"
					width="180">
				</el-table-column>
				<el-table-column
					prop="date"
					label="日期"
					width="180">
				</el-table-column>
				
				<el-table-column
					prop="address"
					width="430"
					label="地址">
				</el-table-column>
				<el-table-column v-if="!plain"
					label="操作">
					 <template slot-scope="scope">
						<el-button type="text" size="small" @click="withdraw(scope.$index)">提现</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</section>
</template>
<script>
  export default {
    data() {
      return {
				plain: false,
        tableData: [{
					price:'$99.99',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
					price:'$99.99',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
					price:'$99.99',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
					price:'$99.99',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
		},
		methods: {
			// 点击未提现
			waitDraw() {
				this.plain = !this.plain
			},
			// 点击已提现
			hasDraw() {
				this.plain = !this.plain				
			},

			// 提现
			withdraw(index) {
				console.log(index)
				this.yqPost('')
			}
		}
  }
</script>
<style>
	.withdraw{
		border: 1px solid #dcdcdc;
		padding: 30px;
	}
	.withdraw>ul>li{
		float: left;
	}
	.el-table__header-wrapper table {
		margin: 0;
	}
	.el-table__body-wrapper table {
		margin: 0;
	}
	table .cell {
		text-align: center;
	}
</style>