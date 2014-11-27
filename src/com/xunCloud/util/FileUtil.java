package com.xunCloud.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.StringTokenizer;

import org.dom4j.Document;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @author  HJM
 * @createDate 2011-9-7
 */
public class FileUtil {
	/**
	 * 默认的文件后缀名称
	 */
	private static String defaultFileExt = "jpg";
	/**
	 * 分析上传的文件名称uploadFileName，并返回后缀名
	 * @param uploadFileName 上传文件的文件名
	 */
	public static String getFileExt(String uploadFileName) {
		StringTokenizer st = new StringTokenizer(uploadFileName, ".");
		String[] items = new String[st.countTokens()];
		int i = 0;
		while (st.hasMoreTokens()) {
			items[i++] = st.nextToken();
		}
		String fileExt = items[items.length - 1]; // 后缀名
		//如果没有后缀名或后缀名太长
		if (items.length == 1 || fileExt.length()>10) {
			fileExt = defaultFileExt;
		}
		return fileExt;
	}
	/**
	 * 文件转换成base64编码的String
	 * 
	 * @param filePath
	 * @return
	 */
	public static String readFile(File file) {
		try {
			BASE64Encoder encoder = new BASE64Encoder();
			 FileInputStream stream = new FileInputStream(file);
			 byte[] b = new byte[stream.available()];
			 stream.read(b);
			 stream.close();
			String result = encoder.encode(getBytesFromFile(file));
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}  
	/**
	 * base64编码的String转换成文件,保存在path位置
	 * @param fileContent
	 * @param path
	 * @return
	 * @throws IOException
	 */
	public static File saveFile(String fileContent, String path)throws IOException {
		File file = new File(path.substring(0,path.lastIndexOf(File.separator)+1));
		if(!file.exists()){
			file.mkdirs();
		}
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] b = decoder.decodeBuffer(fileContent);
		FileOutputStream out = new FileOutputStream(new File(path));
		out.write(b);
		out.close();
		return file;
	}
	/**
	 * 文件转化为字节数组
	 * 
	 * @param file
	 * @return
	 */
	public static byte[] getBytesFromFile(File file) {
		byte[] ret = null;
		try {
			if (file == null) {
				return null;
			}
			FileInputStream in = new FileInputStream(file);
			ByteArrayOutputStream out = new ByteArrayOutputStream(4096);
			byte[] b = new byte[4096];
			int n;
			while ((n = in.read(b)) != -1) {
				out.write(b, 0, n);
			}
			in.close();
			out.close();
			ret = out.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ret;
	}
	 /**
	  * 写XML文件到指定目录
	 * @param document  dom4j Document
	 * @param outFile   需要写的文件路径
	 * @param encoding  XML文件编码
	 * @throws Exception
	 */
	public static void writeDocument(Document document, String outFile,String encoding) throws Exception {
           // 读取文件,并设置编码
           FileWriter fileWriter = new FileWriter(outFile);
           OutputFormat format = OutputFormat.createPrettyPrint();
           format.setEncoding(encoding);
           // 创建写文件方法
           XMLWriter xmlWriter = new XMLWriter(fileWriter, format);
           // 写入文件
           xmlWriter.write(document);
           // 关闭
           xmlWriter.close();
	    }
	/**
	 * 读取文件内容成字符串
	 * @param f
	 * @return
	 * @throws IOException
	 */
	public static String loadAFileToString(File f) throws IOException {
		BufferedReader br = null;
		String ret = null;
		try {
			br = new BufferedReader(new FileReader(f));
			String line = null;
			StringBuffer sb = new StringBuffer((int) f.length());
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			ret = sb.toString();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (Exception e) {
				}
			}
		}
		return ret;
	}

}
