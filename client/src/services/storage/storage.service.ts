class Storage {
  public setToken(value: string): void {
    this.setValue("token", value);
  }

  public clearToken(): void {
    this.deleteValue("token");
  }

  public getItem(name: string): string | null {
    return localStorage.getItem(name);
  }

  private setValue(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  private deleteValue(name: string): void {
    localStorage.removeItem(name);
  }
}

export { Storage };
