type UserWithGrantDto = {
  id: number;
  name: string;
  surname: string;
  secondName: string;
  role: string;
  phone: string;
  email: string;
  // grant: admin || user
};

export { type UserWithGrantDto };
