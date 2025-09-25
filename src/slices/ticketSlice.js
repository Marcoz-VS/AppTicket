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
  async (aluno, { dispatch, getState }) => {
    try {
      const result = await dispatch(loadTickets());
      const tickets = result.payload || [];
      const hoje = new Date().toISOString().split('T')[0];
      
      // Check if user already has a ticket today (used or unused)
      const ticketExistente = tickets.find(
        t => t.matricula === aluno.matricula && t.data === hoje
      );

      if (ticketExistente) {
        if (ticketExistente.usado) {
          return { sucesso: false, mensagem: "Ticket já foi utilizado hoje!" };
        }
        // Return existing unused ticket
        return { sucesso: true, mensagem: "Já possui um ticket hoje!", ticket: ticketExistente };
      }

      // Create new ticket
      const novoTicket = {
        matricula: aluno.matricula,
        nome: aluno.nome,
        curso: aluno.curso,
        local: aluno.local,
        data: hoje,
        horaCriacao: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
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
  async (matricula, { dispatch, getState }) => {
    try {
      const result = await dispatch(loadTickets());
      const tickets = result.payload || [];
      const hoje = new Date().toISOString().split('T')[0];

      // Find user's ticket for today
      const ticket = tickets.find(
        t => t.matricula === matricula && t.data === hoje
      );

      if (!ticket) {
        return { sucesso: false, mensagem: "Nenhum ticket encontrado para hoje." };
      }

      if (ticket.usado) {
        return { sucesso: false, mensagem: "Ticket já foi utilizado hoje!" };
      }

      // Update ticket
      const updatedTicket = {
        ...ticket,
        usado: true,
        horaUso: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      // Update tickets array
      const updatedTickets = tickets.map(t =>
        t.matricula === matricula && t.data === hoje ? updatedTicket : t
      );

      await dispatch(saveTickets(updatedTickets));

      return { 
        sucesso: true, 
        mensagem: "Ticket usado com sucesso!", 
        ticket: updatedTicket 
      };
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
        if (action.payload.sucesso && !action.payload.mensagem.includes("Já possui")) {
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
          const index = state.tickets.findIndex(
            t => t.matricula === action.payload.ticket.matricula && 
                t.data === action.payload.ticket.data
          );
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