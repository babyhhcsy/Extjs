/**
 * 引入命名空间EAI.form(自定义表单组件空间)
 */
Ext.namespace('EAI.form');

/**
 * 图片显示组件; 未完成; 
 * 计划设计功能:
 *    1.自动/手动缩放;
 *    2.可动态改变图片;
 * @class EAI.form.ImageWin;
 * @extends Ext.Window;
 */
EAI.form.ImageWin = Ext.extend(Ext.Window,{
	imageCt : null,
	src : '', // 图片的初始src; 可以是请求;
	zoomStepW : 130,
	zoomStepH : 90,
	zoomIndex : 5, // 向上下缩放3次;
	constructor : function(cfg){	
		this.src = cfg.src;
		
		this.imageCt = new Ext.BoxComponent({ // img;
			id : cfg.id + '_imageCt',
			style : "align:'center';",
			autoEl: {
		        tag: 'img',
		        src: this.src
		    }
		});
		
		var config = Ext.apply({
				title : '预览图片',
		 		border : false,
				width : 650,
				layout : 'fit',
				height : 450,
				closeAction : 'close',
				draggable : true,
				modal : false,
				maximizable : true,
				frame : true,
				items:[this.imageCt]
		},cfg);
		EAI.form.ImageWin.superclass.constructor.call(this,config);
	},
	showImage : function(){ // 实现对图片大小相对于容器window大小的最优化; 未被实现;
		this.show();
	},
	zoomFn : function(){ // 实现对图片基于window,和zoomIndex进行放缩;放缩按钮是入口;
		if(this.zoomIndex >= 8 || this.zoomIndex <=2){ // 放缩边界;
			return ;
		}
		var box = this.getBox(true);
		var left = box.left;
		var top = box.top;
		var width = box.width;
		var height = box.height;
		var centreL = left + width/2;
		var centreT = top + height/2;
	}
});