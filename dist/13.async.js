(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"1szy":function(e,t,a){e.exports={tableList:"antd-pro-pages-mall-floor-index-tableList",tableListOperator:"antd-pro-pages-mall-floor-index-tableListOperator",tableListForm:"antd-pro-pages-mall-floor-index-tableListForm",submitButtons:"antd-pro-pages-mall-floor-index-submitButtons"}},"8HFv":function(e,t,a){"use strict";var l=a("TqRt"),n=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("bbsP");var r=l(a("/wGt"));a("5NDa");var o=l(a("5rEg"));a("IzEo");var i=l(a("bx4M"));a("+L6B");var u=l(a("2/Rp"));a("miYZ");var d=l(a("tsqr")),s=l(a("o0o1")),c=l(a("yXPU"));a("/zsF");var f=l(a("PArb")),p=l(a("lwsE")),m=l(a("W8MJ")),h=l(a("a1gu")),b=l(a("Nsbk")),v=l(a("7W2i"));a("2qtc");var y,g,k=l(a("kLXV")),w=n(a("q1tI")),x=a("MuoO"),E=l(a("CkN6")),C=l(a("zHco")),L=l(a("1szy")),V=k.default.confirm,O=(y=(0,x.connect)(function(e){var t=e.floor,a=e.loading;return{floor:t,loading:a.models.floor}}),y(g=function(e){function t(){var e,a;(0,p.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,h.default)(this,(e=(0,b.default)(t)).call.apply(e,[this].concat(n))),a.state={inputValue:"",drawerVisible:!1,modalType:"",currentId:""},a.columns=[{title:"\u697c\u5c42\u540d\u79f0",dataIndex:"name"},{title:"\u64cd\u4f5c",render:function(e,t){return w.default.createElement("div",null,w.default.createElement("a",{onClick:function(){return a.handleEdit(t)}},"\u7f16\u8f91"),w.default.createElement(f.default,{type:"vertical"}),w.default.createElement("a",{onClick:function(){return a.handleDelete(t)}},"\u5220\u9664"))}}],a.getList=function(){var e=a.props.dispatch;e({type:"floor/fetchFloor"})},a.handleEdit=function(e){var t=e.id,l=e.name;a.setState({currentId:t,inputValue:l,modalType:"edit"},function(){a.setState({drawerVisible:!0})})},a.handleDelete=function(e){var t=e.id,l=e.name,n=a.props.dispatch;V({title:"\u786e\u5b9a\u8981\u5220\u9664\u697c\u5c42 '".concat(l,"'\u5417?"),onOk:function(){var e=(0,c.default)(s.default.mark(function e(){return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n({type:"floor/floorDelete",payload:{id:t}});case 2:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}()})},a.handleCreate=function(){a.setState({modalType:"create"},function(){a.setState({drawerVisible:!0})})},a.handleClose=function(){a.setState({drawerVisible:!1,inputValue:""})},a.handleChange=function(e){a.setState({inputValue:e.target.value})},a.handleOk=(0,c.default)(s.default.mark(function e(){var t,l,n,r,o;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=a.props.dispatch,l=a.state,n=l.modalType,r=l.inputValue,o=l.currentId,r){e.next=5;break}return d.default.error("\u8bf7\u8f93\u5165\u697c\u5c42\u540d\u79f0"),e.abrupt("return",!1);case 5:if("create"!==n){e.next=9;break}return e.next=8,t({type:"floor/floorCreate",payload:{name:r}});case 8:d.default.success("\u521b\u5efa\u6210\u529f");case 9:if("edit"!==n){e.next=13;break}return e.next=12,t({type:"floor/floorUpdate",payload:{name:r,id:o}});case 12:d.default.success("\u4fee\u6539\u6210\u529f");case 13:return a.handleClose(),e.abrupt("return",void 0);case 15:case"end":return e.stop()}},e,this)})),a}return(0,v.default)(t,e),(0,m.default)(t,[{key:"componentDidMount",value:function(){this.getList()}},{key:"render",value:function(){var e=this.props,t=e.floor.floorList,a=e.loading,l=this.state,n=l.drawerVisible,d=l.modalType,s=l.inputValue;return w.default.createElement(C.default,{title:"\u697c\u5c42"},w.default.createElement(i.default,{bordered:!1},w.default.createElement("div",{className:L.default.tableListOperator},w.default.createElement(u.default,{icon:"plus",type:"primary",onClick:this.handleCreate},"\u65b0\u5efa")),w.default.createElement("div",{className:L.default.tableList},w.default.createElement(E.default,{loading:a,data:{list:t},rowKey:function(e){return e.id},columns:this.columns}))),w.default.createElement(r.default,{visible:n,title:"create"===d?"\u6dfb\u52a0\u697c\u5c42":"\u4fee\u6539\u697c\u5c42",onClose:this.handleClose},w.default.createElement("div",null,w.default.createElement("span",{style:{display:"block",lineHeight:"35px"}},"\u697c\u5c42\u540d\u79f0\uff1a"),w.default.createElement(o.default,{onChange:this.handleChange,value:s,type:"text",placeholder:"\u8bf7\u8f93\u5165\u697c\u5c42\u540d\u79f0"})),w.default.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},w.default.createElement(u.default,{onClick:this.handleOk,type:"primary"},"\u786e\u5b9a"),w.default.createElement(u.default,{style:{marginLeft:"8px"},onClick:this.handleClose},"\u53d6\u6d88"))))}}]),t}(w.PureComponent))||g),T=O;t.default=T}}]);