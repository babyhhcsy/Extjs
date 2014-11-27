/**
 * 引入命名空间
 */
Ext.namespace('EAI');

/**
 * @description -可以禁止输入的TriggerField;(侧重修补了Ext.form.TriggerField的disable属性导致不能copy,而且不能禁止TriggerClick事件,
 * 以及不能限定输入长度bug);
 * @target -便利于实例化此功能的组件和定义此功能的类;
 * @class EAI.DisableTriggerField
 * @extends Ext.form.TriggerField
 * @param String disableTrigger -设置实例化组件是否开启组件禁用;
 * @param int maxLength -设置组件可以输入的最大长度;
 * @function setDisableTrigger -设置组件是否禁用,外部可调用此方法完成组件的"禁用"和"消禁";
 * @notice -maxLength不是Ext默认的值,而是默认200;
 * @time 20101217
 * @author SAM
 */
EAI.DisableTriggerField = Ext.extend(Ext.form.TriggerField,{
 	constructor : function(cfg) {
		var ME = this; // ME代指DisableTriggerField类的对象

		var config = Ext.apply({
			triggerClass : 'x-form-search-trigger',
			maxLength : '200' // TriggerField默认的最大长度1.7E+308,不能满足我们限定输入长度
		},cfg);
		
		EAI.DisableTriggerField.superclass.constructor.call(this,config);
		
		this.onTriggerClick = function() {
			if(this.disableTrigger){ // 实现对onTriggerClick事件的屏蔽与否;
				return ;
			}
			cfg.onTriggerClick();
		};
	},
	afterRender : function() {
		EAI.DisableTriggerField.superclass.afterRender.call(this);
		this.disableTriggerFn();
		if(this.maxLength && !isNaN(this.maxLength)){
			this.el.dom.maxLength = Math.round(this.maxLength) * 1;
		}
	},
	setDisableTrigger : function(bool){ // 设置组件是否禁用,外部可调用此方法完成组件的"禁用"和"消禁";
		this.disableTrigger = (bool == true) ? true : false;
		this.disableTriggerFn();
	},
	disableTriggerFn : function(){ // 禁用/消禁实现
		if(this.disableTrigger){
			this.el.dom.readOnly = true;
			this.el.dom.style.border = 'solid gray 1px';
			this.el.dom.style.color = 'gray';
		}else {
			this.el.dom.readOnly = this.readOnly;
			this.el.dom.style.border = 'solid #B5B8C8 1px';
			this.el.dom.style.color = '#000000';
		}
	}
});
