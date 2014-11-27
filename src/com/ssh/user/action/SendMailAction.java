package com.ssh.user.action;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionSupport;

@Action(value = "sendmailAction", results = {
		@Result(name = "success", location = "/loginSuss.jsp"),
		@Result(name = "failer", location = "/loginFailer.jsp") })
public class SendMailAction extends ActionSupport{
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
private String mail;
private String title;
private String content;
public String getMail() {
	return mail;
}
public void setMail(String mail) {
	this.mail = mail;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public String sendmail(){
	try {
		// 建立邮件回话
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.163.com");// 存储发送邮件服务器的信息
		props.put("mail.smtp.auth", true);// 同时通过验证
		Session s = Session.getInstance(props);// 根据属性创建一个邮件会话
		s.setDebug(true);
		// 由邮件会话创建一个消息对象
		MimeMessage message = new MimeMessage(s);
		// 设置邮件
		InternetAddress from = new InternetAddress("xunyunCloud@163.com");
		InternetAddress to = new InternetAddress(mail);
		message.setFrom(from);// 设置发件人
		message.setRecipient(Message.RecipientType.TO, to);// 设置收件人
		message.setText(content);// 设置发件内容
		message.setSubject(title);// 设置发件主题
		message.setSentDate(new Date());// 设置发件时间
		// 发送邮件
		message.saveChanges();
		Transport tr = s.getTransport("smtp");
		// 以smtp方式登录邮箱,第一个参数是发送邮件的邮件服务器smtp地址,第二个参数为用户名,第三个参数为密码
		tr.connect("smtp.163.com", "xunyunCloud@163.com", "xunyunCloud!");
		// 发送邮件,其中第二个参数是所有已设好的收件人地址
		tr.sendMessage(message, message.getAllRecipients());
		tr.close();
		
	} catch (MessagingException e) {
		e.printStackTrace();
		return "failer";
	}
	return "success";
}
}
