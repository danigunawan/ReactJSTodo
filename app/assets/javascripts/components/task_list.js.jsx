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
        that.setState({
          tasks: res, 
          task: {
            name: '',
            assignee: '',
          }
        });
      }
    });
    
  },
  
  handleNameChange(e){
    var newTask = this.state.task;
    newTask.name = e.target.value
    this.setState({task: newTask})
  },
  
  handleAssigneeChange(e){
    var newTask = this.state.task;
    newTask.assignee = e.target.value
    this.setState({task: newTask})
  },

  render() {
    var that = this;
    tasks = this.state.tasks.map(function(task){
      return (
        <Task key={task.id} task={task} />
      );
    });
      return (
        <div>
          <table>
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
                <input type = 'text' value={this.state.task.name} onChange={this.handleNameChange} /><br/>
                <input type = 'text' value={this.state.task.assignee} onChange={this.handleAssigneeChange} /><br/>
                <button onClick={this.addTask}>Hire</button>
          </div>
        </div>
      );
  }
});
