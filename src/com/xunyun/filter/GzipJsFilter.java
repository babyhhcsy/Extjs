package com.xunyun.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: GzipJsFilter
 * @Description: TODO(用于Extjs的压缩，压缩js文件，可以减少js的大小，加快访问速度)
 * @author babyhhcsy
 */
public class GzipJsFilter implements Filter {
	Map headers = new HashMap();

	/** (非 Javadoc)
	 * <p>Title: destroy</p>
	 * <p>Description: </p>
	 * @see javax.servlet.Filter#destroy()
	 */
	public void destroy() {
	}

	/** (非 Javadoc)
	 * <p>Title: doFilter</p>
	 * <p>Description: </p>
	 * @param req request 对象
	 * @param res response对象
	 * @param chain chain对象
	 * @throws IOException io异常
	 * @throws ServletException 服务器异常
	 * @see javax.servlet.Filter
	 * #doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		if (req instanceof HttpServletRequest){
			doFilter((HttpServletRequest) req, (HttpServletResponse) res, chain);
		}else{
			chain.doFilter(req, res);
		}
	}

	/**
	 * @Title: doFilter
	 * @Description: TODO(获得文件头，并且遍历，设置编码模式)
	 * @param request request 对象
	 * @param response response对象
	 * @param chain chain对象
	 * @throws  IOException 异常
	 * @throws  ServletException  设定文件
	 * @throws
	 */
	public void doFilter(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain)
		throws IOException, ServletException {
		request.setCharacterEncoding("UTF-8");
		for (Iterator it = this.headers.entrySet().iterator(); it.hasNext();) {
			Map.Entry entry = (Map.Entry) it.next();
			response.addHeader((String) entry.getKey(),
					(String) entry.getValue());
		}
		chain.doFilter(request, response);
	}

	/** (非 Javadoc)
	 * <p>Title: init</p>
	 * <p>Description: </p>
	 * @param config filterConfig配置文件
	 * @throws ServletException 
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	public void init(FilterConfig config) throws ServletException {
		String headersStr = config.getInitParameter("headers");
		String[] headers = headersStr.split(",");
		for (int i = 0; i < headers.length; ++i) {
			String[] temp = headers[i].split("=");
			this.headers.put(temp[0].trim(), temp[1].trim());
		}
	}
}