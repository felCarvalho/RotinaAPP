import { create } from "zustand";
import { persist } from "zustand/middleware";

interface tarefa {
  rotina: string;
  descricao: string;
  id: string;
  idUser: string;
  status: boolean;
  deletada: boolean;
  categoriaID: string;
  data: string;
}

interface data {
  categoria: string;
  id: string;
  idUser: string;
  tarefas: tarefa[];
}

interface dataCategoria {
  categoria: string;
  id: string;
  idUser: string;
}

enum typeStrings {
  todas = "todas",
  boolean = "boolean",
  string = "string",
}

type keys = string;
type value = boolean;

type statusFunction = Record<keys, value>;

interface functionTypes {
  setCategoria: (categoria: dataCategoria, id: string) => void;
  setCreateTask: (categoriaTask: dataCategoria) => void;
  buscarIdUserTask: () => tarefa[];
  buscarIdUserCategoria: () => dataCategoria[];
  deletarTasksUserConta: () => void;
  filtragemTasksCategorias: (filterId: string) => void;
  filtragemCategorias: ({ categoria }: { categoria: string }) => void;
  filtragemTasksStatus: (status: boolean | string | null) => void;
  searchTask: ({ search }: { search: string | null }) => void;
  updateStatus: ({ id }: { id: string }) => void;
  deletarTask: ({ id }: { id: string }) => void;
  renomearTask: ({ id, task }: { id: string; task: string }) => void;
  renomearCategoria: ({ newNameCategoria, id, newId }: { newNameCategoria: string; id: string; newId: string }) => void;
  restaurarTask: (taskID: string, categoriaID: string) => void;
  categoriaMenuDeletar: (categoriaID: string) => void;
  categoriaMenuIncompleta: (categoriaID: string) => void;
  categoriaMenuConcluida: (categoriaID: string) => void;
  categoriaMenuRestaurar: (categoriaID: string) => void;
  buscarCategoriaID: (categoriaID: string) => tarefa[];
  buscarTasksStatus: (categoriaID: string, status: boolean) => tarefa[];
  porcentagemTasksStatus: (categoriaID: string, status: boolean) => string;
  buscarTasksDeletadas: (categoriaID: string) => tarefa[];
  //setFilterSearch: ({ search }: { search: string }) => void;
  setStatusFunction: (boleano: statusFunction) => void;
  setDataTask: ({ task }: { task: tarefa }) => void;
  setUserID: ({ idUser }: { idUser: string }) => void;
  setCategoriaTask: ({ categoria, id }: { categoria: dataCategoria; id: string }) => void;
}

