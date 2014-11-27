/**
 * @description -文件上传组件;
 */
 
 /**
 * 引入EAI.util命名空间;
 */
Ext.namespace('EAI.util');

/**
 * 含单个文件上传浏览框的面板;
 * @class EAI.util.FilePanel;
 * @extends Ext.Panel;
 * @time 2011-01-20;
 */
EAI.util.FilePanel = Ext.extend(Ext.Panel,{
	label : null, // 标签;
	fileText : null, // 文件浏览框;
	idSuffix : null, // id后缀;
	constructor : function(cfg) {
		this.idSuffix = cfg.idSuffix;
		
		this.label = new Ext.form.Label({
				id : 'label' + '_'+ cfg.idSuffix,
				width : 55,
				text : '　'
		});
		
		this.fileText = new Ext.form.TextField({
				id : 'fileText' + '_' + cfg.idSuffix,
				hideLabel : true,
				inputType : 'file',
				allowBlank : false,
				autoCreate : {tag: 'input', type: 'text', size: '40', autocomplete: 'off'},
				blankText : '请选择上传文件,或者删除'
			});
			
		var config = Ext.apply({
			layout : 'column',
				frame : true,
				id : 'filePanel' + '_'+ cfg.idSuffix,
				border : false,
				items : [{
						layout : 'form',
						width : 55,
						items : [this.label]
					},{
						layout : 'form',
						width : 320,
						items : [this.fileText]
					}]
		},cfg);
		EAI.util.FilePanel.superclass.constructor.call(this,config);
	}
});

/**
 * 文件上传组件类;
 * 是一个Window内盛装多个file组件,构成的一个复合组件;
 * @param  fileNamePrefix -用于收集数据时,生成文件刘浏览框的键,缺省为'file';eg: 'image',
 * 			若需上传2个文件,将生函成2对key-value的对象{image1 : 值1,image2 : 值2};
 * @param singleFile -是否限制为单一文件上传组件,缺省为false,表非单一文件上传组件;
 * @param elSubject -设置该组件标题等相关主题信息;
 * @param handlerFn -设置组件确定按钮的单机事件句柄;
 * @function {}/String getValues(backString) -获取该组件的数据;
 * @function void setValues(list) -设置该组件的数据;;
 * @function void setHandlerFn -设置组件确定按钮的单机事件句柄;;
 * @class EAI.util.FileUpLoad;
 * @extends Ext.Window;
 * @time 2011-01-20;
 * @author SAM;
 */
