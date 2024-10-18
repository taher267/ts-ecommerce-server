interface UserAuthenticationProps {
  password: string;
  salt: string;
  sessionToken: string;
}

export interface UserProps {
  username?: string;
  email: string;
  authentication: UserAuthenticationProps;
}
