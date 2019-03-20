<template>
    <div class="offHome">
        <div style="width:50%">
             <el-form :label-position="labelPosition" label-width="80px" :model="offHomeData">
                <el-form-item label="地址">
                    <el-input v-model="offHomeData.address"></el-input>
                </el-form-item>
                <el-form-item label="联系号码">
                    <el-input v-model="offHomeData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="offHomeData.Email"></el-input>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-input v-model="offHomeData.company"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button type="primary" plain>保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        labelPosition: 'right',
        offHomeData: {
            "address": "建设路22号",
            "phone": "09234084923",
            "Email": "邮箱",
            "company": "优栖网络有限公司"
        }
      };
    }
}
</script>
<style>
    .offHome{
        border: 1px solid #dcdcdc;
        padding: 10px;
    }
</style>


