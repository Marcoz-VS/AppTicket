// filepath: c:\Users\marcos_silva160\Documents\GitHub\AppTicket\src\slices\ticketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'tickets';

const initialState = {
  tickets: [],
  loading: false,
  error: null,
};

export const loadTickets = createAsyncThunk(
  'tickets/loadTickets',
  async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      throw error;
    }
  }
);

export const saveTickets = createAsyncThunk(
  'tickets/saveTickets',
  async (tickets) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
      return tickets;
    } catch (error) {
      throw error;
    }
  }
);

export const registrarTicket = createAsyncThunk(
  'tickets/registrarTicket',
  async (aluno, { dispatch }) => {
    try {
      const result = await dispatch(loadTickets());
      const tickets = result.payload || [];

      const hoje = new Date().toISOString().split('T')[0];
      const horaAgora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      const jaTem = tickets.find((t) => t.matricula === aluno.matricula && t.data === hoje);
      if (jaTem) {
        return { sucesso: false, mensagem: "Já pegou um ticket hoje!" };
      }

      const novoTicket = {
        matricula: aluno.matricula,
        nome: aluno.nome,
        curso: aluno.curso,
        local: aluno.local,
        data: hoje,
        horaCriacao: horaAgora,
        usado: false,
        horaUso: null,
      };

      const updatedTickets = [...tickets, novoTicket];
      await dispatch(saveTickets(updatedTickets));

      return { sucesso: true, mensagem: "Ticket registrado com sucesso!", ticket: novoTicket };
    } catch (error) {
      return { sucesso: false, mensagem: "Erro ao gerar ticket: " + error.message };
    }
  }
);

export const usarTicket = createAsyncThunk(
  'tickets/usarTicket',
  async (matricula, { dispatch }) => {
    try {
      const result = await dispatch(loadTickets());
      const tickets = result.payload || [];

      const hoje = new Date().toISOString().split("T")[0];
      const horaAgora = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

      const ticketIndex = tickets.findIndex((t) => t.matricula === matricula && t.data === hoje && !t.usado);

      if (ticketIndex === -1) {
        return { sucesso: false, mensagem: "Nenhum ticket encontrado para hoje." };
      }

      const updatedTicket = { ...tickets[ticketIndex], usado: true, horaUso: horaAgora };
      tickets[ticketIndex] = updatedTicket;

      await dispatch(saveTickets(tickets));

      return { sucesso: true, mensagem: "Ticket usado com sucesso!", ticket: updatedTicket };
    } catch (error) {
      return { sucesso: false, mensagem: "Erro ao usar ticket: " + error.message };
    }
  }
);

export const resetarTickets = createAsyncThunk(
  'tickets/resetarTickets',
  async () => {
    await saveTickets([]);
    return { sucesso: true, mensagem: "Tickets resetados com sucesso!" };
  }
);

export const limparTicketsAntigos = createAsyncThunk(
  'tickets/limparTicketsAntigos',
  async () => {
    const tickets = await loadTickets();
    const hoje = new Date().toISOString().split("T")[0];

    const filtrados = tickets.filter((t) => t.data === hoje);
    await saveTickets(filtrados);

    return { sucesso: true, mensagem: "Tickets antigos limpos com sucesso!", tickets: filtrados };
  }
);

export const getTicketsHoje = createAsyncThunk(
  'tickets/getTicketsHoje',
  async () => {
    const tickets = await loadTickets();
    const hoje = new Date().toISOString().split("T")[0];

    return tickets.filter((t) => t.data === hoje && t.usado);
  }
);

export const getHistoricoTickets = createAsyncThunk(
  'tickets/getHistoricoTickets',
  async () => {
    const tickets = await loadTickets();
    const hoje = new Date().toISOString().split("T")[0];

    return tickets.filter((t) => t.data !== hoje && t.usado);
  }
);

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(loadTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(saveTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registrarTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registrarTicket.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.sucesso) {
          state.tickets.push(action.payload.ticket);
        }
        state.error = action.payload.sucesso ? null : action.payload.mensagem;
      })
      .addCase(registrarTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(usarTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(usarTicket.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.sucesso) {
          const index = state.tickets.findIndex(t => t.matricula === action.payload.ticket.matricula && t.data === action.payload.ticket.data);
          if (index !== -1) {
            state.tickets[index] = action.payload.ticket;
          }
        }
        state.error = action.payload.sucesso ? null : action.payload.mensagem;
      })
      .addCase(usarTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTicket, removeTicket } = ticketSlice.actions;

export default ticketSlice.reducer;