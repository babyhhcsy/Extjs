package com.ssh.user.action;

import javax.annotation.Resource;


import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionSupport;
import com.ssh.user.dao.UserDao;
import com.ssh.user.model.User;

/**     
 * 类名称：LoginAction   
 * 类描述：用户控制器的实现
 * 创建人：anan   
 * 创建时间：2012-12-21 下午11:17:36   
 * 修改人：anan
 * 修改时间：2012-12-21 下午11:17:36   
 * 修改备注：   
 * @author chensy
 * @version        
 * */
@Action(value = "loginAction", results = {
		@Result(name = "loginSuccess", location = "/loginSuss.jsp"),
		@Result(name = "loginFailer", location = "/loginFailer.jsp") })
public class LoginAction extends ActionSupport {
	private static final long serialVersionUID = -2266695172069461659L;
	@Resource
	private UserDao userDao;
	private User user;
	
	/**
	 * @Title: getUser
	 * @Description: 返回模型对象，映射使用
	 * @return User    返回类型
	 * @throws
	 */
	public User getUser() {
		return user;
	}

	/**
	 * @Title: setUser
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param  user    设定文件
	 * @throws
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * @Title: login
	 * @Description: TODO(用户登录后判断用户是否存在)
	 * @return String    返回类型
	 * @throws
	 */
	public String login() {
		boolean flag = userDao.isExitByNameAndPass(user);
		if (flag) {
			System.out.println("suss");
			return "loginSuccess";
		}
		System.out.println("fail");
		return "loginFailer";
	}
}
