"use client";

import { Configuration, DefaultApi } from "./api-client";

export function getApiUrl() {
  return "https://api.rag.pixegami.io";
}

export default function createApiClient() {
  const apiConfig = new Configuration({
    basePath: getApiUrl(),
  });
  const api = new DefaultApi(apiConfig);
  return api;
}
