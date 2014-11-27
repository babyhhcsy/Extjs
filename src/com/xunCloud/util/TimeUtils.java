package com.xunCloud.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.apache.log4j.Logger;
import org.joda.time.DateTime;


/**
 * @see 提供时间处理的工具类
 * @date 2011-04-23
 * @author wangxx
 */
public class TimeUtils {
	/**
	 * 将String转换为Timestamp类型
	 * @date 2011-05-05
	 * @author wangxx
	 * @param dateString
	 * @return dateTime
	 */
	public final static Timestamp string2Date(final String dateString){
		try {
			final DateFormat dateFormat = new SimpleDateFormat(Constants.Date_Short, Locale.CHINESE);// 设定格式
//		    dateFormat.setLenient(false);// 严格控制输入 比如2010－02－31，根本没有这一天 ，也会认为时间格式不对。
		    Date timeDate;
			timeDate = dateFormat.parse(dateString);
			final Timestamp dateTime = new Timestamp(timeDate.getTime());// Timestamp类型,timeDate.getTime()返回一个long型  
			return dateTime;
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 将date转换为String类型
	 * @date 2011-12-14
	 * @author jk
	 * @param dateString
	 * @return dateTime
	 */
	public final static String date2String( Date date){
		final DateFormat dateFormat = new SimpleDateFormat(Constants.Date_Short, Locale.CHINESE);// 设定格式
		return dateFormat.format(date);
	}
	
	
	/**
	 * 将date转换为String类型
	 * @date 2013-05-03
	 * @author wyl
	 * @param dateString
	 * @return dateTime
	 */
	public final static String date2String1( Date date){
		final DateFormat dateFormat = new SimpleDateFormat(Constants.DateLong, Locale.CHINESE);// 设定格式
		return dateFormat.format(date);
	}
	/**
	 * 将String转换为Timestamp类型
	 * @date 2011-05-05
	 * @author wangxx
	 * @param dateString
	 * @return dateTime
	 * @throws ParseException 
	 */
	public final static Timestamp string2Time(String dateString) {
		try {
			if(dateString == null || dateString.equals(""))
				return new Timestamp(new DateTime().getMillis());
			if(dateString.equals("null"))
				return null;
			DateFormat dateFormat = null;
			if (dateString != null && !dateString.equals("") && dateString.length() > 10) {
				dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);//设定格式
				if (!dateString.contains(" ")) {
					dateString = dateString.substring(0, 10) + " " + dateString.substring(10);
				}
			} else
				dateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
			dateFormat.setLenient(false);// 严格控制输入 比如2010－02－31，根本没有这一天 ，也会认为时间格式不对。
			Date timeDate;
			timeDate = dateFormat.parse(dateString);
			final Timestamp dateTime = new Timestamp(timeDate.getTime());// Timestamp类型,timeDate.getTime()返回一个long型  
			return dateTime;
		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 将日期转化为yyyy-MM-dd-hh:mm:ss 的字符串
	 * @date 2011-05-05
	 * @author wangxx
	 * @param date
	 * @return tempString
	 * @throws java.text.ParseException
	 */
	public final static String time2String(final Date date){
		final SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
		return sdf.format(date);
	}
	/**
	 * 获取当前时间，精确到天
	 * @date 2011-07-04
	 * @author wangxx
	 * @return 当前时间
	 */
	public final static Timestamp getTimestamp(){
		Date date = new Date();
		SimpleDateFormat dateToStr = new SimpleDateFormat(Constants.Date_Short);
        String tempString = dateToStr.format(date);
        Timestamp timestamp = string2Date(tempString+" 00:00:00");
        return timestamp;
	}
	/**
	 * 获取当前时间,精确到秒
	 * @date 2011-08-01
	 * @author wangxx
	 * @return 当前时间
	 * @throws ParseException 
	 */
	public final static Timestamp getAllTimestamp(){
        return new Timestamp(new DateTime().getMillis());
	}
	/**
	 * 获取本年度标识，此处为自然年
	 * @date 2011-05-13
	 * @author wangxx
	 * @return 4位年度标识
	 */
	public final static String getYear(){
		Date date = new Date();
		SimpleDateFormat dateToStr = new SimpleDateFormat("yyyy");
        String tempString = dateToStr.format(date);
		return tempString;
	}
	/**
	 * 获取当前日期
	 * @date 2011-05-13
	 * @author wangxx
	 * @return 当前日期
	 */
	public final static String getDate(){
		Date date = new Date();
		SimpleDateFormat dateToStr = new SimpleDateFormat("yyyy年MM月dd日");
        String tempString = dateToStr.format(date);
		return tempString;
	}
	/**
	 * @see 测试主函数
	 * @param args
	 * @throws ParseException 
	 */
	public static void main(final String[] args) throws Exception {
		Logger logger = Logger.getLogger(TimeUtils.class.getName());
		String dateString = "2012-09-06 00:00:00.0";
		logger.info(date2String1(new Date()));
		System.out.println(date2String1(new Date()));
		System.out.println(string2Time(date2String1(new Date())));
	}

}
