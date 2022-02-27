export interface ILogin {
  usernameOrEmail: string;
  password: string;
  remember?: boolean;
}

export interface IRegister {
  userName: string;
  email: string;
  password: string;
  confirmed: boolean;
  firstName: string;
  lastName: string;
  selfRegister: boolean;
}
