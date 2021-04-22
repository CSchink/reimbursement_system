package com.example.tempservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class TempserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TempserviceApplication.class, args);
	}

}
