import { produce } from 'immer';
import { useEffect, useMemo, useReducer } from 'react';

type SvgProps = React.SVGProps<SVGSVGElement>;
type SvgComponent = React.ComponentType<SvgProps>;

export type PaletteState = State;
export type PaletteItem = Item;
export type PaletteContext = Context;

export type CommandPalette = ReturnType<typeof useCommandPalette>;

const initialState: State = {
  loading: false,
  items: [],
  contexts: [],
  highlightedIndex: 0,
  input: {
    Icon: null,
    placeholder: '',
    value: '',
  },
  stack: [],
};

type UseCommandPaletteProps = {
  initialize: (palette: CommandPalette) => void;
  onError: (error: unknown) => void;
  onSuccess: () => void;
};

export function useCommandPalette({ initialize, onError, onSuccess }: UseCommandPaletteProps) {
  const [state, dispatch] = useReducer(produce(producer), initialState);

  const palette = useMemo(() => {
    const { input, loading, contexts, items, highlightedIndex, stack } = state;
    const filteredItems = filterItems(items, contexts, input.value);
    const filteredContexts = filterContexts(contexts, filteredItems);

    return {
      input,
      loading,
      items: filteredItems,
      contexts: filteredContexts,
      highlightedIndex: highlightedIndex,
      highlightedItem: filteredItems.at(highlightedIndex),
      canGoBack: stack.length > 0,

      reset: () => {
        dispatch({ type: 'reset' });
        initialize(palette);
      },

      addItem: (item: Omit<Item, 'id' | 'contextId'>) => {
        const id = createId();

        dispatch({ type: 'addItem', item: { id, ...item } });

        return {
          remove: () => {
            dispatch({ type: 'removeItem', id });
          },
        };
      },

      addGroup: (context: Omit<Context, 'id'>) => {
        const id = createId();

        dispatch({ type: 'addContext', context: { id, ...context } });

        return {
          addItem: (item: Omit<Item, 'id' | 'contextId'>) => {
            dispatch({ type: 'addItem', item: { id: createId(), contextId: id, ...item } });
          },
          remove: () => {
            dispatch({ type: 'removeContext', id });
          },
        };
      },

      setHighlightedIndex: (highlightedIndex: number) => {
        dispatch({ type: 'setHighlightedIndex', highlightedIndex });
      },

      setIcon: (Icon: SvgComponent) => {
        dispatch({ type: 'setInput', input: { Icon } });
      },

      setPlaceholder: (placeholder: string) => {
        dispatch({ type: 'setInput', input: { placeholder } });
      },

      setInputValue: (value: string) => {
        dispatch({ type: 'setInput', input: { value } });
      },

      push: () => {
        dispatch({ type: 'push' });
      },

      pop: () => {
        dispatch({ type: 'pop' });
      },

      execute: async (item: Item) => {
        dispatch({ type: 'setLoading', loading: true });

        if (item.hasSubItems) {
          dispatch({ type: 'push' });
        }

        try {
          await item.execute();

          if (!item.hasSubItems) {
            onSuccess();
          }
        } catch (error) {
          onError(error);
        } finally {
          dispatch({ type: 'setLoading', loading: false });
        }
      },
    };
    // assuming that initialize, onSuccess and onError are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    initialize(palette);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return palette;
}

function filterItems(items: Item[], contexts: Context[], inputValue: string) {
  const contextIds: Array<string | undefined> = contexts.map((context) => context.id);
  const sortedItems = sortBy(items, (item) => contextIds.indexOf(item.contextId));
  const search = normalize(inputValue);

  return sortedItems.filter((item) => {
    return normalize(item.label).includes(search) || normalize(item.description ?? '').includes(search);
  });
}

function filterContexts(contexts: Context[], filteredItems: Item[]) {
  const filteredContextIds = new Set(filteredItems.map((item) => item.contextId));

  return contexts.filter((context) => {
    return filteredContextIds.has(context.id);
  });
}

type Item = {
  id: string;
  contextId?: string;
  label: string;
  description?: string;
  Icon?: SvgComponent;
  hasSubItems?: boolean;
  shortcut?: string;
  execute: () => unknown;
};

type Context = {
  id: string;
  label: string;
};

type State = {
  loading: boolean;
  items: Item[];
  contexts: Context[];
  highlightedIndex: number;
  input: {
    Icon: SvgComponent | null;
    placeholder: string;
    value: string;
  };
  stack: Array<{
    items: Item[];
    contexts: Context[];
    input: {
      Icon: SvgComponent | null;
      placeholder: string;
    };
  }>;
};

type Action =
  | { type: 'reset' }
  | { type: 'setLoading'; loading: boolean }
  | { type: 'setInput'; input: Partial<State['input']> }
  | { type: 'addItem'; item: Item }
  | { type: 'removeItem'; id: string }
  | { type: 'addContext'; context: Context }
  | { type: 'removeContext'; id: string }
  | { type: 'setHighlightedIndex'; highlightedIndex: number }
  | { type: 'push' }
  | { type: 'pop' };

function producer(state: State, action: Action): State {
  if (action.type === 'reset') {
    return initialState;
  }

  if (action.type === 'setLoading') {
    state.loading = action.loading;
  }

  if (action.type === 'setInput') {
    Object.assign(state.input, action.input);
  }

  if (action.type === 'addItem') {
    state.items.push(action.item);
  }

  if (action.type === 'removeItem') {
    state.items = state.items.filter(not(has('id', action.id)));
  }

  if (action.type === 'addContext') {
    state.contexts.push(action.context);
  }

  if (action.type === 'removeContext') {
    state.contexts = state.contexts.filter(not(has('id', action.id)));
    state.items = state.items.filter(not(has('contextId', action.id)));
  }

  if (action.type === 'setHighlightedIndex') {
    state.highlightedIndex = action.highlightedIndex;
  }

  if (action.type === 'push') {
    state.stack.push({
      items: state.items,
      contexts: state.contexts,
      input: {
        Icon: state.input.Icon,
        placeholder: state.input.placeholder,
      },
    });

    state.input.value = '';
    state.items = [];
    state.contexts = [];
    state.highlightedIndex = 0;
  }

  if (action.type === 'pop') {
    const result = state.stack.pop();

    if (result) {
      state.input = { ...result.input, value: '' };
      state.items = result.items;
      state.contexts = result.contexts;
      state.highlightedIndex = 0;
    }
  }

  return state;
}

function createId() {
  return Math.random().toString(36).slice(-8);
}

function sortBy<T>(array: T[], fn: (value: T) => number) {
  return array.slice().sort((a, b) => fn(a) - fn(b));
}

function has<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(key: K, value: T[K]) {
  return (obj: T) => obj[key] === value;
}

function not<Args extends unknown[]>(predicate: (...args: Args) => boolean) {
  return (...args: Args) => !predicate(...args);
}

function normalize(str: string) {
  return normalizeDiacriticCharacters(str).toLowerCase();
}

function normalizeDiacriticCharacters(string: string) {
  return string.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
