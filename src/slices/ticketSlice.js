import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'tickets';

const initialState = {
  tickets: [],
  ticketsHoje: [],
  historico: [],
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

      const ticketExistente = tickets.find(
        t => t.matricula === aluno.matricula && t.data === hoje
      );

      if (ticketExistente) {
        if (ticketExistente.usado) {
          return { sucesso: false, mensagem: "Ticket já foi utilizado hoje!" };
        }
        return { sucesso: true, mensagem: "Já possui um ticket hoje!", ticket: ticketExistente };
      }

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
  async (matricula, { dispatch }) => {
    try {
      const result = await dispatch(loadTickets());
      const tickets = result.payload || [];
      const hoje = new Date().toISOString().split('T')[0];

      const ticket = tickets.find(
        t => t.matricula === matricula && t.data === hoje
      );

      if (!ticket) {
        return { sucesso: false, mensagem: "Nenhum ticket encontrado para hoje." };
      }

      if (ticket.usado) {
        return { sucesso: false, mensagem: "Ticket já foi utilizado hoje!" };
      }

      const updatedTicket = {
        ...ticket,
        usado: true,
        horaUso: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

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
  async (_, { dispatch }) => {
    await dispatch(saveTickets([]));
    return { sucesso: true, mensagem: "Tickets resetados com sucesso!" };
  }
);

export const limparTicketsAntigos = createAsyncThunk(
  'tickets/limparTicketsAntigos',
  async (_, { dispatch }) => {
    const result = await dispatch(loadTickets());
    const tickets = result.payload || [];
    const hoje = new Date().toISOString().split("T")[0];

    const filtrados = tickets.filter((t) => t.data === hoje);
    await dispatch(saveTickets(filtrados));

    return { sucesso: true, mensagem: "Tickets antigos limpos com sucesso!", tickets: filtrados };
  }
);

export const getTicketsHoje = createAsyncThunk(
  'tickets/getTicketsHoje',
  async (_, { dispatch }) => {
    const result = await dispatch(loadTickets());
    const tickets = result.payload || [];
    const hoje = new Date().toISOString().split("T")[0];

    return tickets.filter((t) => t.data === hoje && t.usado);
  }
);

export const getHistoricoTickets = createAsyncThunk(
  'tickets/getHistoricoTickets',
  async (_, { dispatch }) => {
    const result = await dispatch(loadTickets());
    const tickets = result.payload || [];
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
      .addCase(saveTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })
      .addCase(registrarTicket.fulfilled, (state, action) => {
        if (action.payload.sucesso && !action.payload.mensagem.includes("Já possui")) {
          state.tickets.push(action.payload.ticket);
        }
      })
      .addCase(usarTicket.fulfilled, (state, action) => {
        if (action.payload.sucesso) {
          const index = state.tickets.findIndex(
            t => t.matricula === action.payload.ticket.matricula && 
                t.data === action.payload.ticket.data
          );
          if (index !== -1) {
            state.tickets[index] = action.payload.ticket;
          }
        }
      })
      .addCase(getTicketsHoje.fulfilled, (state, action) => {
        state.ticketsHoje = action.payload;
      })
      .addCase(getHistoricoTickets.fulfilled, (state, action) => {
        state.historico = action.payload;
      });
  },
});

export const { addTicket, removeTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
