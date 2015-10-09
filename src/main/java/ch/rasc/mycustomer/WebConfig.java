package ch.rasc.mycustomer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import ch.ralscha.extdirectspring.util.JsonHandler;

@Configuration
public class WebConfig {

	@Bean
	public JsonHandler jsonHandler(ObjectMapper objectMapper) {
		JsonHandler jh = new JsonHandler();
		jh.setMapper(objectMapper);
		return jh;
	}

}
