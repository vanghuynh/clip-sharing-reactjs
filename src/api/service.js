import { API_BASE } from "./config";
import api from "./instance";
import * as Config from "./config";

export const login = (username, password) => {
  return api.post(`${Config.API_BASE}/user/login`, {
    username: username,
    password: password,
  });
};

export const register = (username, password) => {
  return api.post(`${Config.API_BASE}/user/register`, {
    username: username,
    password: password,
  });
};

export function getClips(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}

export const saveClip = (data) => {
  return api.post(`${API_BASE}/clip`, data);
};
