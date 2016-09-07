var Task = React.createClass({
  
  getInitialState() {
    return {
      task: this.props.task,
      editing: false,
    }
  },

  updateTask(){
    var that = this;
    
    $.ajax({
      method: 'PUT',
      data: { 
        task: that.state.task 
      },
      url: '/tasks/' + that.state.task.id + '.json',
      success: function(res) {
        that.setState({
          task: res,
          editing: false
        });
      }
    });
  },
  
  deleteTask() {
    var that = this;
    
    if (confirm('Are you sure you want to remove this task?')){
      $.ajax({
        method: 'DELETE',
        url: '/tasks/' + that.state.task.id + '.json',
        success: function(res) {
          that.props.onDeleteTask(that.state.task)
        }
      });
    }
  },
  
  handleNameChange(event){
    var newTask = this.state.task
    newTask.name = event.target.value
    this.setState({task: newTask})
  },
  
  handleAssigneeChange(event){
    var newTask = this.state.task
    newTask.assignee = event.target.value
    this.setState({task: newTask})
  },
  
  
  changeEditing(){
    this.setState({editing: true})
  },
  
  render() {
    if(this.state.editing){
      display = (
        <tr>
        <td><input type = 'text' value={this.state.task.name} onChange={this.handleNameChange} /></td>
        <td><input type = 'text' value={this.state.task.assignee} onChange={this.handleAssigneeChange} /></td>
        <td><button onClick={this.updateTask}>Update</button></td>
        <td><button onClick={this.deleteTask}>Remove</button></td>
        </tr>     
      );
    }
    else{
      display = (
      <tr>
        <td>{this.state.task.name}</td>
        <td>{this.state.task.assignee}</td>
        <td><button onClick={this.changeEditing}>Edit</button></td>
        <td><button onClick={this.deleteTask}>Remove</button></td>
      </tr>     
      );
    }
    return display;
  }
});
