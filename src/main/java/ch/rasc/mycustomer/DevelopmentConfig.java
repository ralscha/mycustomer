package ch.rasc.mycustomer;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import ch.ralscha.extdirectspring.util.ExtDirectSpringUtil;

@Configuration
@Profile("development")
class DevelopmentConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String userDir = System.getProperty("user.dir");
		registry.addResourceHandler("/**")
				.addResourceLocations(Paths.get(userDir, "client").toUri().toString())
				.setCachePeriod(0);
	}

	@Bean
	public FilterRegistrationBean corsFilter() {
		FilterRegistrationBean filter = new FilterRegistrationBean();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Collections.singletonList(CorsConfiguration.ALL));
		config.setAllowedMethods(Collections.singletonList(CorsConfiguration.ALL));
		config.setAllowedHeaders(Collections.singletonList(CorsConfiguration.ALL));
		config.setAllowCredentials(true);
		filter.setFilter(new CorsFilter(r -> config));
		filter.setUrlPatterns(Collections.singleton("/*"));
		filter.setOrder(SecurityProperties.DEFAULT_FILTER_ORDER - 1);
		return filter;
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
	}

	@EventListener
	public void handleContextRefresh(ApplicationReadyEvent event) throws IOException {
		String extDirectConfig = ExtDirectSpringUtil
				.generateApiString(event.getApplicationContext());
		String userDir = System.getProperty("user.dir");
		Files.write(Paths.get(userDir, "client", "api.js"),
				extDirectConfig.getBytes(StandardCharsets.UTF_8));
	}

}
