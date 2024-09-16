export interface SignInRequestDTO {
  email: string;
  password: string;
}

export interface SignInResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequestDTO {
  email: string;
  password: string;
}

export interface SignUpResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequestDTO {
  email: string;
  refreshToken: string;
}
