import { create } from "zustand";
import { persist } from "zustand/middleware";

interface tarefa {
  rotina: string;
  descricao: string;
  id: string;
  status: boolean;
  deletada: boolean;
  categoriaID: string;
  data: string;
}

interface data {
  categoria: string;
  id: string;
  tarefas: tarefa[];
}

interface dataCategoria {
  categoria: string;
  id: string;
}

type keys = string;
type value = boolean;

type statusFunction = Record<keys, value>;

interface functionTypes {
  setCategoria: (categoria: dataCategoria, id: string) => void;
  setCreateTask: (categoriaTask: dataCategoria) => void;
  filtragemCategorias: (filterId: string) => void;
  filtragemStatus: (status: boolean) => void;
  searchTask: () => void;
  updateStatus: ({ id }: { id: string }) => void;
  deletarTask: ({ id }: { id: string }) => void;
  renomearTask: ({ id, task }: { id: string; task: string }) => void;
  restaurarTask: (taskID: string, categoriaID: string) => void;
  categoriaMenuDeletar: (categoriaID: string) => void;
  categoriaMenuIncompleta: (categoriaID: string) => void;
  categoriaMenuConcluida: (categoriaID: string) => void;
  categoriaRestaurar: (categoriaID: string) => void;
  buscarCategoria: (categoriaID: string) => tarefa[];
  buscarTasksStatus: (categoriaID: string, status: boolean) => tarefa[];
  porcentagemTasksStatus: (categoriaID: string, status: boolean) => number;
  buscarTasksDeletadas: (categoriaID: string) => tarefa[];
  setStatusFunction: (boleano: statusFunction) => void;
  setFilter: ({ id }: { id: string }) => void;
  setCategoriaString: ({ categoria }: { categoria: string }) => void;
  setStatus: ({ status }: { status: boolean }) => void;
  setStatusString: ({ status }: { status: boolean }) => void;
  setSearchTasks: ({ search }: { search: string }) => void;
  setDataTask: ({ task }: { task: tarefa }) => void;
  setCategoriaTask: ({ categoria, id }: { categoria: dataCategoria; id: string }) => void;
  setClearFilterBasico: () => void;
}

interface RotinaStoreTypes extends functionTypes {
  data: data[];
  tasks: tarefa[];
  categorias: dataCategoria[];
  dataFiltro: tarefa[];
  dataSearch: tarefa[];
  lixeira: tarefa[];
  categoriaTasks: dataCategoria;
  taskObj: tarefa;
  statusFunction: statusFunction;
  filterSearch: string;
  uuid: string;
  filterControlCategorias: boolean;
  filterId: string;
  filter: string;
  filtroControlStatus: boolean;
  statusBoolean: boolean;
  status: boolean;
}

