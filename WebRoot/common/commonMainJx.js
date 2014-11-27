
EAI.common = new function(){
	return {
		createSaleOrg:function(){
			var saleOrgStore =  new Ext.data.SimpleStore({
		        fields: ['id', 'text'],
		        data:[
		        		['2000','2000【嘉栩】'],
		        		['3000','3000【嘉栩未税】']
		   			 ]
		    });
		    
		    return new Ext.form.ComboBox({
			    fieldLabel :'销售组织', 
		        store: saleOrgStore,
		        emptyText: '请选择',
		        triggerAction: 'all',
		        readOnly:true,
		        valueField: 'id',
		        anchor : '95%',
		        displayField: 'text',
				mode: 'local'
		    });		
		},
		createDistributionChannel:function(){
			var distributionChannelStore =  new Ext.data.SimpleStore({
		        fields: ['id', 'text'],
		        data:[
						['DO','国内销售-JX'],
		        		['EX','国外销售-JX']
		   			 ]
		    });
		    
		    return new Ext.form.ComboBox({
			    fieldLabel :'分销渠道', 
		        store: distributionChannelStore,
		        emptyText: '请选择',
		        mode: 'local',
		        triggerAction: 'all',
		        readOnly:true,
		        valueField: 'id',
		        anchor : '95%',
		        displayField: 'text'
		    });		
		},
		createProductGroup:function(){
			var productGroupStore =  new Ext.data.SimpleStore({
		        fields: ['id', 'text'],
		        data:[
						['10','10【黏带及黏胶剂产品】']
		   			 ]
		    });
		    
		    return new Ext.form.ComboBox({
			    fieldLabel :'产品组', 
		        store: productGroupStore,
		        emptyText: '请选择',
		        mode: 'local',
		        triggerAction: 'all',
		        readOnly:true,
		        valueField: 'id',
		        anchor : '95%',
		        displayField: 'text'
		    });	
		},
		createFactory:function(){
			var factoryStore =  new Ext.data.SimpleStore({
		        fields: ['id', 'text'],
		        data:[
						['1000','【嘉栩工厂】']
		   			 ]
		    });
		    
		    return new Ext.form.ComboBox({
			    fieldLabel :'工厂', 
		        store: factoryStore,
		        emptyText: '请选择',
		        mode: 'local',
		        triggerAction: 'all',
		        readOnly:true,
		        valueField: 'id',
		        anchor : '95%',
		        displayField: 'text'
		    });	
		},
		createSalesRegion:function(){
			var factoryStore =  new Ext.data.SimpleStore({
		        fields: ['id', 'text'],
		        data:[
						['2000/DO/10','2000/DO/10【嘉栩/国内销售-JX/胶带及黏胶剂产品】'],
		        		['2000/EX/10','2000/EX/10【嘉栩/国外销售-JX/胶带及黏胶剂产品】'],
		        		['3000/DO/10','3000/DO/10【嘉栩未税/国内销售-JX/胶带及黏胶剂产品】'],
		        		['3000/EX/10','3000/EX/10【嘉栩未税/国外销售-JX/胶带及黏胶剂产品】']
		   			 ]
		    });
		    
		    return new Ext.form.ComboBox({
			    fieldLabel :'销售区域', 
		        store: factoryStore,
		        emptyText: '请选择',
		        mode: 'local',
		        triggerAction: 'all',
		        readOnly:true,
		        valueField: 'id',
		        anchor : '95%',
		        displayField: 'text'
		    });	
		}
	}
};