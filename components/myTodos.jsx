/*
  Implementar el check de cada tarea.
  
  TIP: el componente Task debe recibir un evento de cuando es modificado
  ya que el cambio se debe realizar en la lista de tasks (en el estado de este componente)
*/

import React, { Component } from 'react';

import { fetchApi } from '../service';
import Task from './task';

class MyTodos extends Component {
  constructor() {
    this.state = {
      isLoading: true,
      tasks: [],
      searchCriteria: '',
      filterTasks: [],
    };
  }

  componentDidMount() {
    fetchApi()
      .then(data => {
        this.setState({ 
          isLoading: false, 
          tasks: data,
          filterTasks: data,
        });
      });
  }

  onChangeName = e => this.setState({ newName: e.target.value })

  onChangeSearchCriteria = e => this.setState({
      searchCriteria: e.target.value,
      filterTasks: this.state.tasks.filter(task  => task.title.includes(e.target.value))
    })

  onHandleCheck = id => e => {
    this.setState({
      filterTasks: this.state.tasks.map(task => 
      task.id == id ?
       { ...task, completed: e.target.checked} :
       task
      ),
      tasks: this.state.tasks.map(task => 
      task.id == id ?
       { ...task, completed: e.target.checked} :
       task
      ),
    });
  }

  onHandleDelete = id => () => {
    this.setState({
      filterTasks: [...this.state.tasks].filter(task => task.id !== id),
      tasks: [...this.state.tasks].filter(task => task.id !== id)
    })
  }

  onHandleEdit = id => e => {
    this.setState({
      filterTasks: this.state.tasks.map(task => 
      task.id == id ?
       { ...task, title: e.target.value} :
       task
      ),
      tasks: this.state.tasks.map(task => 
      task.id == id ?
       { ...task, title: e.target.value} :
       task
      ),
    });
  }
  
  addTask = () => this.setState({
    tasks: [...this.state.tasks, { title: this.state.newName }],
    newName: ''
  })

  render() {
    let { isLoading, tasks, newName, searchCriteria, onChangeSearchCriteria, filterTasks, onHandleDelete, onHandleEdit } = this.state;
    if (isLoading) return "LOADING ...";

    return (
      <div>
        <input type="text" value={newName} onChange={this.onChangeName} />
        <button onClick={this.addTask}>Add</button>
        <br />
        <input type="text" value={searchCriteria} onChange={this.onChangeSearchCriteria} />
        <br/>
        {tasks && tasks.length ? 
          <ul>
            {filterTasks.map(({ id, ...task }) => (
              <Task 
                key={id} {...task} 
                onHandleChange={this.onHandleCheck(id)}
                onHandleDelete={this.onHandleDelete(id)}
                onHandleEdit={this.onHandleEdit(id)}
              />
            ))}
          </ul>
          : 'Sin Tareas'
        }
      </div>
    );
  }
}

export default MyTodos;