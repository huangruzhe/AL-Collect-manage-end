(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"4Ofr":function(e,t,a){e.exports={themeColor:"antd-pro-components-setting-drawer-theme-color-themeColor",title:"antd-pro-components-setting-drawer-theme-color-title",colorBlock:"antd-pro-components-setting-drawer-theme-color-colorBlock"}},BFsb:function(e,t,a){e.exports={content:"antd-pro-components-setting-drawer-index-content",blockChecbox:"antd-pro-components-setting-drawer-index-blockChecbox",item:"antd-pro-components-setting-drawer-index-item",selectIcon:"antd-pro-components-setting-drawer-index-selectIcon",color_block:"antd-pro-components-setting-drawer-index-color_block",title:"antd-pro-components-setting-drawer-index-title",handle:"antd-pro-components-setting-drawer-index-handle",productionHint:"antd-pro-components-setting-drawer-index-productionHint"}},PceP:function(e,t,a){"use strict";var n=a("TqRt"),l=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("bbsP");var o=n(a("/wGt"));a("fOrg");var r=n(a("+KLJ"));a("+L6B");var i=n(a("2/Rp"));a("miYZ");var d=n(a("tsqr"));a("/zsF");var s=n(a("PArb"));a("Pwec");var c=n(a("CtXQ"));a("5Dmo");var u=n(a("3S7+"));a("Mwp2");var f=n(a("VXEj"));a("BoS7");var m=n(a("Sdc0")),p=n(a("lwsE")),g=n(a("W8MJ")),h=n(a("a1gu")),y=n(a("Nsbk")),v=n(a("7W2i")),k=n(a("MVZn"));a("OaEy");var E,b,w=n(a("2fM7")),C=l(a("q1tI")),M=a("LLXN"),S=a("P5Jw"),x=a("MuoO"),N=n(a("BGR+")),P=n(a("BFsb")),j=n(a("WJM/")),F=n(a("Pjk0")),I=w.default.Option,L=function(e){var t=e.children,a=e.title,n=e.style;return C.default.createElement("div",{style:(0,k.default)({},n,{marginBottom:24})},C.default.createElement("h3",{className:P.default.title},a),t)},z=(E=(0,x.connect)(function(e){var t=e.setting;return{setting:t}}),E(b=function(e){function t(){var e,a;(0,p.default)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return a=(0,h.default)(this,(e=(0,y.default)(t)).call.apply(e,[this].concat(l))),a.state={collapse:!1},a.getLayoutSetting=function(){var e=a.props.setting,t=e.contentWidth,n=e.fixedHeader,l=e.layout,o=e.autoHideHeader,r=e.fixSiderbar;return[{title:(0,M.formatMessage)({id:"app.setting.content-width"}),action:C.default.createElement(w.default,{value:t,size:"small",onSelect:function(e){return a.changeSetting("contentWidth",e)},style:{width:80}},"sidemenu"===l?null:C.default.createElement(I,{value:"Fixed"},(0,M.formatMessage)({id:"app.setting.content-width.fixed"})),C.default.createElement(I,{value:"Fluid"},(0,M.formatMessage)({id:"app.setting.content-width.fluid"})))},{title:(0,M.formatMessage)({id:"app.setting.fixedheader"}),action:C.default.createElement(m.default,{size:"small",checked:!!n,onChange:function(e){return a.changeSetting("fixedHeader",e)}})},{title:(0,M.formatMessage)({id:"app.setting.hideheader"}),disabled:!n,disabledReason:(0,M.formatMessage)({id:"app.setting.hideheader.hint"}),action:C.default.createElement(m.default,{size:"small",checked:!!o,onChange:function(e){return a.changeSetting("autoHideHeader",e)}})},{title:(0,M.formatMessage)({id:"app.setting.fixedsidebar"}),disabled:"topmenu"===l,disabledReason:(0,M.formatMessage)({id:"app.setting.fixedsidebar.hint"}),action:C.default.createElement(m.default,{size:"small",checked:!!r,onChange:function(e){return a.changeSetting("fixSiderbar",e)}})}]},a.changeSetting=function(e,t){var n=a.props.setting,l=(0,k.default)({},n);l[e]=t,"layout"===e?l.contentWidth="topmenu"===t?"Fixed":"Fluid":"fixedHeader"!==e||t||(l.autoHideHeader=!1),a.setState(l,function(){var e=a.props.dispatch;e({type:"setting/changeSetting",payload:a.state})})},a.togglerContent=function(){var e=a.state.collapse;a.setState({collapse:!e})},a.renderLayoutSettingItem=function(e){var t=C.default.cloneElement(e.action,{disabled:e.disabled});return C.default.createElement(u.default,{title:e.disabled?e.disabledReason:"",placement:"left"},C.default.createElement(f.default.Item,{actions:[t]},C.default.createElement("span",{style:{opacity:e.disabled?"0.5":""}},e.title)))},a}return(0,v.default)(t,e),(0,g.default)(t,[{key:"render",value:function(){var e=this,t=this.props.setting,a=t.navTheme,n=t.primaryColor,l=t.layout,u=t.colorWeak,p=this.state.collapse;return C.default.createElement(o.default,{visible:p,width:300,onClose:this.togglerContent,placement:"right",handler:C.default.createElement("div",{className:P.default.handle},C.default.createElement(c.default,{type:p?"close":"setting",style:{color:"#fff",fontSize:20}})),onHandleClick:this.togglerContent,style:{zIndex:999}},C.default.createElement("div",{className:P.default.content},C.default.createElement(L,{title:(0,M.formatMessage)({id:"app.setting.pagestyle"})},C.default.createElement(F.default,{list:[{key:"dark",url:"https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg",title:(0,M.formatMessage)({id:"app.setting.pagestyle.dark"})},{key:"light",url:"https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg",title:(0,M.formatMessage)({id:"app.setting.pagestyle.light"})}],value:a,onChange:function(t){return e.changeSetting("navTheme",t)}})),C.default.createElement(j.default,{title:(0,M.formatMessage)({id:"app.setting.themecolor"}),value:n,onChange:function(t){return e.changeSetting("primaryColor",t)}}),C.default.createElement(s.default,null),C.default.createElement(L,{title:(0,M.formatMessage)({id:"app.setting.navigationmode"})},C.default.createElement(F.default,{list:[{key:"sidemenu",url:"https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg",title:(0,M.formatMessage)({id:"app.setting.sidemenu"})},{key:"topmenu",url:"https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg",title:(0,M.formatMessage)({id:"app.setting.topmenu"})}],value:l,onChange:function(t){return e.changeSetting("layout",t)}})),C.default.createElement(f.default,{split:!1,dataSource:this.getLayoutSetting(),renderItem:this.renderLayoutSettingItem}),C.default.createElement(s.default,null),C.default.createElement(L,{title:(0,M.formatMessage)({id:"app.setting.othersettings"})},C.default.createElement(f.default.Item,{actions:[C.default.createElement(m.default,{size:"small",checked:!!u,onChange:function(t){return e.changeSetting("colorWeak",t)}})]},(0,M.formatMessage)({id:"app.setting.weakmode"}))),C.default.createElement(s.default,null),C.default.createElement(S.CopyToClipboard,{text:JSON.stringify((0,N.default)(t,["colorWeak"]),null,2),onCopy:function(){return d.default.success((0,M.formatMessage)({id:"app.setting.copyinfo"}))}},C.default.createElement(i.default,{block:!0,icon:"copy"},(0,M.formatMessage)({id:"app.setting.copy"}))),C.default.createElement(r.default,{type:"warning",className:P.default.productionHint,message:C.default.createElement("div",null,(0,M.formatMessage)({id:"app.setting.production.hint"})," ",C.default.createElement("a",{href:"https://u.ant.design/pro-v2-default-settings",target:"_blank",rel:"noopener noreferrer"},"src/defaultSettings.js"))})))}}]),t}(C.PureComponent))||b),B=z;t.default=B},Pjk0:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5Dmo");var l=n(a("3S7+"));a("Pwec");var o=n(a("CtXQ")),r=n(a("q1tI")),i=n(a("BFsb")),d=function(e){var t=e.value,a=e.onChange,n=e.list;return r.default.createElement("div",{className:i.default.blockChecbox,key:t},n.map(function(e){return r.default.createElement(l.default,{title:e.title,key:e.key},r.default.createElement("div",{className:i.default.item,onClick:function(){return a(e.key)}},r.default.createElement("img",{src:e.url,alt:e.key}),r.default.createElement("div",{className:i.default.selectIcon,style:{display:t===e.key?"block":"none"}},r.default.createElement(o.default,{type:"check"}))))}))},s=d;t.default=s},"WJM/":function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5Dmo");var l=n(a("3S7+")),o=n(a("pVnL"));a("Pwec");var r=n(a("CtXQ")),i=n(a("QILm")),d=n(a("q1tI")),s=a("LLXN"),c=n(a("4Ofr")),u=function(e){var t=e.color,a=e.check,n=(0,i.default)(e,["color","check"]);return d.default.createElement("div",(0,o.default)({},n,{style:{backgroundColor:t}}),a?d.default.createElement(r.default,{type:"check"}):"")},f=function(e){var t=e.colors,a=e.title,n=e.value,o=e.onChange,r=t;return t||(r=[{key:"dust",color:"#F5222D"},{key:"volcano",color:"#FA541C"},{key:"sunset",color:"#FAAD14"},{key:"cyan",color:"#13C2C2"},{key:"green",color:"#52C41A"},{key:"daybreak",color:"#1890FF"},{key:"geekblue",color:"#2F54EB"},{key:"purple",color:"#722ED1"}]),d.default.createElement("div",{className:c.default.themeColor},d.default.createElement("h3",{className:c.default.title},a),d.default.createElement("div",{className:c.default.content},r.map(function(e){var t=e.key,a=e.color;return d.default.createElement(l.default,{key:a,title:(0,s.formatMessage)({id:"app.setting.themecolor.".concat(t)})},d.default.createElement(u,{className:c.default.colorBlock,color:a,check:n===a,onClick:function(){return o&&o(a)}}))})))},m=f;t.default=m}}]);