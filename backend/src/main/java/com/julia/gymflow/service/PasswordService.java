package com.julia.gymflow.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.regex.Pattern;

@Service
public class PasswordService {

	private static final Pattern BCRYPT_PATTERN =
			Pattern.compile("^\\$2[aby]\\$\\d{2}\\$.{53}$");

	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public String hash(String password) {
		return encoder.encode(password);
	}

	public boolean matches(String password, String storedPassword) {
		if (password == null || storedPassword == null) {
			return false;
		}

		if (isHash(storedPassword)) {
			return encoder.matches(password, storedPassword);
		}

		return MessageDigest.isEqual(
				password.getBytes(StandardCharsets.UTF_8),
				storedPassword.getBytes(StandardCharsets.UTF_8)
		);
	}

	public boolean needsRehash(String storedPassword) {
		return storedPassword == null || !isHash(storedPassword);
	}

	private boolean isHash(String value) {
		return value != null && BCRYPT_PATTERN.matcher(value).matches();
	}
}
