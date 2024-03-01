export interface UserForRegisterModel {
    name: string;
    email?: string;
    password: string;
    phonenumber?: string;
    otherContactInformation?: string;
}
export interface UserLoginModel {
    userName: string;  
    password: string;
    token: string;
}
