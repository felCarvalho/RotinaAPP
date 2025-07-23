import { create } from "zustand";
import { persist } from "zustand/middleware";

export const RotinaStore = create(
  persist(
    (set, get) => ({
      //fonte de verdade(dados)
      data: [],
      //armazenando todas as task
      tasks: [],
      //armazenando todas as categorias
      categorias: [],
      //tasks rederizadas no momento
      dataFiltro: [],
      //tasks do filtro de pesquisa
      dataSearch: [],
      //arzena as tasks pesquisa
      filterSearch: "",
      //armazena todas as tasks deletadas
      lixeira: [],
      //armazena id atual de categoria
      uuid: "",
      //variavel de controle para filtro de categorias
      filterControlCategorias: null,
      //id atual do filtro(logica)
      filterId: null,
      //filtro atual(string)
      filter: "",
      //variavel de controle para filtro de status
      filtroControlStatus: null,
      //armazena o status atual(logica)
      statusBoolean: null,
      //armazena o status atual(string)
      status: null,
      //ultima categoria criada
      categoriaTasks: "",
      //task atual
      taskObj: {},
      //ativa/desativa funções extras
      statusFunction: {
        lixeira: false,
        extras: false,
      },

      //armazenando categoria atual
      setCategoria: (categoriaTask, id) => {
        const { categorias } = get();

        if (!categoriaTask.trim() || !id.trim()) {
          return;
        }

        //verificamos se já existe uma categoria igual em categorias
        const controlCategoria = categorias.some((categoria) => categoria.categoria === categoriaTask);

        //negamos o true para false, e aplicamos a lógica para adicionar nova categoria sem perder as anteriores
        if (!controlCategoria) {
          return set((state) => ({
            categorias: [...state.categorias, { categoria: categoriaTask, id: id }],
          }));
        }
      },

      //criando as taks novas de acordo com sua respectiva categoria
      setCreateTask: (categoriaTask) => {
        //seleciona todos os dados necessários para a função
        const { data, taskObj, uuid } = get();

        if (!categoriaTask.trim()) {
          return;
        }

        //retorna true se for igual
        const controlCategoria = data.some((categoria) => categoria.categoria === categoriaTask);

        //armazena o ultimo data
        let createData = [];

        //cria uma nova categoria para task se ela não existir
        if (!controlCategoria) {
          createData = [
            ...data,
            {
              categoria: categoriaTask,
              id: uuid,
              tarefas: [{ ...taskObj, categoriaID: uuid }],
            },
          ];
        }
        //adiciona a task a uma categoria existente
        else {
          createData = data.map((data) => {
            return data.categoria === categoriaTask
              ? {
                  ...data,
                  tarefas: [...data.tarefas, { ...taskObj, categoriaID: data.id }],
                }
              : data;
          });
        }

        //separando somente tasks para facilitar acesso a todas elas
        const tasks = createData.flatMap((data) => data.tarefas);

        //atualizndo state de data e tasks
        set({
          data: createData,
          tasks: tasks,
        });
      },

      //função de filtragem de categorias e suas tasks
      filtragemCategorias: (filterId) => {
        //captura dados utilizados
        const { tasks } = get();

        if (!filterId) {
          return set({
            dataFiltro: tasks,
          });
        }

        let filter = tasks.filter((t) => t.categoriaID === filterId);

        set({
          dataFiltro: filter,
        });
      },

      //função de filtro por status
      filtragemStatus: (status) => {
        const { tasks } = get();

        let filter = tasks.filter((t) => t.status === status);

        set({
          dataFiltro: filter,
        });
      },

      searchTask: () => {
        const { tasks, filterSearch } = get();

        let buscandoTasks = tasks.filter((t) => t.rotina.toLowerCase().includes(filterSearch));

        set({
          dataSearch: filterSearch ? buscandoTasks : [],
        });
      },

      //função para atualizar o status da task
      updateStatus: ({ id }) => {
        const { data, tasks } = get();

        const dataUpdate = data.map((c) => ({
          ...c,
          tarefas: c.tarefas.map((t) => (t.id === id ? { ...t, status: !t.status } : t)),
        }));

        const tasksUpdate = tasks.map((t) => (t.id === id ? { ...t, status: !t.status } : t));

        set({
          data: dataUpdate,
          tasks: tasksUpdate,
          dataFiltro: tasksUpdate,
        });

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set({
            dataSearch: tasksUpdate,
          });
          searchTask(filterSearch);
        }
      },

      //função de deletar teask
      deletarTask: ({ id }) => {
        const { data, tasks } = get();

        const deleteData = data.map((c) => ({
          ...c,
          tarefas: c.tarefas.filter((t) => t.id !== id),
        }));

        const deleteTasks = tasks.filter((t) => t.id !== id);

        const deleteLixeira = tasks.filter((t) => t.id === id);

        set((state) => ({
          data: deleteData,
          tasks: deleteTasks,
          lixeira: [...state.lixeira, deleteLixeira].flat(),
          dataFiltro: deleteTasks,
        }));

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set({
            dataSearch: deleteTasks,
          });
          searchTask(filterSearch);
        }
      },

      //renomeia todas a tasks requisitadas
      renomearTask: ({ id, task }) => {
        const { data, tasks } = get();

        const renomearData = data.map((c) => ({
          ...c,
          tarefas: c.tarefas.map((t) => (t.id === id ? { ...t, rotina: task } : t)),
        }));

        const renomearTasks = tasks.map((t) => (t.id === id ? { ...t, rotina: task } : t));

        set({
          data: renomearData,
          tasks: renomearTasks,
          dataFiltro: renomearTasks,
          dataSearch: renomearTasks,
        });

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set({
            dataSearch: renomearTasks,
          });
          searchTask(filterSearch);
        }
      },

      //restaurando tasks deletadas
      restaurarTask: (taskID, categoriaID) => {
        const { data, lixeira } = get();

        const buscaTask = lixeira.filter((t) => t.id === taskID);

        const restaurarLixeira = lixeira.filter((t) => t.id !== taskID);

        const restaurarData = data.map((data) =>
          data.id === categoriaID ? { ...data, tarefas: [...data.tarefas, buscaTask] } : data,
        );

        set((state) => ({
          data: restaurarData,
          lixeira: restaurarLixeira,
          tasks: [...state.tasks, buscaTask].flat(),
          dataFiltro: [...state.dataFiltro, buscaTask].flat(),
        }));

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set((state) => ({
            dataSearch: [...state.dataSearch, buscaTask].flat(),
          }));
          searchTask(filterSearch);
        }
      },

      categoriaMenuDeletar: (categoriaID) => {
        const { data, tasks } = get();

        const deletarDataCategoria = data.map((c) => (c.id === categoriaID ? { ...c, tarefas: [] } : c));

        const armazenarTasksCategoriaID = tasks.filter((t) => t.categoriaID === categoriaID);

        const deletarTasksCategoriaID = tasks.filter((t) => t.categoriaID !== categoriaID);

        set((state) => ({
          data: deletarDataCategoria,
          tasks: deletarTasksCategoriaID,
          lixeira: [...state.lixeira, armazenarTasksCategoriaID].flat(),
          dataFiltro: deletarTasksCategoriaID,
        }));

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set({
            dataSearch: deletarTasksCategoriaID,
          });
          searchTask(filterSearch);
        }
      },

      categoriaMenuIncompleta: (categoriaID) => {
        const { data, tasks } = get();

        const incompletaDataCategoria = data.map((c) =>
          c.id === categoriaID ? { ...c, tarefas: c.tarefas.map((t) => ({ ...t, status: false })) } : c,
        );

        const incompletaTasksCategoriaID = tasks.map((t) => (t.categoriaID === categoriaID ? { ...t, status: false } : t));

        set({
          data: incompletaDataCategoria,
          tasks: incompletaTasksCategoriaID,
          dataFiltro: incompletaTasksCategoriaID,
        });

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set({
            dataSearch: incompletaTasksCategoriaID,
          });
          searchTask(filterSearch);
        }
      },

      categoriaMenuConcluida: (categoriaID) => {
        const { data, tasks } = get();

        const concluidaDataCategoria = data.map((c) =>
          c.id === categoriaID ? { ...c, tarefas: c.tarefas.map((t) => ({ ...t, status: true })) } : c,
        );

        const concluidaTasksCategoriaID = tasks.map((t) => (t.categoriaID === categoriaID ? { ...t, status: true } : t));

        set({
          data: concluidaDataCategoria,
          tasks: concluidaTasksCategoriaID,
          dataFiltro: concluidaTasksCategoriaID,
        });

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set({
            dataSearch: concluidaTasksCategoriaID,
          });
          searchTask(filterSearch);
        }
      },

      categoriaRestaurar: (categoriaID) => {
        const { data, lixeira } = get();

        const buscarTasks = lixeira.filter((t) => t.categoriaID === categoriaID);

        const restaurarLixeira = lixeira.filter((t) => t.categoriaID !== categoriaID);

        const restaurarData = data.map((c) => (c.id === categoriaID ? { ...c, tarefas: [...c.tarefas, buscarTasks] } : c));

        set((state) => ({
          data: restaurarData,
          lixeira: restaurarLixeira,
          tasks: [...state.tasks, buscarTasks].flat(),
          dataFiltro: [...state.dataFiltro, buscarTasks].flat(),
        }));

        const {
          filterControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filterControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set((state) => ({
            dataSearch: [...state.dataSearch, buscarTasks].flat(),
          }));
          searchTask(filterSearch);
        }
      },

      buscarCategoria: (categoriaID) => {
        const { tasks } = get();

        return tasks.filter((c) => c.categoriaID === categoriaID);
      },

      buscarTasksStatus: (categoriaID, status) => {
        const { buscarCategoria } = get();

        const tasksStatus = buscarCategoria(categoriaID).filter((s) => s.status === status);

        return tasksStatus;
      },

      porcentagemTasksStatus: (categoriaID, status) => {
        const { buscarCategoria, buscarTasksStatus } = get();

        const categoriaLength = buscarCategoria(categoriaID).length;

        const tasksStatus = buscarTasksStatus(categoriaID, status).length;

        return categoriaLength ? (tasksStatus / categoriaLength) * 100 : 0;
      },

      buscarTasksDeletadas: (categoriaID) => {
        const { lixeira } = get();
        return lixeira.filter((t) => t.categoriaID === categoriaID);
      },

      setCategoriaTask: ({ categoria, id }) => {
        set({
          categoriaTasks: categoria,
          uuid: id,
        });
      },

      //atualiza as permissões de ativação de funções
      setStatusFunction: (boleano) => set((s) => ({ ...s, statusFunction: { ...s.statusFunction, ...boleano } })),
      //caputra e envia o filter atual
      setFilter: ({ id }) => {
        const { filtragemCategorias } = get();

        set({
          filterId: id,
          statusBoolean: null,
          filterControlStatus: null,
          filterControlCategorias: true,
        });

        filtragemCategorias(id);
      },

      setCategoriaString: ({ categoria }) => {
        set({
          filter: categoria,
          status: null,
        });
      },

      setStatus: ({ status }) => {
        const { filtragemStatus } = get();

        set({
          statusBoolean: status,
          filterId: null,
          filterControlStatus: true,
          filterControlCategorias: null,
        });

        filtragemStatus(status);
      },

      setStatusString: ({ status }) => {
        set({
          status: status,
          filter: "",
        });
      },

      setClearFilterBasico: () => {
        set((state) => ({
          filterId: null,
          filter: null,
          statusBoolean: null,
          status: null,
          dataFiltro: [...state.tasks].flat(),
          filterControlStatus: null,
          filterControlCategorias: null,
        }));
      },

      setSearchTasks: ({ search }) => {
        set({
          filterSearch: search,
        });
      },

      setClearSearch: () => {
        const { searchTask } = get();

        set({
          filterSearch: null,
          dataSearch: [],
        });

        searchTask();
      },

      //caputura dados de task e sua categoria e executa funções(setCategoria(), setTask(), setCreateTask()) vinculadas a criação da task
      setDataTask: ({ task }) => {
        const { setCategoria, setCreateTask, categoriaTasks, uuid } = get();

        set({
          taskObj: task,
        });

        //executando funções com seus dados necessários
        setCategoria(categoriaTasks, uuid);
        setCreateTask(categoriaTasks);
      },
    }),

    {
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key, value]) => typeof value !== "function")),
      name: "Rotina-store",
    },
  ),
);
