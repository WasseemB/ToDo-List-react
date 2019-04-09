import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddToDo from './components/AddToDo';
import About from './components/pages/About';
import axios from 'axios';
//import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
    todos: []
  };

  async componentDidMount() {
    const res = await axios.get(
      'https://jsonplaceholder.typicode.com/todos?_limit=10'
    );
    this.setState({ todos: res.data });
  }
  //delete todo
  delTodo = async id => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = 'deleted';
        }
        return todo;
      })
    });
  };
  //addTodo

  addTodo = async title => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    });
    this.setState({
      todos: [...this.state.todos, res.data]
    });
  };
  //toggle complete
  markComplete = id => {
    //console.log(id);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              path="/"
              exact
              render={props => (
                <React.Fragment>
                  <AddToDo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
