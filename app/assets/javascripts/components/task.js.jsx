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
        <div className='row'>
          <div className='col s4 l4 m4'>
            <div className = 'input-field'>
              <input type = 'text' value={this.state.task.name} onChange={this.handleNameChange} />
            </div>
          </div>
          <div className='col s4 l4 m4'>
            <div className='input-field'>
              <select id = 'user_id' className='browser-default' onChange={this.handleAssigneeChange}>
                <option value="" disabled selected>Choose your option</option>
                {options}
              </select>
            </div>
          </div>
          <div className='col s4 l4 m4'>
            <div className='input-field'>
              <button className='btn waves-effect waves-light' onClick={this.updateTask}>Update</button>
              <button className='btn waves-effect red lighten-1' onClick={this.deleteTask}>Remove</button>
            </div>
          </div>
        </div> 
      );
    }
    else{
      display = (
      <div className='row'>
        <div className='col s4 l4 m4'>{this.state.task.name}</div>
        <div className='col s4 l4 m4'>{user.name}</div>
        <div className='col s4 l4 m4'>
        <button className='btn waves-effect waves-light' onClick={this.changeEditing}>Edit</button>
        <button className='btn waves-effect red lighten-1' onClick={this.deleteTask}>Remove</button>
        </div>
      </div>     
      );
    }
    return display;
  }
});
