<template>
    <div class="help">
        <div class="helpList" v-if="helpData === 1">
            <table>
                <thead>
                    <tr>
                        <td>英文显示</td>
                        <td>中文显示</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in helpList">
                        <td>{{list.en_name}}</td>
                        <td>{{list.cn_name}}</td>
                        <td>
                            <el-button type="primary" plain @click="helpDetail(list.doc_type_name)">查看详情</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div class="helpDetail" v-if="helpData === 2">
            <div style="margin:10px 0">
                 <el-button type="primary" plain @click="helpBack">返回</el-button>
            </div>
             <table>
                <thead>
                    <tr>
                        <td style="width: 20%;">问题</td>
                        <td style="width: 40%;">回答</td>
                        <td>创建时间</td>
                        <td>浏览量</td>
                        <td>作者</td>
                        <td>type-name</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in helpDetailList">
                        <td>{{list.Q}}</td>
                        <td>{{list.A}}</td>
                        <td>{{list.update}}</td>
                        <td>{{list.browse}}</td>
                        <td>{{list.author}}</td>
                        <td>{{list.type-name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            // 初始化数据
            helpData: 1,   // 1 列表   2 详情
            // 所有帮助文档的列表
            helpList:[{
                "en_name": "new",
                "cn_name": "新手入门",
                "doc_type_name": "new"
            }],
            // 通过类别获取所有帮助文档详情
            helpDetailList:[{
                "Q":"关于高效API转链和登录授权的说明常见",
                "A": "为避免低佣情况，现将传统的二合一拼接模式升级为“高效API进行转链和申请最高佣计划”该转链API为阿里妈妈官方提供，测试一段时间已趋于稳定，可放心使用！说。。。。",
                "update": "2018-02-02 22:22:22",
                "browse": 22222,
                "author": 22222,
                "type-name":"question"
            }],
        }
    },
    created() {
        // 获取所有帮助文档的列表
        this.yqGet('/docs/types/', this.getListCB) 
    },
    methods:{
        getListCB(res) {
            console.log(res)
        },
        // 查看详情
        helpDetail(name){
            this.helpData = 2;
        },
        // 返回
        helpBack(){
            this.helpData = 1;
        }
    }
}
</script>
<style>

</style>