export const RotinaStore = create<RotinaStoreTypes>()(
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
      //armazena todas as tasks deletadas
      lixeira: [],
      //ultima categoria criada
      categoriaTasks: {
        categoria: "",
        id: "",
      },
      //task atual
      taskObj: {
        rotina: "",
        descricao: "",
        id: "",
        status: false,
        deletada: false,
        categoriaID: "",
        data: "",
      },
      //ativa/desativa funções extras
      statusFunction: {
        lixeira: false,
        extras: false,
      },
      //arzena as tasks pesquisa
      filterSearch: "",
      //armazena id atual de categoria
      uuid: "",
      //variavel de controle para filtro de categorias
      filterControlCategorias: false,
      //id atual do filtro(logica)
      filterId: "todas",
      //filtro atual(string)
      filter: "",
      //variavel de controle para filtro de status
      filtroControlStatus: false,
      //armazena o status atual(logica)
      statusBoolean: false,
      //armazena o status atual(string)
      status: false,

      //armazenando categoria atual
      setCategoria: (categoriaTask) => {
        const { categorias } = get();

        if (!categoriaTask?.categoria.trim() || !categoriaTask?.id.trim()) {
          return;
        }
        //verificamos se já existe uma categoria igual em categorias
        const controlCategoria = categorias.some((categoria) => categoria?.categoria === categoriaTask?.categoria);

        //negamos o true para false, e aplicamos a lógica para adicionar nova categoria sem perder as anteriores
        if (!controlCategoria) {
          return set((state) => ({
            categorias: [...state.categorias, { categoria: categoriaTask?.categoria, id: categoriaTask?.id }],
          }));
        }
      },

      //criando as taks novas de acordo com sua respectiva categoria
      setCreateTask: (categoriaTask) => {
        //seleciona todos os dados necessários para a função
        const { data, taskObj, uuid } = get();

        if (!categoriaTask?.categoria?.trim()) {
          return;
        }

        //retorna true se for igual
        const controlCategoria = data.some((categoria) => categoria.categoria === categoriaTask?.categoria);

        //armazena o ultimo data
        let createData = [];

        //cria uma nova categoria para task se ela não existir
        if (!controlCategoria) {
          createData = [
            ...data,
            {
              categoria: categoriaTask?.categoria,
              id: uuid,
              tarefas: [{ ...taskObj, categoriaID: uuid }],
            },
          ];
        }
        //adiciona a task a uma categoria existente
        else {
          createData = data.map((data) => {
            return data.categoria === categoriaTask?.categoria
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

        if (filterId === "todas") {
          return set({
            dataFiltro: tasks,
          });
        }

        const filter = tasks.filter((t) => t.categoriaID === filterId);

        set({
          dataFiltro: filter,
        });
      },

      //função de filtro por status
      filtragemStatus: (status) => {
        const { tasks } = get();

        const filter = tasks.filter((t) => t.status === status);

        set({
          dataFiltro: filter,
        });
      },

      searchTask: () => {
        const { tasks, filterSearch } = get();

        const buscandoTasks = tasks.filter((t) => t?.rotina.toLowerCase().includes(filterSearch));

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
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
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
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        /*if (filterId !== null && filterControlCategorias !== null) {
          filtragemCategorias(filterId);
        }

        if (statusBoolean !== null && filtroControlStatus !== null) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          set({
            dataSearch: deleteTasks,
          });
          searchTask();
        }*/

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
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
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
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

        set(
          (state) =>
            ({
              data: restaurarData,
              lixeira: restaurarLixeira,
              tasks: [...state.tasks, buscaTask].flat(),
              dataFiltro: [...state.dataFiltro, buscaTask].flat(),
              dataSearch: [...state.dataSearch, buscaTask].flat(),
            }) as Partial<RotinaStoreTypes>,
        );

        const {
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
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
          dataSearch: deletarTasksCategoriaID,
        }));

        const {
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
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
          dataSearch: incompletaTasksCategoriaID,
        });

        const {
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
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
          dataSearch: concluidaTasksCategoriaID,
        });

        const {
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
        }
      },

      categoriaRestaurar: (categoriaID) => {
        const { data, lixeira } = get();

        const buscarTasks = lixeira.filter((t) => t.categoriaID === categoriaID);

        const restaurarLixeira = lixeira.filter((t) => t.categoriaID !== categoriaID);

        const restaurarData = data.map((c) => (c.id === categoriaID ? { ...c, tarefas: [...c.tarefas, buscarTasks] } : c));

        set(
          (state) =>
            ({
              data: restaurarData,
              lixeira: restaurarLixeira,
              tasks: [...state.tasks, buscarTasks].flat(),
              dataFiltro: [...state.dataFiltro, buscarTasks].flat(),
              dataSearch: [...state.dataSearch, buscarTasks].flat(),
            }) as Partial<RotinaStoreTypes>,
        );

        const {
          filtroControlStatus,
          filterControlCategorias,
          filterId,
          statusBoolean,
          filterSearch,
          filtragemStatus,
          filtragemCategorias,
          searchTask,
        } = get();

        if (filterControlCategorias && filterId) {
          filtragemCategorias(filterId);
        }

        if (filtroControlStatus) {
          filtragemStatus(statusBoolean);
        }

        if (filterSearch) {
          searchTask();
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

        const categoria = buscarCategoria(categoriaID);
        const statusTask = buscarTasksStatus(categoriaID, status);

        const total = categoria.length ? (statusTask.length / categoria.length) * 100 : 0;

        return total;
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
          statusBoolean: false,
          filtroControlStatus: false,
          filterControlCategorias: true,
        });

        filtragemCategorias(id);
      },

      setCategoriaString: ({ categoria }) => {
        set({
          filter: categoria,
          status: false,
        });
      },

      setStatus: ({ status }) => {
        const { filtragemStatus } = get();

        set({
          statusBoolean: status,
          filterId: "",
          filtroControlStatus: true,
          filterControlCategorias: false,
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
          filterId: "todas",
          filter: "",
          statusBoolean: false,
          status: false,
          dataFiltro: [...state.tasks].flat(),
          filtroControlStatus: false,
          filtroControlCategorias: false,
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
          filterSearch: "",
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
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([, value]) => typeof value !== "function")),
      name: "Rotina-store",
    },
  ),
);
