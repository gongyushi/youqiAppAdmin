<template>
    <div class="service">
        <div v-if="serviceIndex === 1">  
            <div class="serviceAdd">
                <el-button round @click="serAdd">添加客服</el-button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>客服昵称</td>
                        <td>手机号</td>
                        <td>QQ</td>
                        <td>邮箱</td>                        
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in serviceList" :key="index">
                        <td>{{list.customer_name}}</td>
                        <td>{{list.customer_phone}}</td>
                        <td>{{list.customer_qq}}</td>
                        <td>{{list.customer_mail}}</td>                        
                        <td>
                            <el-button round @click="serEdit(index)">编辑</el-button>
                            <el-button round @click="delServer(index)">删除</el-button>                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="serviceEdit" v-if="serviceIndex === 2">
            <div style="margin: 20px;">编辑</div>
            <el-form :label-position="labelPosition" label-width="80px" :model="serverEdit">
                <el-form-item label="客服QQ">
                    <el-input v-model="serverEdit.customer_qq"></el-input>
                </el-form-item>
                <el-form-item label="客服手机">
                    <el-input v-model="serverEdit.customer_phone"></el-input>
                </el-form-item>
                <el-form-item label="客服昵称">
                    <el-input v-model="serverEdit.customer_name"></el-input>
                </el-form-item>
                <el-form-item label="客服邮箱">
                    <el-input v-model="serverEdit.customer_mail"></el-input>
                </el-form-item>
                <!-- TODO 可能这里要接用户头像 -->
            </el-form>
            <div>
                <el-button type="primary" plain @click="updateServer(serverEdit.customer_id)">保存</el-button>
                <el-button type="primary" plain @click="back">返回</el-button>
            </div>
        </div>

        <div class="serviceEdit" v-if="serviceIndex === 3">
            <div style="margin: 20px;">添加客服</div>
            <el-form :label-position="labelPosition" label-width="80px" :model="addServer">
                <el-form-item label="客服QQ">
                    <el-input v-model="addServer.customer_qq" type="number"></el-input>
                </el-form-item>
                <el-form-item label="客服手机">
                    <el-input v-model="addServer.customer_phone" type="number"></el-input>
                </el-form-item>
                <el-form-item label="客服名称">
                    <el-input v-model="addServer.customer_name"></el-input>
                </el-form-item>
                <el-form-item label="客服微信">
                    <el-input v-model="addServer.customer_wx"></el-input>
                </el-form-item>
                <el-form-item label="客服邮箱">
                    <el-input v-model="addServer.customer_mail"></el-input>
                </el-form-item>
                <!-- <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://139.199.69.117:10240/api/v10/"
                    :data="addServer"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取头像图片</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                <!-- </el-upload> -->
            </el-form>
            <div>
                <el-button type="primary" plain @click="addServerClick">保存</el-button>
                <el-button type="primary" plain @click="back">返回</el-button>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            fileList: [],
            // 初始化数据
            currentServerIndex: 0,  // 点击当前的index
            labelPosition: 'right',
            serviceIndex: 1,  //1.列表页 2.b编辑页 3.添加页
            serverEdit:{
                customer_id: 0,
                customer_qq:"",        //编辑QQ
                customer_phone:"",      //编辑手机
                customer_name:""  //编辑客服     
            },
            addServer:{
                customer_qq:"",        //编辑QQ
                customer_phone:"",      //编辑手机
                customer_name:"",  //编辑客服 
                customer_wx: '',    // 客服微信
                customer_type: 2,
                customer_mail: '',
                customer_photo: ''                
            },
            serviceList:[
                {
                  customer_id: 2,
                  customer_qq: "",
                  customer_phone: "",
                  customer_name: ""
              }
            ]
        }
    },
    created() {
        // 客服信息查看
        this.yqGet('/system/customers/', res => {
            this.serviceList = res.data            
        })
    },
    methods:{
        // 删除客服
        delServer(index){
            let customer_id =  this.serviceList[index].customer_id
            this.yqDel(`/system/customers/${customer_id}/`, res => {
                if(res) {
                    this.serviceList.splice(index, 1)
                }
            })
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }, 
        // 编辑客服-保存 
        updateServer(id) {
            this.serverEdit.customer_qq = this.serverEdit.customer_qq - 0
            this.yqPut(`/system/customers/${id}/`, this.serverEdit, res => {
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
                this.initPage()
            })
        },
       
        // 添加客服
        addServerClick() {
            this.addServer.customer_qq = this.addServer.customer_qq - 0
            this.yqPost('/system/customers/', this.addServer, res => {
                 this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.initPage()
            })
        },
        
        initPage() {
            this.serviceIndex = 1  //列表页
            location.reload()
        },

        //编辑
        serEdit(index){
            this.serviceIndex = 2;
            this.currentServerIndex = index
            this.serverEdit = this.serviceList[index]
        },
        //编辑-返回
        back(){
            this.serviceIndex=1;
        },
        //添加页面
        serAdd(){
            this.serviceIndex=3;
        }
    }

}
</script>
<style scoped>
    .serviceAdd{
        margin: 10px 0;
    }
    .serviceEdit{
        width: 50%;
        /* display: none; */
    }
    .upload-demo {
        box-sizing: border-box;
        padding-left: 80px;
        margin-bottom: 30px;
    }
</style>


