Ext.onReady(function(){
	Ext.QuickTips.init();
	var form  =new Ext.form.FormPanel({
		title:'Ext.form.field.Nuber示例',
		bodyStyle:'padding:5 5 5 5',//表单边距
		renderTo:'form',
		frame:true,
		height:150,
		width:250,
		defaultType:'numberfield',//设置表单字段的默认类型；
		defaults:{
			labelSeparator:':',//分隔符
			labelWidth:80,
			width:200,
			labelAlign:'left',//标签的对齐方式
			msgTarget:'side'//在字段的右边显示一个提示信息；
		},
		items:[{
			fieldLabel:'整数',
			hideTrigger:true,//隐藏微调按钮；
			allowDecimals:false,//不允许输入小数；
			nanText:'请输入有效的整数'//无效的数字提示
		},{
			fieldLabel:'小数',
			decimalPrecision:2,//精确到小数点后2位
			allowDecimals:true,//运行输入小数;
			nanText:'请输入有效的小数'
		},{
			fieldLabel:'数字限制',
			baseChars:'1234'//输入数字范围
		},{
			fieldLabel:'数值限制',
			maxValue:100,
			minValue:50
		}]
	});
	
});