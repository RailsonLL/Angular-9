package com.clientes.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	
	/**
	 * Configuração das permissões para as APIs
	 */
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/api/usuarios").permitAll() //permite todos acessarem
				//.antMatchers("/api/cliente/**").hasAnyRole("USER") //permite somente o usuário configurado como USER
				.antMatchers(
						"/api/cliente/**",
						"/api/servicos/**"
						).authenticated()
				.anyRequest().denyAll(); //nega o acesso a qualquer outra requisição
	}
	
}
