// Types for Suwayq Pro

export interface Listing {
  id: string;
  title: string;
  description?: string;
  price: string;
  location?: string;
  category: string;
  image: string;
  date: string;
  status: 'active' | 'pending' | 'sold' | 'promoted';
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateListingRequest {
  title: string;
  description?: string;
  price: string;
  location?: string;
  category: string;
  image: string;
}
