import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
let mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', company: 'ABC Corp' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', company: 'XYZ Ltd' },
];

// Mock API functions
const mockFetchCustomers = async (page = 1, limit = 10, search = '') => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let filtered = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );
  const start = (page - 1) * limit;
  const end = start + limit;
  return { customers: filtered.slice(start, end), total: filtered.length };
};

const mockAddCustomer = async (customer) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newCustomer = { ...customer, id: Date.now() };
  mockCustomers.push(newCustomer);
  return newCustomer;
};

const mockUpdateCustomer = async (id, customer) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockCustomers.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCustomers[index] = { ...mockCustomers[index], ...customer };
    return mockCustomers[index];
  }
  throw new Error('Customer not found');
};

const mockDeleteCustomer = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  mockCustomers = mockCustomers.filter(c => c.id !== id);
};

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async ({ page = 1, limit = 10, search = '' }) => {
    const response = await mockFetchCustomers(page, limit, search);
    return response;
  }
);

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customer) => {
    const response = await mockAddCustomer(customer);
    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, customer }) => {
    const response = await mockUpdateCustomer(id, customer);
    return response;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id) => {
    await mockDeleteCustomer(id);
    return id;
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    total: 0,
    isLoading: false,
    error: null,
    currentPage: 1,
    search: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload.customers;
        state.total = action.payload.total;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
        state.total += 1;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(c => c.id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { setSearch, setPage, clearError } = customerSlice.actions;
export default customerSlice.reducer;