interface RotinaStoreTypes extends functionTypes {
  data: data[];
  tasks: tarefa[];
  categorias: dataCategoria[];
  dataFiltro: tarefa[];
  idUser: string;
  dataSearch: tarefa[];
  dataCategoriasFiltro: dataCategoria[];
  lixeira: tarefa[];
  categoriaTasks: dataCategoria;
  taskObj: tarefa;
  statusFunction: statusFunction;
  uuid: string;
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
      //
      dataCategoriasFiltro: [],
      //id do usuario atual
      idUser: "",
      //tasks do filtro de pesquisa
      dataSearch: [],
      //armazena todas as tasks deletadas
      lixeira: [],
      //ultima categoria criada
      categoriaTasks: {
        categoria: "",
        id: "",
        idUser: "",
      },
      //task atual
      taskObj: {
        rotina: "",
        descricao: "",
        id: "",
        idUser: "",
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
      //armazena id atual de categoria
      uuid: "",

      buscarIdUserTask: () => {
        const { tasks, idUser } = get();

        return tasks.filter((u) => u?.idUser === idUser);
      },

      buscarIdUserCategoria: () => {
        const { categorias, idUser } = get();

        return categorias.filter((u) => u?.idUser === idUser);
      },

      //armazenando categoria atual
      setCategoria: (categoriaTask) => {
        const { buscarIdUserCategoria } = get();

        const categorias = buscarIdUserCategoria();

        if (!categoriaTask?.categoria.trim() || !categoriaTask?.id.trim()) {
          return;
        }

        //verificamos se já existe uma categoria igual em categorias
        const controlCategoria = categorias.some((categoria) => categoria?.categoria === categoriaTask?.categoria);

        //negamos o true para false, e aplicamos a lógica para adicionar nova categoria sem perder as anteriores
        if (!controlCategoria) {
          return set((s) => ({
            categorias: [
              ...s.categorias,
              { categoria: categoriaTask?.categoria, id: categoriaTask?.id, idUser: categoriaTask?.idUser },
            ],
          }));
        }
      },

      //criando as taks novas de acordo com sua respectiva categoria
      setCreateTask: (categoriaTask) => {
        //seleciona todos os dados necessários para a função
        const { data, taskObj, uuid, idUser } = get();

        const verificarDataUserCategoria = data.filter((c) => c?.idUser === idUser);

        if (!categoriaTask?.categoria?.trim()) {
          return;
        }

        //retorna true se for igual
        const controlCategoria = verificarDataUserCategoria.some((categoria) => categoria.categoria === categoriaTask?.categoria);

        //armazena o ultimo data
        let createData: data[];

        //cria uma nova categoria para task se ela não existir
        if (!controlCategoria) {
          createData = [
            ...verificarDataUserCategoria,
            {
              categoria: categoriaTask?.categoria,
              id: categoriaTask?.id,
              idUser: categoriaTask?.idUser,
              tarefas: [{ ...taskObj, categoriaID: uuid }],
            },
          ];
        }

        //adiciona a task a uma categoria existente
        else {
          createData = verificarDataUserCategoria.map((data) => {
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
        set((s) => ({
          ...s,
          data: createData,
          tasks: tasks,
        }));
      },

      //especifico para deletar todas as tasks de um memo usuario
      deletarTasksUserConta: () => {
        const { data, tasks, idUser } = get();

        const deletarTasksUser = tasks.filter((t) => t?.idUser !== idUser);
        const deletarTasksDataUser = data.map((t) => ({ ...t, tarefas: [...deletarTasksUser] }));

        set((s) => ({
          ...s,
          data: deletarTasksDataUser,
          tasks: deletarTasksUser,
        }));
      },

      //função de filtragem de categorias e suas tasks
      filtragemTasksCategorias: (filter) => {
        //captura dados utilizados
        const { buscarIdUserCategoria, buscarIdUserTask } = get();

        const filterTodasUser = buscarIdUserTask();
        const filterCategoriasUser = buscarIdUserCategoria();

        if (filter === typeStrings?.todas) {
          set((s) => ({
            ...s,
            dataFiltro: filterTodasUser,
          }));
          return;
        }

        const verificandoCategoriaFilter = filterCategoriasUser.some((c) => c?.categoria === filter);

        if (verificandoCategoriaFilter) {
          const buscarCategoriaID = filterCategoriasUser.find((c) => c?.categoria === filter)?.id ?? null;

          if (buscarCategoriaID) {
            const buscarTasksCategoria = filterTodasUser.filter((t) => t?.categoriaID === buscarCategoriaID);
            set((s) => ({
              ...s,
              dataFiltro: buscarTasksCategoria,
            }));
          }
        }
      },

      //função de filtro por status
      filtragemTasksStatus: (status) => {
        const { buscarIdUserTask } = get();

        const filterUser = buscarIdUserTask();

        if (status === typeStrings?.todas) {
          set((s) => ({
            ...s,
            dataFiltro: filterUser,
          }));
          return;
        }

        if (typeof status === typeStrings?.boolean) {
          const filterStatus = filterUser.filter((s) => s?.status === status);

          set((s) => ({
            ...s,
            dataFiltro: filterStatus,
          }));
        }
      },

      filtragemCategorias: ({ categoria }) => {
        const { buscarIdUserCategoria } = get();

        const buscandoCategorias = buscarIdUserCategoria();

        if (categoria === typeStrings?.todas) {
          set((s) => ({
            ...s,
            dataCategoriasFiltro: buscandoCategorias,
          }));
          return;
        }

        const verificarDataCategoriaID = buscandoCategorias.some((c) => c.categoria === categoria);

        if (verificarDataCategoriaID) {
          const buscarCategoriaFiltrada = buscandoCategorias.filter((c) => c?.categoria === categoria);
          set((s) => ({
            ...s,
            dataCategoriasFiltro: buscarCategoriaFiltrada,
          }));
        }
      },

      searchTask: ({ search }) => {
        const { buscarIdUserTask } = get();

        if (search === null || !search.trim()) {
          set((s) => ({
            ...s,
            dataSearch: [],
          }));
          return;
        }

        const searchTasksUser = buscarIdUserTask();
        const buscandoIncludesSearch = searchTasksUser.filter((s) => s?.rotina.toLowerCase().includes(search.toLowerCase()));

        if (buscandoIncludesSearch.length > 0) {
          set((s) => ({
            ...s,
            dataSearch: buscandoIncludesSearch,
          }));
        }
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
          dataSearch: tasksUpdate,
        });
      },

      //função de deletar teask
      deletarTask: ({ id }) => {
        const { data, buscarIdUserTask } = get();

        const taskUserId = buscarIdUserTask();

        const deleteData = data.map((c) => ({
          ...c,
          tarefas: c.tarefas.filter((t) => t.id !== id),
        }));

        const deleteTasks = taskUserId.filter((t) => t?.id !== id);

        const deleteLixeira = taskUserId.filter((t) => t.id === id);

        set((state) => ({
          data: deleteData,
          tasks: deleteTasks,
          lixeira: [...state.lixeira, deleteLixeira].flat(),
          dataFiltro: deleteTasks,
          dataSearch: deleteTasks,
        }));
      },

      //renomeia todas a tasks requisitadas
      renomearTask: ({ task, id }) => {
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
      },

      renomearCategoria: ({ newNameCategoria, id, newId }) => {
        const { buscarIdUserCategoria, buscarIdUserTask, data, lixeira } = get();

        const verificandoCategoria = !newNameCategoria.trim();
        const verificandoID = !id.trim();

        if (verificandoCategoria && verificandoID) {
          return;
        }

        const buscandoCategoriasID = buscarIdUserCategoria();
        const buscandoTaskCastegoriaID = buscarIdUserTask();
        const renomearCategoriaData = data.map((c) => (c?.id === id ? { ...c, categoria: newNameCategoria, id: newId } : c));
        const renomearCategoria = buscandoCategoriasID.map((c) =>
          c?.id === id ? { ...c, categoria: newNameCategoria, id: newId } : c,
        );
        const renomearTasksCategoriaID = buscandoTaskCastegoriaID.map((t) =>
          t?.categoriaID === id ? { ...t, categoriaID: newId } : t,
        );
        const renomearTasksLixeiraCategoriaID = lixeira.map((t) => (t?.categoriaID === id ? { ...t, categoriaID: newId } : t));

        set((s) => ({
          ...s,
          data: renomearCategoriaData,
          categorias: renomearCategoria,
          tasks: renomearTasksCategoriaID,
          lixeira: renomearTasksLixeiraCategoriaID,
        }));
      },

      //restaurando tasks deletadas
      restaurarTask: (taskID, categoriaID) => {
        const { data, lixeira } = get();

        const buscaTask = lixeira.filter((t) => t.id === taskID);

        const restaurarLixeira = lixeira.filter((t) => t.id !== taskID);

        const restaurarDataLixeira = data.map((d) => {
          return d?.id === categoriaID ? { ...d, tarefas: [...d.tarefas, ...buscaTask] } : d;
        });

        set(
          (state) =>
            ({
              data: restaurarDataLixeira,
              lixeira: restaurarLixeira,
              tasks: [...state.tasks, ...buscaTask].flat(),
              dataFiltro: [...state.dataFiltro, ...buscaTask].flat(),
              dataSearch: [...state.dataSearch, ...buscaTask].flat(),
            }) as Partial<RotinaStoreTypes>,
        );
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
      },

      categoriaMenuRestaurar: (categoriaID) => {
        const { data, lixeira } = get();

        const buscarTasks = lixeira.filter((t) => t.categoriaID === categoriaID);

        const restaurarLixeira = lixeira.filter((t) => t.categoriaID !== categoriaID);

        const restaurarData = data.map((c) => {
          return c.id === categoriaID ? { ...c, tarefas: [...c.tarefas, ...buscarTasks] } : c;
        });

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
      },

      buscarCategoriaID: (categoriaID) => {
        const { tasks } = get();

        return tasks.filter((c) => c.categoriaID === categoriaID);
      },

      buscarTasksStatus: (categoriaID, status) => {
        const { buscarCategoriaID } = get();

        const tasksStatus = buscarCategoriaID(categoriaID).filter((s) => s.status === status);

        return tasksStatus;
      },

      porcentagemTasksStatus: (categoriaID, status) => {
        const { buscarCategoriaID, buscarTasksStatus } = get();

        const categoria = buscarCategoriaID(categoriaID);
        const statusTask = buscarTasksStatus(categoriaID, status);

        const total = categoria.length ? (statusTask.length / categoria.length) * 100 : 0;

        return `${total}%`;
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

      setUserID: ({ idUser }) =>
        set((s) => ({
          ...s,
          idUser: idUser,
        })),
    }),

    {
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([, value]) => typeof value !== "function")),
      name: "Rotina-store",
    },
  ),
);
