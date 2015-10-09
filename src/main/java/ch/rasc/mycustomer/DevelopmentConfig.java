package ch.rasc.mycustomer;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import ch.ralscha.extdirectspring.bean.api.PollingProvider;
import ch.ralscha.extdirectspring.bean.api.RemotingApi;
import ch.ralscha.extdirectspring.controller.ConfigurationService;
import ch.ralscha.extdirectspring.util.MethodInfo;
import ch.ralscha.extdirectspring.util.MethodInfoCache;

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

	@Autowired
	private MethodInfoCache methodInfoCache;

	@Autowired
	private ConfigurationService configurationService;

	@EventListener
	public void handleContextRefresh(
			@SuppressWarnings("unused") ApplicationReadyEvent event) throws IOException {

		RemotingApi remotingApi = new RemotingApi(
				this.configurationService.getConfiguration().getProviderType(), "router",
				null);

		for (Map.Entry<MethodInfoCache.Key, MethodInfo> entry : this.methodInfoCache) {
			MethodInfo methodInfo = entry.getValue();
			if (methodInfo.getAction() != null) {
				remotingApi.addAction(entry.getKey().getBeanName(),
						methodInfo.getAction());
			}
			else if (methodInfo.getPollingProvider() != null) {
				remotingApi.addPollingProvider(methodInfo.getPollingProvider());
			}
		}

		remotingApi.sort();

		StringBuilder extDirectConfig = new StringBuilder(100);

		extDirectConfig.append("var REMOTING_API").append(" = ");
		extDirectConfig.append(new ObjectMapper().writer().withDefaultPrettyPrinter()
				.writeValueAsString(remotingApi));
		extDirectConfig.append(";");

		List<PollingProvider> pollingProviders = remotingApi.getPollingProviders();
		if (!pollingProviders.isEmpty()) {

			extDirectConfig.append("\n\n");

			extDirectConfig.append("var POLLING_URLS").append(" = {");
			extDirectConfig.append("\n");

			for (int i = 0; i < pollingProviders.size(); i++) {
				extDirectConfig.append("  ");

				extDirectConfig.append("\"");
				extDirectConfig.append(pollingProviders.get(i).getEvent());
				extDirectConfig.append("\"");
				extDirectConfig.append(" : \"").append("poll").append("/");
				extDirectConfig.append(pollingProviders.get(i).getBeanName());
				extDirectConfig.append("/");
				extDirectConfig.append(pollingProviders.get(i).getMethod());
				extDirectConfig.append("/");
				extDirectConfig.append(pollingProviders.get(i).getEvent());
				extDirectConfig.append("\"");
				if (i < pollingProviders.size() - 1) {
					extDirectConfig.append(",\n");
				}
			}
			extDirectConfig.append("\n");
			extDirectConfig.append("};");
		}

		String userDir = System.getProperty("user.dir");

		Files.write(Paths.get(userDir, "client", "api.js"),
				extDirectConfig.toString().getBytes(StandardCharsets.UTF_8));

	}

}
