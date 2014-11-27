/**
 * 引入命名空间EAI.form(自定义表单组件空间)
 */
Ext.namespace('EAI.form');

/**
 * 弹出式文本框;
 * 隐藏了内部结构,即不可直接访问其内嵌的文本框和按钮;
 * @config Function handlerFn -配置写入按钮的句柄;
 * @config {} textArea -提供外部对内置文本框进行配置;
 * @function getValue() -获取文本框的值;
 * @function setValue(value) -设置文本框的值;
 * @function setHandlerFn(fn,scope) -设置其写入按钮的句柄;
 * @class EAI.form.PopUpTextArea;
 * @notice 若需要更进一步修饰此组件,建议从新封装,以保持此组件的功能明确性和最大可复用性;
 * @extends Ext.Window;
 * @time 2011-01-26;
 * @author SAM;
 */
EAI.form.PopUpTextArea = Ext.extend(Ext.Window,{
	handlerFn : Ext.emptyFn(),
	constructor : function(cfg){
		var ME = this;
		
		var textArea = new Ext.form.TextArea(Ext.applyIf({
			id : cfg.id + '_textArea'
		},cfg.textArea));
		
		var okBtn = new Ext.Button({
			text : '写入',
			iconCls : 'icons_accept'
		});
		
		this.getValue = function(){
			return textArea.getValue();
		}
		
		this.setValue = function(value){
			textArea.setValue(Ext.isEmpty(value)? '' : value);
		}
		
		this.setHandlerFn = function(fn,scope){
			if(fn instanceof Function){
				this.handlerFn = fn;
				okBtn.setHandler(this.handlerFn,scope);
			}
		}
		
		var config = Ext.apply({
			layout:'fit',
	 		border : false,
			width : 400,
			height : 350,
			closeAction : 'hide',
			draggable : true,
			modal : false,
			maximizable : true,
			frame : true,
			items : [textArea],
			bbar : ['-',okBtn,'-',{
				text : '取消',
				iconCls : 'icons_delete',
				handler : function(){
					//ME.close();
					ME.hide();
				}
			},'-']
		},cfg);
		EAI.form.PopUpTextArea.superclass.constructor.call(this,config);
	},
	afterRender : function(){
		EAI.form.PopUpTextArea.superclass.afterRender.call(this);
		this.setHandlerFn(this.handlerFn,this);
	},
	show : function(animateTarget, cb, scope){
		EAI.form.PopUpTextArea.superclass.show.call(this,animateTarget, cb, scope);
		this.center();
	}
});