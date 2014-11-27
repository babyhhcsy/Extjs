package com.ssh.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	/**
	 * 用户id
	 */
	@Id
	@Column(name = "userId")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	
	/**
	 * 用户名
	 */
	@Column(name = "userName", length = 50)
	private String userName;
	
	/**
	 * 用户登录密码
	 */
	@Column(name = "passWord", length = 50)
	private String passWord;

	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public User(int userId, String userName, String passWord) {
		this.userId = userId;
		this.userName = userName;
		this.passWord = passWord;
	}

	public User(String userName, String passWord) {
		this.userName = userName;
		this.passWord = passWord;
	}

	public User(int userId) {
		this.userId = userId;
	}

	public User() {
		
	}

}
