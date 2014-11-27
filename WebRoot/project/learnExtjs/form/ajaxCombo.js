(function(){
	Ext.onReady(function(){
		Ext.regModel('BookInfo',{
			fields:[{
				name:'bookName'
			}]			
		});		
		var bookStore = Ext.create('Ext.data.Store',{
			model:'BookInfo',
			proxy:{
				type:'ajax',
				url:'./learnExtjs/dataJSp/bookSearchServer.jsp',
				reader:new Ext.data.ArrayReader({
					model:'BookInfo'
				})
			}
		});
		//下来列表显示不出来的原因：1、类当中的属性名称定义错误；2、reader书写的文字不正确；3、fields是否书写错误
		//返回的数据格式是否正确
		Ext.create('Ext.form.Panel',{
			title:"Ext.form.field.ComboBox远程数据示例",
			frame:true,
			height:100,
			width:270,
			renderTo:Ext.getBody(),
			bodyPadding:5,
			defaults:{
				labelSeparator:':',
				labelWidth:70,
				width:200,
				labelAlign:'left'
			},
			items:[{
				xtype:'combobox',
				 listWidth : 240,
				 id:'com',
				fieldLabel:'书籍列表',
				listConfig:{
					loadingText:'正在加载书籍信息',//加载数据的提示信息
					emptyText:'未找到匹配值'//当值不再列表时的提示信息；
				},
				allQuery:'allbook',//查询全部信息的查询字符串；
			//	minChars:3,//下拉列表框自动选择前用户需要输入的最小字符数量
				queryDelay:300,//查询延迟时间
				queryParam:'searchbook',//查询参数
				triggerAction:'all',//单击触发按钮显示全部数据
				store:bookStore,//设置数据源
				displayField:'bookName',
				valueField:'bookName'
			//	queryNode:'remote'//数据加载模式远程加载
			}]
		});
	});
		
	  var store = Ext.create('Ext.data.Store', {
        fields : ['cid', 'cname'],
        data : [{
                cid : '1',
                cname : '南京市'
            }, {
                cid : '2',
                cname : '无锡市'
            }, {
                cid : '3',
                cname : '苏州市'
        }]
    });
    var comboBox = new Ext.form.ComboBox({
        renderTo : Ext.getBody(),
        triggerAction : 'all',
        store : store,
        displayField : 'cname',
        valueField : 'cid',
        queryMode : 'local',
        emptyText : '请选择城市'
    });
    var btn = new Ext.button.Button({
        text : '列表框的值',
        renderTo : Ext.getBody(),
        handler : function() {
        Ext.Msg.alert("值", "实际值:" + comboBox.getValue()
        + ",显示值:" + comboBox.getRawValue());
        }
    });
})();









