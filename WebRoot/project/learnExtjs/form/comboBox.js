(function(){
	Ext.onReady(function(){
		Ext.regModel('PostInfo',{
			fields:[{
				name:'province'
			},{
				name:'post'
			}]
		});
		var postStore = Ext.create('Ext.data.Store',{
			model:'PostInfo',
			data:[{
				province:'北京',post:'100000'
			},{
				province:'通县',post:'100110'
			},{
				province:'昌平',post:'100220'
			},{
				province:'大兴',post:'100250'
			},{
				province:'密云',post:'100210'
			},{
				province:'延庆',post:'113000'
			},{
				province:'怀柔',post:'101400'
			}]
		});
		Ext.create('Ext.form.Panel',{
			title:'Ext.form.field.comboBox本地数据源显示',
			renderTo:Ext.getBody(),
			bodyPadding:5,
			frame:true,
			height:100,
			width:270,
			defaults:{
				labelSeparator:':',
				labelWidth:70,
				width:200,
				labelAlign:'left'
			},
			items:[{
				xtype:'combo',
				listConfig:{
					emptyText:'未找到匹配项',//当值不再列表的时候提示信息；
					maxHeight:'auto'//设置下拉列表的最大高度为60像素
				},
				name:'post',
				fieldLabel:'邮政编码',
				triggerAction:'all',//单击触发按钮显示全部数据
				store:postStore,//设置数据源；
				displayField:'province',
				valueField:'post',//定义值字段；
				queryMode:'local',
				forceSelection:true,
				typeAhead:true,
				value:'101400'
			}]
		});
	});
})();





























