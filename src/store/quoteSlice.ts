import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface QuoteState {
  quote: string;
  author: string;
  loading: boolean;
  error: string | null;
}

const initialState: QuoteState = {
  quote: '',
  author: '',
  loading: false,
  error: null,
};

export const fetchQuote = createAsyncThunk('quote/fetchQuote', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('api/qotd', {
      headers: {
        Authorization: `Token token="${import.meta.env.VITE_REACT_APP_FAVQS_API_KEY}"`,
      },
    });
    return response.data.quote;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quote = action.payload.body;
        state.author = action.payload.author;
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default quoteSlice.reducer;
