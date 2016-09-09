var Task = React.createClass({
  
  getInitialState() {
    return {
      task: this.props.task,
      users: this.props.users,
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
        Materialize.toast('Task Updated!', 4000)
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
          Materialize.toast('Task Deleted!', 4000)
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
    newTask.user_id = event.target.value
    this.setState({task: newTask})
  },
  
  
  changeEditing(){
    this.setState({editing: true})
  },
  
  render() {
    var that = this
    var user = ''
    
    var options = this.state.users.map(function(val, index){
      if (that.state.task.user_id == val.id){
        user = val
      }
      return(<option key = {index} value = {val.id}>{val.name}</option>)
    });
    
    if(this.state.editing){
      display = (
        <tr>
        <td><input type = 'text' value={this.state.task.name} onChange={this.handleNameChange} /></td>
        <td>
        <div className='input-field'>
          <label>Materialize Select</label>
          <select>
            {options}
          </select>
        </div>
        </td>
        <td>
        <button className='btn waves-effect waves-light' onClick={this.updateTask}>Update</button>
        <button className='btn waves-effect red lighten-1' onClick={this.deleteTask}>Remove</button>
        </td>
        </tr>     
      );
    }
    else{
      display = (
      <tr>
        <td>{this.state.task.name}</td>
        <td>{user.name}</td>
        <td>
        <button className='btn waves-effect waves-light' onClick={this.changeEditing}>Edit</button>
        <button className='btn waves-effect red lighten-1' onClick={this.deleteTask}>Remove</button>
        </td>
      </tr>     
      );
    }
    return display;
  }
});
