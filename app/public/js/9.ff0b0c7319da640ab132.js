webpackJsonp([9],{jFLA:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=t("mvHQ"),a=t.n(s),l={components:{},data:function(){var e=this;return{user:{addUser:!1,placeholderUserName:"请输入用户名",placeholderUserPassword:"请输入用户密码",labelWidth:"120px",userName:"",passWord:"",checkPassWord:"",jurisdiction:"",user_menu_jurisdiction_set:null,level:[{value:1,label:"超级管理员"},{value:2,label:"亚普通管理员"},{value:3,label:"季普通管理员"}],leveldefault:2,ua:navigator.userAgent},filterText:"",formWidth:"50%",menudata:null,defaultProps:{children:"children",label:"label"},menuTreeData:{name:"menu_name",title:"menu_name",href:"menu_href",icon:"menu_icon",parentId:"cid",hrefP:"menu_href"},rules:{userName:[{required:!0,message:"请输入用户名"}],leveldefault:[{required:!0,message:"请选择级别"}],passWord:[{required:!0,validator:function(r,t,s){""===t?s(new Error("请输入密码")):(""!==e.user.checkPassWord&&e.$refs.ruleForm.validateField("checkPassWord"),s())}}],checkPassWord:[{required:!0,validator:function(r,t,s){""===t?s(new Error("请再次输入密码")):t!==e.user.passWord?s(new Error("两次输入密码不一致!")):s()}}]}}},created:function(){this.getMenuData()},methods:{saveUser:function(){var e=this;this.$axios({type:"$axios",obj:{url:e.api.createuser,method:"post",success:function(r){200==r.data.code?(e.user.addUser=!1,e.alertsu("添加用户成功！")):e.alerter(r.data.msg)},error:function(){e.user.addUser=!1,e.alerter("添加用户失败！")},data:e.user,header:{"x-csrf-token":e.getCatch(e,"csrfToken"),"content-type":"application/json; charset=utf-8"}}})},createUser:function(){this.user.addUser=!0},handleClose:function(){this.user.addUser=!1},submitUser:function(){var e=this;e.$refs.ruleForm.validate(function(r){if(!r)return!1;e.saveUser()})},getMenuData:function(){var e=this;e.$get({type:"$get",obj:{url:e.api.getmenu,success:function(r){if(200==r.status){e.alertsu("获取菜单数据成功！","获取菜单数据",2e3);var t=e.tree1(r.data,e.menuTreeData),s=e.data2treeDG(t[0],t[1],e.menuTreeData);e.menudata=s,console.log(e.menudata)}else e.alerter("获取菜单数据失败！","获取菜单数据",2e3)},error:function(){e.alerter("获取菜单数据失败！","获取菜单数据",2e3)}},param:{id:1}})},getJurisdiction:function(e,r,t){var s=this.$refs.treeid.getAllCheckedNodes(),l=this.$refs.treeid.getCheckedNodes();s.forEach(function(e){delete e.children});var o=this.tree1(s),u=this.data2treeDG(o[0],o[1]);this.user.jurisdiction=a()(u),this.user.user_menu_jurisdiction_set=a()(l)}}},o={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("br"),t("el-button",{attrs:{type:"primary"},on:{click:e.createUser}},[e._v("添加用户")]),t("br"),t("br"),e._v(" "),t("el-dialog",{attrs:{title:"提示",visible:e.user.addUser,width:this.$store.state.modalWidth,"before-close":e.handleClose},on:{"update:visible":function(r){e.$set(e.user,"addUser",r)}}},[t("el-form",{ref:"ruleForm",attrs:{"status-icon":"","label-position":this.$store.state.panelLayout,model:e.user,rules:e.rules}},[t("el-form-item",{attrs:{label:"用户名","label-width":e.user.labelWidth,prop:"userName"}},[t("el-input",{attrs:{placeholder:e.user.placeholderUserName},model:{value:e.user.userName,callback:function(r){e.$set(e.user,"userName",r)},expression:"user.userName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"密码","label-width":e.user.labelWidth,prop:"passWord"}},[t("el-input",{attrs:{type:"password",placeholder:e.user.placeholderUserPassword,"auto-complete":"off"},model:{value:e.user.passWord,callback:function(r){e.$set(e.user,"passWord",r)},expression:"user.passWord"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"再次密码","label-width":e.user.labelWidth,prop:"checkPassWord"}},[t("el-input",{attrs:{type:"password",placeholder:e.user.placeholderUserPassword,"auto-complete":"off"},model:{value:e.user.checkPassWord,callback:function(r){e.$set(e.user,"checkPassWord",r)},expression:"user.checkPassWord"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"选择级别码","label-width":e.user.labelWidth,prop:"leveldefault"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.user.leveldefault,callback:function(r){e.$set(e.user,"leveldefault",r)},expression:"user.leveldefault"}},e._l(e.user.level,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"添加权限","label-width":e.user.labelWidth,prop:"jurisdiction"}},[e.menudata?t("el-tree",{ref:"treeid",attrs:{"highlight-current":"",data:e.menudata,"default-expand-all":"","show-checkbox":"","node-key":"id",props:e.defaultProps},on:{"check-change":e.getJurisdiction}}):e._e()],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.submitUser}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]},u=t("VU/8")(l,o,!1,null,null,null);r.default=u.exports}});
//# sourceMappingURL=9.ff0b0c7319da640ab132.js.map