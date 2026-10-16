import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const AUTH_TOKEN_KEY = "gymflow.auth.token";
let webMemoryToken: string | null = null;

export async function obtenerTokenSesion(): Promise<string | null> {
  if (Platform.OS === "web") {
    return webMemoryToken;
  }

  try {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function guardarTokenSesion(token: string): Promise<void> {
  if (Platform.OS === "web") {
    webMemoryToken = token;
    return;
  }

  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch {
    throw new Error("No se pudo guardar la sesion de forma segura.");
  }
}

export async function eliminarTokenSesion(): Promise<void> {
  if (Platform.OS === "web") {
    webMemoryToken = null;
    return;
  }

  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  } catch {
    // Si el almacen seguro falla al borrar, la sesion en memoria ya se limpia en capas superiores.
  }
}
