Ext.onReady(function(){
	var progressBar = new Ext.ProgressBar({
		text:'working',
		width:300,
		renderTo:'progressBar1'
	})
	progressBar.wait({
		duration:10000,//������������ʱ��/��
		interval:1000,//ÿ1���Ӹ���һ��
		increment:10,//�������ʱ��
		text:'waiting',//�������ϵ�����
		scope:this,//�ص�������ִ�з�Χ
		fn:function(){
			alert("�������");
			progressBar.hide();
		}
	});
	
});