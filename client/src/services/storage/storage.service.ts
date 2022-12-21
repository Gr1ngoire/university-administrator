class Storage {
  public setToken(value: string): void {
    this.setValue("token", value);
  }

  public clearToken(): void {
    this.deleteValue("token");
  }

  private setValue(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  private deleteValue(name: string): void {
    localStorage.removeItem(name);
  }
}

export { Storage };