EAI.util.FileUpLoad = Ext.extend(Ext.Window,{
	formPanel : null, // 表单;
	idSum : 1, // id自增计算器;
	fileMax : 10, // 文件浏览组件最带数目; 
	elSubject : null, // 组件主题(用于设置内部标签,eg: '图片'|'文件');
	fileNamePrefix : null, // 用于收集数据时,生成文件刘浏览框的键;
	fileList : new EAI.List(),
	singleFile : false, // 是否是单一文件上传;
	addFile : null, // 添加文件浏览框按钮;
	maxSize : 50,
	//handlerFn : Ext.emptyFn, // 组件的确定按钮的单击事件句柄;
	backId : null,
	constructor : function(cfg) {
		var ME = this;
		if(cfg.maxSize){
			ME.maxSize = cfg.maxSize;
		}
		//this.backId=cfg.backId;
		this.elSubject = cfg.elSubject? cfg.elSubject : '图片';
		this.singleFile = cfg.singleFile? true : false;
		this.fileNamePrefix = cfg.fileNamePrefix? cfg.fileNamePrefix : 'file';
		
		this.addFile = new Ext.Button({
			text : '添加上传',
			iconCls : 'icons_add'
		});
		this.formPanel = new Ext.form.FormPanel({
				id : cfg.id + '',
				layout : 'form',
				frame : true,
				width : 485,
				height : 250,
				fileUpload : true,
				autoScroll : true,
				items : [],
				tbar : ['-',this.addFile, '(单个最大允许上传'+ME.maxSize+'M)']
			});
		this.uploadBtn = new Ext.Button({
					text : '上传',
					iconCls : 'icons_upload'/*,
					handler:function(){
						
					}*/
		});
		var config = Ext.apply({
			title : this.elSubject + '上传',
			width : 500,
			layout : 'fit',
			frame : true,
			resizable : false,
			closeAction : 'close',
			height : 250,
			items : [this.formPanel],
			bbar : ['-',this.uploadBtn,
				'-',{
					text : '关闭',
					iconCls : 'icons_cancel',
					handler : function(){
						ME.close();
					}
				},'-']
		},cfg);
		EAI.util.FileUpLoad.superclass.constructor.call(this,config);
	},
	afterRender : function() {
		EAI.util.FileUpLoad.superclass.afterRender.call(this);
		if(!this.singleFile){
			this.addFile.on('click',this.addFileEl,this);
		}
		//this.uploadBtn.on('click',this.uploadBack,this);
		this.addFileEl();
	},/*uploadBack : function(){
		var ME=this;
		this.formPanel.getForm().submit({
							url :'/EAI/uploadFile',
							method : 'post',
							timeout : 60000,
							success : function(form,action){
								alert(action.result.path);
								if(action.result.path!=""){
									alert(ME.backId);
									ME.returnValue=action.result.path;
									Ext.getCmp(ME.backId).setValue(ME.returnValue);
								}
								ME.hide();
							},
							failure : function(from,action){
								window.parent.msgWindow('上传失败');
							}
						})
	},*/addFileEl : function(){
		var ME = this;
		if(this.fileList.size()+1 > this.fileMax){
			//self.parent.msgWindow(this.elSubject+'数量不超过:'+this.fileMax);
			alert(this.elSubject+'数量不超过:'+this.fileMax);  //there
			return ;
		}
		
		var fileEl = new EAI.util.FilePanel({
			fileUpload : true,
			idSuffix : this.idSum
		});
		
		if(this.fileList.size() + 1 > 1){
			fileEl.add({/*
					xtype : 'button',
					text : '删除',
					iconCls : 'icons_delete',
					handler : function() {
						ME.fileList.removeByValue(this.ownerCt.idSuffix);
						ME.formPanel.remove(this.ownerCt);
						ME.setFieldLabel();
					}
				*/});
		}
		this.fileList.add(this.idSum);
		this.formPanel.add(fileEl);
		this.setFieldLabel();
		this.formPanel.doLayout();
		this.idSum++;
	},
	setFieldLabel : function(){
		for(var i=0; i<this.fileList.size(); i++){
			Ext.getCmp('label_'+this.fileList.get(i)).setText(this.elSubject/* + (i+1)*/);
		}
	},
	/**
	 * 获取该组件的数据;
	 * @param boolean backString -是否返回Json数据串;(缺省false,表示返回Object数组);
	 * @return {}/String;
	 */
	getValues : function(backString){
		var data = {};
		for(var i=0; i<this.fileList.size(); i++){
			var name = this.fileNamePrefix+(i+1);
			var file = Ext.getCmp('fileText_'+this.fileList.get(i)).getValue();
			file = file.replace(/\\/g,'\\\\');
			eval("var obj = {"+name+" : '"+file+"'}");
			Ext.apply(data,obj);
			
		}
		if(backString){
			return Ext.encode(data);
		}
		return data;
	},
	/**
	 * 设置该组件的数据;
	 * @param EAI.List list -给该组件个文件上传框赋值的list,会根据list中元素的顺序依次赋值;
	 */
	setValues : function(list){ // 此方法不支持;
		for(var i=0; i<list.size(); i++){
			var file = Ext.getCmp('fileText_'+this.fileList.get(i));
			if(Ext.isEmpty(file)){
				this.addFileEl();
				file = Ext.getCmp('fileText_'+this.fileList.get(i));
			}
			file.setValue(list.get(i)); // 目前浏览器不允许给file浏览框赋值;
		}
	}
	/**
	 * 设置组件确定按钮的单机事件句柄;
	 * Function fn -组件确定按钮的单机事件句柄;
	 * Object scope -指定fn中this所代表的对象;
	 */
	/*setHandlerFn : function(fn,scope){
		this.handlerFn = fn;
		this.uploadBtn.setHandler(fn,scope);
	}*/
//	setHandlerFn : function(){
//		this.formPanel.getForm().submit({
//							url : '/EAI/uploadFile',
//							method : 'post',
//							timeout : 60000,
//							success : function(response,options){
//								//alert(response.responseText);
//								//var path=Ext.decode(response.responseText);
//								/*if(path!=null&&path!=''){
//									Ext.getCmp(ME.backId).setValue(path);
//								}*/
//								ME.hide();
//							},
//							failure : function(response,options){
//								window.parent.msgWindow('上传失败');
//							}
//						});
//	
//	}
});

function start(cfg){ // 测试方法;
	var fileUpload = new EAI.util.FileUpLoad(cfg);
	fileUpload.show();
	var list = new EAI.List();
	/*
	 * 不能为file浏览框赋值;
	 */
//	list.add('sam1');
//	list.add('sam2');
//	list.add('sam3');
//	fileUpload.setValues(list);
//	var aaa = 'c:\\dddd\\bbb\\a.jsp';
//	var bbb = aaa.replace('\\','=');
	
	//var dd = fileUpload.getValues(true);
	/*fileUpload.setHandlerFn(function(){
		fileUpload.uploadBtn.({
			url : '/EAI/uploadFile',
			method : 'post',
			//params : fileUpload.getValues(),
			//enctype : "multipart/form-data",
			timeout : 60000,
			success : function(response,options){
			},
			failure : function(response,options){
			}
		});
	});*/
	var cc = "";
}