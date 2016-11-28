package ch.rasc.mycustomer;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;

import ch.ralscha.extdirectspring.util.ExtDirectSpringUtil;

@Configuration
@Profile("development")
class DevelopmentConfig {

	@EventListener
	public void handleContextRefresh(ApplicationReadyEvent event) throws IOException {
		String extDirectConfig = ExtDirectSpringUtil
				.generateApiString(event.getApplicationContext());
		String userDir = System.getProperty("user.dir");
		Files.write(Paths.get(userDir, "client", "api.js"),
				extDirectConfig.getBytes(StandardCharsets.UTF_8));
	}

}
