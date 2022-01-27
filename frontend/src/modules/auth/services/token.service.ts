class TokenService {
  getLocalRefreshToken() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment

    const user = JSON.parse(localStorage.getItem("user") as string);
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user?.accessToken;
  }

  updateLocalAccessToken(token: string) {
    const user = JSON.parse(localStorage.getItem("user") as string);
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user") as string);
  }

  setUser(user: Array<string>) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();