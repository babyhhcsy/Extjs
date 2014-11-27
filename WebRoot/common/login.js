Ext.namespace("EAI.LOGIN");
EAI.LOGIN.DynamicLoginFormPanel = Ext.extend(Ext.FormPanel, {
	initComponent : function() {
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget = 'side';
		var LoginForm = this;

		this._username = new Ext.form.TextField({
			fieldLabel : '帐号',
			width : 140,
			allowBlank : false,
			value:'DEVIL',
			blankText : '帐号不能为空',
			maxLength:20
		})
		this._password = new Ext.form.TextField({
			fieldLabel : '密码',
			allowBlank : false,
			width : 140,
			value:'DEVIL',
			blankText : '密码不能为空',
			inputType : 'password',
			maxLength:20
		});
		this._submit = new Ext.Button({
			text : '登陆',
			formBind : true,
			type : 'submit',
			handler : function() {
				if (LoginForm.form.isValid()) {
					Ext.MessageBox.show({
						title : 'Please wait',
						msg : '系统正在登录...',
						progressText : '',
						width : 300,
						progress : true,
						closable : false,
						animEl : 'loding'
					});
					var f = function(v) {
						return function() {
							var i = v / 11;
							Ext.MessageBox.updateProgress(i, '');
						};
					};

					for (var i = 1; i < 13; i++) {
						setTimeout(f(i), i * 8);
					}
					
					Ext.Ajax.request({
						url : LoginForm.url,
						method : LoginForm.method,
						params : {
							username : LoginForm._username.getValue(),
							password : LoginForm._password.getValue(),
							overlay : LoginForm.overlay
						},
						success : function(result, request) {
							var _msg = Ext.decode(result.responseText);
							if (!_msg.success) {
									self.parent.msgWindow(_msg.msg);
							} else {
								window.location = LoginForm.location;
							}
						},
						failure : function() {
								self.parent.msgWindow(LoginForm.errorMsg);
						}
					})
				}
			}
		});
		this._esc = new Ext.Button({
			text : '重置',
			handler : function() {
				LoginForm.form.reset();
			}
		});
		var config = {
			labelAlign : 'top',
			frame : true,
			monitorValid : true,
			id : 'login',
			bodyStyle : 'padding:5px 5px 0',
			width : 400,
			items : [{
				layout : 'table',
				items : [{
					width : 180,
					html : this.html
				}, {
					width : 180,
					layout : 'form',
					items : [this._username, this._password, {
						width : 95
					}]
				}],
				buttons : [this._submit, this._esc]
			}]
		}

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		EAI.LOGIN.DynamicLoginFormPanel.superclass.initComponent.apply(this,arguments);
	}
});