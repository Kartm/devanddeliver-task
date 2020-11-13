// this file contains general DTOs

export interface ErrorMessageDTO {
  message: string;
}

export interface ErrorMessageWithTokenDTO extends ErrorMessageDTO {
  accessToken: string | null;
}
