export interface User {
    id: string;
    title: "mr" | "ms" | "mrs" | "miss" | "dr" | "";
    firstName: string;
    lastName: string;
    email: string;
    gender: "male" | "female" | "other" | "";
    phone: string;
    dateOfBirth: string;
  }
  