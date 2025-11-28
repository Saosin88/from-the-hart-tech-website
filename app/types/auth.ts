import type { Result } from './common'

export interface RegisterResponse {
  idToken: string
}

export interface LoginResponse {
  idToken: string
  refreshToken?: string
}

export interface VerifyEmailResponse {
  idToken: string
}

export interface RefreshTokenResponse {
  idToken: string
}

export interface HealthCheckResponse {
  status: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface ResendVerificationResponse {
  message: string
}

export interface LogoutResponse {
  message: string
}

export type AuthResult<T> = Result<T>
