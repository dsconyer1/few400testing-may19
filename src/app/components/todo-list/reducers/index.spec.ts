import * as actions from '../actions/list.actions';
import * as fromReducer from './index';
import * as rootReducer from '../../../reducers';

describe('the reducer', () => {
  it('adding to an empty state', () => {
    const initialState = fromReducer.adapter.getInitialState({ completedIds: [] });

    const action: actions.AddedItem = {
      type: actions.ITEM_ADDED,
      item: {
        id: '42',
        description: 'tacos'
      }
    };

    const resultState = fromReducer.reducer(initialState, action);

    expect(resultState).toEqual({
      ids: ['42'],
      entities: {
        42: {
          id: '42',
          description: 'tacos'
        }
      },
      completedIds: []
    });



  });

  it('adding an item to the state when there is some data in it', () => {
    const initialState: fromReducer.State = {
      ids: ['42'],
      entities: {
        42: {
          id: '42',
          description: 'tacos'
        }
      },
      completedIds: []
    };

    const action: actions.AddedItem = {
      type: actions.ITEM_ADDED,
      item: {
        id: '19',
        description: 'beer'
      }
    };

    const resultState = fromReducer.reducer(initialState, action);
    expect(resultState).toEqual({
      ids: ['42', '19'],
      entities: {
        42: {
          id: '42',
          description: 'tacos'
        },
        19: {
          id: '19',
          description: 'beer'
        }
      },
      completedIds: []
    });
  });
  describe('marking an item as complete', () => {
    it('can be done', () => {
      const initialState: fromReducer.State = {
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: []
      };

      const action: actions.CompletedItem = {
        type: actions.ITEM_COMPLETED,
        item: {
          id: '42',
          description: 'tacos'
        }
      };

      const result = fromReducer.reducer(initialState, action);

      expect(result).toEqual({
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: ['42']
      });
    });

  });

  describe('selectors', () => {
    const initialState: rootReducer.State = {
      todos: {
        ids: [
          '1',
          '2',
          'T0'
        ],
        entities: {
          '1': {
            id: '1',
            description: 'Clean Garage'
          },
          '2': {
            id: '2',
            description: 'Finish Daryl\'s Deck'
          },
          T0: {
            id: 'T0',
            description: 'Pizza'
          }
        },
        completedIds: [
          '1'
        ]
      }
    };

    it('has a feature selector that returns the todos', () => {
      const todoState = fromReducer._selectTodosFeature(initialState);

      expect(todoState).toEqual({
        ids: [
          '1',
          '2',
          'T0'
        ],
        entities: {
          '1': {
            id: '1',
            description: 'Clean Garage'
          },
          '2': {
            id: '2',
            description: 'Finish Daryl\'s Deck'
          },
          T0: {
            id: 'T0',
            description: 'Pizza'
          }
        },
        completedIds: [
          '1'
        ]
      });
    });

    it('can get the completed ids', () => {
      const completedIds = fromReducer._selectCompletedIds(initialState);

      expect(completedIds).toEqual(['1']);
    });

    it('can give you teh model for the component', () => {
      const model = fromReducer.selectTodoListItems(initialState);

      expect(model).toEqual([
         {
          id: '1',
          description: 'Clean Garage',
          completed: true,
          temporary: false
        },
        {
          id: '2',
          description: 'Finish Daryl\'s Deck',
          completed: false,
          temporary: false
        },
        {
          id: 'T0',
          description: 'Pizza',
          completed: false,
          temporary: true
    }]);
  });
});

});
