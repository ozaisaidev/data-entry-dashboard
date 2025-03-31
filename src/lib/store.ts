
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MotorData } from './types';

interface StoreState {
  records: MotorData[];
  addRecord: (record: MotorData) => void;
  getRecords: () => MotorData[];
  clearRecords: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      records: [],
      addRecord: (record) => set((state) => ({ 
        records: [...state.records, record] 
      })),
      getRecords: () => get().records,
      clearRecords: () => set({ records: [] }),
    }),
    {
      name: 'motor-data-storage',
    }
  )
);
