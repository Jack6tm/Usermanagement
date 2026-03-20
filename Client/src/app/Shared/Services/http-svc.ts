export abstract class HttpSvc {
  protected apiUrl = "http://localhost:8000/api";
  protected tokenKey = 'access_token';

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

   removeAuthToken(): void {
    return localStorage.removeItem(this.tokenKey);
  }

  httpHeader(): { [header: string]: string } {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
