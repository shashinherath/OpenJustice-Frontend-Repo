export interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface LoginRequest {
  email?: string;
  phone_number?: string;
  password: string;
  recaptcha_token?: string;
}

export interface RegisterRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  password: string;
  preferred_language?: string;
  recaptcha_token?: string;
}

export interface AuthResponseData {
  uuid: string;
  first_name?: string;
  last_name?: string;
  role: string;
  preferred_language: string;
  access_token?: string; // registration may not return token directly depending on setup, but backend doc says "and set an access token cookie" and login returns access_token in the data payload. Registration does not return access_token in response data schema in python models earlier.
}

export type LoginResponse = SuccessResponse<AuthResponseData>;
export type RegisterResponse = SuccessResponse<AuthResponseData>;
