export interface User {
  id: string;
  user_metadata: {
    name: string;
    email: string;
    role: string;
    [key: string]: any; 
  };
}