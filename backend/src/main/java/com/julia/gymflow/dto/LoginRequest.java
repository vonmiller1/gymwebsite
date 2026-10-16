package com.julia.gymflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

	@NotBlank(message = "El email es obligatorio.")
	@Size(max = 254)
	private String email;

	@NotBlank(message = "La contrasena es obligatoria.")
	@Size(max = 72)
	private String password;

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
