interface UserLoginResponse {
    expiracy: string;
    token: string;
    user: { username: string; email: string };
}

export type { UserLoginResponse };
