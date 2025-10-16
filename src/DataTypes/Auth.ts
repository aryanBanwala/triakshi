export interface SignupData {
  username: string;                // Required
  phonenumber: number;             // Required 
  email: string;                   // Required
  password: string;                // Required
  country_code: string
}

export interface LoginData{
  phonenumber: number;
  email?: string //optional
  password: string
}