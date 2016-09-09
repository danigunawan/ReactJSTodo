var FormDisplay = React.createClass({
  getInitialState(){
    return {
      tasks: this.props.tasks,
      users: this.props.users,
      task: {
        name: '',
        user_id: ''
      },
      showForm: true
    }
  },
  
  handleNameChange(event){
    var newTask = this.state.task;
    newTask.name = event.target.value
    this.setState({task: newTask})
  },
  
  handleAssigneeChange(event){
    var newTask = this.state.task;
    newTask.user_id = event.target.value
    this.setState({task: newTask})
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
            user_id: '',
          },
          showForm: false
        });
        that.props.onAddTask(newTaskList, that.state.task, that.state.showForm)
        Materialize.toast('Task Added!', 4000)
      }
    });
  },
  
  render(){
    return(
      <div>
        <input type = 'text' value={this.state.task.name} onChange={this.handleNameChange} /><br/>
        <input type = 'text' value={this.state.task.assignee} onChange={this.handleAssigneeChange} /><br/>
        <button className="btn waves-effect waves-light" onClick={this.addTask}>Add Task</button>
      </div>
    );
  }
});
