import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, fetchTodos, Todo } from './actions';
import './App.css';
import { StoreState } from './reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

const _App: React.FC<AppProps> = (props: AppProps) => {
  const { todos, fetchTodos, deleteTodo } = props;

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (todos && todos.length > 0) {
      setFetching(false);
    }
  }, [todos, setFetching]);

  const renderList = (): JSX.Element[] => {
    return todos.map((todo: Todo) => (
      <div key={todo.id} onClick={() => deleteTodo(todo.id)}>
        {todo.title}
      </div>
    ));
  };

  const onButtonClick = (): void => {
    fetchTodos();
    setFetching(true);
  };

  return (
    <div>
      <button onClick={onButtonClick}>Fetch</button>
      {fetching ? 'LOADING' : null}
      {renderList()}
    </div>
  );
};

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
  return { todos: state.todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
