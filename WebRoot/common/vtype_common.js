/**
 * @author shangwu
 * @version 1.1 2010年4月2日12:32:19
 * @description 一些常用的自定义的验证
 */
Ext.apply(Ext.form.VTypes,{
	
	numberRange:function(value,field){
		if(field.numberRange){
			var beginId = field.numberRange.numberBegin;
			var endId = field.numberRange.numberEnd;
			
			var beginNO = Ext.getCmp(beginId).getValue();
			var endNO = Ext.getCmp(endId).getValue();
			
			if(beginNO <= endNO){
				return true;
			}else{
				return false;
			}			
		}
	},
	numberRangeText:'开始编号不能大于结束编号！'
});