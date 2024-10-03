import axios from 'axios';
import { MachineDTO } from './machine/dto/machine.dto';
import { ProductionDTO } from './production/dto/production.dto';

const API_KEY = 'feebcda0';

const apiClient = axios.create({
  baseURL: 'https://my.api.mockaroo.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllMachines = async (): Promise<MachineDTO[]> => {
  const response = await apiClient.get('/machine.json', {
    params: { key: API_KEY },
  });
  return response.data;
};

export const getAllProductions = async (): Promise<ProductionDTO[]> => {
  const response = await apiClient.get('/production.json', {
    params: { key: API_KEY },
  });
  return response.data;
};
