var TaskList = React.createClass({
  
  getInitialState(){
    return {
      tasks: this.props.tasks,
      task: {
        name: '',
        assignee: ''
      }
    }
  },
  
  addTask(){
    var that = this;
    
    $.ajax({
      method: 'POST',
      data: { 
        task: that.state.task 
      },
      url: '/tasks.json',
      success: function(res) {
        var newTaskList = that.state.tasks
        newTaskList.push(res)
        that.setState({
          tasks: newTaskList, 
          task: {
            name: '',
            assignee: '',
          }
        });
      }
    });
  },
  
  handleNameChange(event){
    var newTask = this.state.task;
    newTask.name = event.target.value
    this.setState({task: newTask})
  },
  
  handleAssigneeChange(event){
    var newTask = this.state.task;
    newTask.assignee = event.target.value
    this.setState({task: newTask})
  },
  
  handleDeleteTask(task) {
      var taskList = this.state.tasks.filter(function(item){
        return task.id != item.id
      });
      this.setState({tasks: taskList});
  },

  render() {
    var that = this;
    tasks = this.state.tasks.map(function(task){
      return (
        <Task key={task.id} task={task} onDeleteTask={that.handleDeleteTask} />
      );
    });
      return (
        <div>
          <h3>Todo-List</h3>
          <table class = 'table-responsive table-striped table-bordered'>
            <thead>
              <tr>
                <th>Task</th>
                <th>Assignee</th>
              </tr>
            </thead>
            <tbody>
              {tasks}
            </tbody>  
          </table>
              
          <div>
              <button type = 'button'></button>
              <div>
                <input type = 'text' value={this.state.task.name} onChange={this.handleNameChange} /><br/>
                <input type = 'text' value={this.state.task.assignee} onChange={this.handleAssigneeChange} /><br/>
                <button onClick={this.addTask}>Add Task</button>
              </div>
          </div>
        </div>
      );
  }
});
