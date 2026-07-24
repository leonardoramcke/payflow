import { api } from './api';

export interface Customer {
  id: string;
  name: string;
  email: string;
  document?: string;
  createdAt: string;
}

export interface CreateCustomerPayload {
  name: string;
  email: string;
  document?: string;
}

export const customersService = {
  async list(): Promise<Customer[]> {
    const { data } = await api.get<Customer[]>('/customers');
    return data;
  },

  async create(payload: CreateCustomerPayload): Promise<Customer> {
    const { data } = await api.post<Customer>('/customers', payload);
    return data;
  },
};