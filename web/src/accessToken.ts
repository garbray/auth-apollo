let accessToken = "";
// move to an state library
export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const getAccessToken = (): string => {
  return accessToken;
};

export const fetchAccessToken = () => {
  return fetch("http://localhost:4000/refresh_token", {
    method: "POST",
    credentials: "include",
  });
};
