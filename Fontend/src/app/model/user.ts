export interface UserForRegisterModel {
    name: string;
    email?: string;
    password: string;
    mobile?: string;
}
export interface UserLoginModel {
    userName: string;  
    password: string;
    token: string;
}
