import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
let mockLeads = [
  { id: 1, customerId: 1, title: 'Lead 1', description: 'Description 1', status: 'New', value: 1000, createdAt: '2023-01-01' },
  { id: 2, customerId: 1, title: 'Lead 2', description: 'Description 2', status: 'Contacted', value: 2000, createdAt: '2023-01-02' },
  { id: 3, customerId: 2, title: 'Lead 3', description: 'Description 3', status: 'Converted', value: 3000, createdAt: '2023-01-03' },
];

// Mock API functions
const mockFetchLeads = async (customerId, statusFilter = '') => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let filtered = mockLeads.filter(lead => lead.customerId === customerId);
  if (statusFilter) {
    filtered = filtered.filter(lead => lead.status === statusFilter);
  }
  return filtered;
};

const mockAddLead = async (lead) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newLead = { ...lead, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
  mockLeads.push(newLead);
  return newLead;
};

const mockUpdateLead = async (id, lead) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockLeads.findIndex(l => l.id === id);
  if (index !== -1) {
    mockLeads[index] = { ...mockLeads[index], ...lead };
    return mockLeads[index];
  }
  throw new Error('Lead not found');
};

const mockDeleteLead = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  mockLeads = mockLeads.filter(l => l.id !== id);
};

export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async ({ customerId, statusFilter = '' }) => {
    const response = await mockFetchLeads(customerId, statusFilter);
    return response;
  }
);

export const addLead = createAsyncThunk(
  'leads/addLead',
  async (lead) => {
    const response = await mockAddLead(lead);
    return response;
  }
);

export const updateLead = createAsyncThunk(
  'leads/updateLead',
  async ({ id, lead }) => {
    const response = await mockUpdateLead(id, lead);
    return response;
  }
);

export const deleteLead = createAsyncThunk(
  'leads/deleteLead',
  async (id) => {
    await mockDeleteLead(id);
    return id;
  }
);

const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    isLoading: false,
    error: null,
    statusFilter: '',
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.leads.push(action.payload);
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.leads.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.leads = state.leads.filter(l => l.id !== action.payload);
      });
  },
});

export const { setStatusFilter, clearError } = leadSlice.actions;
export default leadSlice.reducer;
