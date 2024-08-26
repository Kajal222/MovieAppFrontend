export interface loginDto {
    email: string;
    password: string;
}
export interface loginResponseDto {
    email: string;
    loginToken: string;
    password: string;
    _id: string;
}
export interface initialValueDto {
    email: string;
    password: string;
}
export interface loginApiErrors {
    email?: string;
    password?: string;
}