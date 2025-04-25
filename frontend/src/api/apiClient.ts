import { $fetch } from "ofetch";
import type { FetchOptions } from "ofetch";
import { CONFIG } from "../config/index";

export async function apiClient(url: string, options: FetchOptions = {}) {
  // Ambil token dari localStorage

  const headers: HeadersInit = {
 // Tambahkan token jika ada
  };

  try {
    return await $fetch(url, {
      baseURL: CONFIG.baseUrl,
      ...options,
      headers,
    });
  } catch (error: any) {
    throw error;
  }
}
