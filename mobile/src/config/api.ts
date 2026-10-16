import Constants from "expo-constants";

const API_PORT = "8080";
function normalizarApiUrlConfigurada(raw?: string | null) {
  const trimmed = raw?.trim().replace(/\/+$/, "");
  if (!trimmed) {
    return undefined;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return undefined;
  }
}

const CONFIGURED_API_URL = normalizarApiUrlConfigurada(process.env.EXPO_PUBLIC_API_URL);

type ExpoConstantsWithHosts = typeof Constants & {
  manifest?: {
    debuggerHost?: string;
  };
  manifest2?: {
    extra?: {
      expoClient?: {
        hostUri?: string;
      };
    };
  };
};

const constantsWithHosts = Constants as ExpoConstantsWithHosts;

const expoHost =
  Constants.expoConfig?.hostUri ||
  constantsWithHosts.manifest2?.extra?.expoClient?.hostUri ||
  constantsWithHosts.manifest?.debuggerHost;

const expoHostName = expoHost?.split(":")[0];
const esIpPrivada =
  !!expoHostName &&
  /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(expoHostName);
const esHostMovilValido =
  !!expoHostName &&
  esIpPrivada &&
  expoHostName !== "localhost" &&
  expoHostName !== "127.0.0.1" &&
  !expoHostName.startsWith("192.168.56.");

const apiHost = esHostMovilValido ? expoHostName : "localhost";

export const API_BASE_URL =
  CONFIGURED_API_URL || `http://${apiHost}:${API_PORT}/api`;
