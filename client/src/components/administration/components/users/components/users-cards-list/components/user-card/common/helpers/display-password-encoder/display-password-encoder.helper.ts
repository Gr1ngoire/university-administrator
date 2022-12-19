const passwordEncoder = (password: string) => {
  const EVERY_CHARACTER_EXPRESSION = /./g;
  return password.replace(EVERY_CHARACTER_EXPRESSION, "*");
};

export { passwordEncoder };
