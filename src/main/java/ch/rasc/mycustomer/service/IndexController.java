package ch.rasc.mycustomer.service;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {

	private final String indexHtml;

	@Autowired
	public IndexController(ServletContext context) {
		this.indexHtml = (String) context.getAttribute("index.html");
	}

	@RequestMapping(value = { "/", "/index.html" }, produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String index(HttpServletResponse response) {
		response.setContentType("text/html; charset=utf-8");
		return this.indexHtml;
	}

}
