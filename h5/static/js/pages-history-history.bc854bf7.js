(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-history-history"],{"0850":function(e,t,a){"use strict";a.r(t);var i=a("46da"),o=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=o.a},"223b":function(e,t,a){var i=a("49dc");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=a("4f06").default;o("73ba6a1e",i,!0,{sourceMap:!1,shadowMode:!1})},"3cf3":function(e,t,a){"use strict";var i=a("223b"),o=a.n(i);o.a},"46da":function(e,t,a){"use strict";(function(e){var i=a("4ea4");a("99af"),a("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var o,r=i(a("1da1")),n=i(a("ade3")),u=i(a("49bf")),s=[["camera"],["album"],["camera","album"]],c=[["compressed"],["original"],["compressed","original"]],d={data:function(){var e;return e={title:"choose/previewImage",image:"",resimage:"",imageList:[]},(0,n.default)(e,"imageList",[]),(0,n.default)(e,"sourceTypeIndex",2),(0,n.default)(e,"sourceType",["拍照","相册","拍照或相册"]),(0,n.default)(e,"sizeTypeIndex",2),(0,n.default)(e,"sizeType",["压缩","原图","压缩或原图"]),(0,n.default)(e,"countIndex",0),(0,n.default)(e,"count",[1,2,3,4,5,6,7,8,9]),(0,n.default)(e,"percent",0),e},onLoad:function(){o=this},onUnload:function(){this.imageList=[],this.sourceTypeIndex=2,this.sourceType=["拍照","相册","拍照或相册"],this.sizeTypeIndex=2,this.sizeType=["压缩","原图","压缩或原图"],this.countIndex=0},methods:{sourceTypeChange:function(e){this.sourceTypeIndex=parseInt(e.detail.value)},sizeTypeChange:function(e){this.sizeTypeIndex=parseInt(e.detail.value)},countChange:function(e){this.countIndex=e.detail.value},chooseImage:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:uni.chooseImage({sourceType:s[this.sourceTypeIndex],sizeType:c[this.sizeTypeIndex],count:1,success:function(t){e("log",t.tempFilePaths," at pages/history/history.vue:77"),a.image=t.tempFilePaths[0],a.imageList=a.imageList.concat(t.tempFilePaths),e("log","this.image: "+a.image," at pages/history/history.vue:80")},fail:function(e){}});case 1:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}(),clear:function(e){this.image=""},previewImage:function(e){var t=e.target.dataset.src;uni.previewImage({current:t,urls:this.imageList})},post:function(){var t=this.image;e("log","----------------图片信息-----------------"," at pages/history/history.vue:148"),e("log",t," at pages/history/history.vue:149");var a=uni.uploadFile({url:"#",filePath:t,name:"file",formData:{user:"test"},success:function(t){e("log","----------------上传信息-----------------"," at pages/history/history.vue:164"),e("log",t," at pages/history/history.vue:165")}});a.onProgressUpdate((function(t){o.percent=t.progress,e("log","----------------上传进度-----------------"," at pages/history/history.vue:172"),e("log","上传进度:"+t.progress," at pages/history/history.vue:173"),e("log","已经上传的数据长度:"+t.totalBytesSent," at pages/history/history.vue:174"),e("log","预期需要上传的数据总长度:"+t.totalBytesExpectedToSend," at pages/history/history.vue:175")}))},checkPermission:function(e){var t=this;return(0,r.default)(regeneratorRuntime.mark((function a(){var i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=e?e-1:t.sourceTypeIndex,!u.default.isIOS){a.next=7;break}return a.next=4,u.default.requestIOS(s[i][0]);case 4:a.t0=a.sent,a.next=10;break;case 7:return a.next=9,u.default.requestAndroid(0===i?"android.permission.CAMERA":"android.permission.READ_EXTERNAL_STORAGE");case 9:a.t0=a.sent;case 10:o=a.t0,null===o||1===o?o=1:uni.showModal({content:"没有开启权限",confirmText:"设置",success:function(e){e.confirm&&u.default.gotoAppSetting()}});case 12:case"end":return a.stop()}}),a)})))()}}};t.default=d}).call(this,a("0de9")["log"])},"49dc":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'.button[data-v-4a661757]{margin-top:%?30?%;margin-bottom:%?30?%;background-color:#007aff;color:#fff}.plain[data-v-4a661757]{margin-top:%?30?%;margin-bottom:%?30?%;background-color:#fff;border:1px solid #007aff;color:#007aff}.plain-hover[data-v-4a661757]{margin-top:%?30?%;margin-bottom:%?30?%;background-color:#fff;border:1px solid #999;color:#999}.button-hover[data-v-4a661757]{margin-top:%?30?%;margin-bottom:%?30?%;background-color:#999;color:#fff}.button-sp-area[data-v-4a661757]{margin:0 auto;width:%?400?%}\n\n/* 上传 */.uni-uploader[data-v-4a661757]{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-uploader-head[data-v-4a661757]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-uploader-title[data-v-4a661757]{color:#5af;font-size:%?38?%;margin:%?20?%}.uni-uploader-info[data-v-4a661757]{color:#b2b2b2}.uni-uploader-body[data-v-4a661757]{height:%?488?%;margin:30px}.uni-uploader__files[data-v-4a661757]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-flex-wrap:wrap;flex-wrap:wrap}.uni-uploader__file[data-v-4a661757]{width:%?600?%;height:%?450?%}.uni-uploader__img[data-v-4a661757]{display:block;width:%?600?%;height:%?450?%;-webkit-border-radius:%?10?%;border-radius:%?10?%}.uni-uploader__input-box[data-v-4a661757]{position:relative;margin:%?10?%;width:%?592?%;height:%?442?%;border:%?4?% solid #5af;-webkit-border-radius:%?10?%;border-radius:%?10?%}.uni-uploader__input-box[data-v-4a661757]:before,\n.uni-uploader__input-box[data-v-4a661757]:after{content:" ";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#5af}.uni-uploader__input-box[data-v-4a661757]:before{width:%?4?%;height:%?79?%}.uni-uploader__input-box[data-v-4a661757]:after{width:%?79?%;height:%?4?%}.uni-uploader__input-box[data-v-4a661757]:active{border-color:#999}.uni-uploader__input-box[data-v-4a661757]:active:before,\n.uni-uploader__input-box[data-v-4a661757]:active:after{background-color:#999}.uni-uploader__input[data-v-4a661757]{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0}',""]),e.exports=t},ae81:function(e,t,a){"use strict";a.r(t);var i=a("f0b7"),o=a("0850");for(var r in o)"default"!==r&&function(e){a.d(t,e,(function(){return o[e]}))}(r);a("3cf3");var n,u=a("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"4a661757",null,!1,i["a"],n);t["default"]=s.exports},f0b7:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"content"})],1)},r=[]}}]);