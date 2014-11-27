// vim: ts=4:sw=4:nu:fdc=4:nospell
/*global Ext */
/**
 * @class Ext.ux.form.ThemeCombo
 * @extends Ext.form.ComboBox
 *
 * Combo pre-configured for themes selection. Keeps state if a provider is present.
 * 
 * @author      Ing. Jozef Sakáloš 
 * @copyright   (c) 2008, by Ing. Jozef Sakáloš
 * @version     1.1
 * @date        30. January 2008
 * @revision    $Id: Ext.ux.form.ThemeCombo.js,v 1.1 2014/05/22 09:59:29 IT04 Exp $
 *
 * @license Ext.ux.form.ThemeCombo is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * <p>License details: <a href="http://www.gnu.org/licenses/lgpl.html"
 * target="_blank">http://www.gnu.org/licenses/lgpl.html</a></p>
 *
 * @demo     http://extjs.eu
 * @forum    25564
 *
 * @donate
 * <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
 * <input type="hidden" name="cmd" value="_s-xclick">
 * <input type="hidden" name="hosted_button_id" value="3430419">
 * <input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-butcc-donate.gif" 
 * border="0" name="submit" alt="PayPal - The safer, easier way to pay online.">
 * <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
 * </form>
 */

Ext.ns('Ext.ux.form');
var stylePath;

/**
 * Creates new ThemeCombo
 * @constructor
 * @param {Object} config A config object
 */
Ext.ux.form.ThemeCombo = Ext.extend(Ext.form.ComboBox, {
	// configurables
	 themeBlueText: '默认风格',
	 themeOliveText: '深绿风格',
	 themeGreenText: '亮绿风格',
	 themeMidnightText: '午夜风格',
	 themeOrangeText: '橙色风格',
	 ChocolateText:'巧克力色',
	 themeBlack:'黑色',
	 themeblue:'蓝色',
	 themeslickness:'themeslickness',
	 themeindigo:'themeindigo',
	 themepink:'themepink',
	 themepurple:'themepurple',
	 empertyText:'选择皮肤',
	 themeVar:'theme',
	 selectThemeText: 'Select Theme',
	 lazyRender:true,
	 lazyInit:true,
	 cssPath:'ui/js/extjs/resources/css/',
	 initComponent:function() {
		var config = {
			store: new Ext.data.SimpleStore({
				fields: ['themeFile', {name:'themeName', type:'string'}],
				data: [	
					 ['xtheme-default.css', this.themeBlueText],
					 ['xtheme-olive.css', this.themeOliveText],
					 ['xtheme-orange.css', this.themeOrangeText],
					 ['xtheme-green.css', this.themeGreenText],
					 ['xtheme-midnight.css', this.themeMidnightText],
					 ['xtheme-chocolate.css', this.ChocolateText],
					 ['xtheme-black.css', this.themeBlack],
					 ['xtheme-blue.css', this.themeblue],
					 ['xtheme-slickness.css', this.themeslickness],
					 ['xtheme-indigo.css', this.themeindigo],
					 ['xtheme-pink.css', this.themepink],
					 ['xtheme-purple.css', this.themepurple],
					 ['xtheme-slate.css', this.themeslate],
					 ['xtheme-slickness.css', this.themeblue]
				]
			}),
			valueField: 'themeFile',
			displayField: 'themeName',
			triggerAction:'all',
			mode: 'local',
			width:90,
			forceSelection:true,
			editable:false,
			fieldLabel: this.selectThemeText
		}; // eo config object

		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

		this.store.sort('themeName');

		// call parent
		Ext.ux.form.ThemeCombo.superclass.initComponent.apply(this, arguments);
		if(false !== this.stateful && Ext.state.Manager.getProvider()) {
			this.setValue(Ext.state.Manager.get(this.themeVar) || 'xtheme-default.css');
		}else {
			this.setValue('xtheme-default.css');
		}
		
	} // end of function initComponent
	// }}}
	// {{{
	,setValue:function(val) {
		Ext.ux.form.ThemeCombo.superclass.setValue.apply(this, arguments);
		// set theme
		Ext.util.CSS.swapStyleSheet(this.themeVar, this.cssPath + val);
	
		stylePath = this.cssPath + val;
		if(false !== this.stateful && Ext.state.Manager.getProvider()) {
			Ext.state.Manager.set(this.themeVar, val);
		}
		
		this.showFrame(stylePath);
	} // eo function setValue
	// }}}
	,showFrame:function(stylePath){
        var frames = window.frames;
        for (var i = 0; i < frames.length; i++) {
            var frameObj = frames[i];
          	if(frameObj.changeStyle instanceof Function)
           		frameObj.changeStyle(stylePath);
        }
    }

}); // end of extend

// register xtype
Ext.reg('themecombo', Ext.ux.form.ThemeCombo);

// eof
