var TaskList = React.createClass({
  
  getInitialState(){
    return {
      tasks: this.props.tasks,
      users: this.props.users,
      task: {
        name: '',
        user_id: ''
      },
      showForm: false,
      formButtonName: "Display Form"
    }
  },
  
  displayForm(){
    this.setState({showForm: !this.state.showForm})
    this.setState({formButtonName: "Hide Form"})
  },
  
  handleDeleteTask(task) {
      var taskList = this.state.tasks.filter(function(item){
        return task.id != item.id
      });
      this.setState({tasks: taskList});
  },
  
  handleAddTask(taskList, task, showForm){
    this.setState({tasks: taskList});
    this.setState({task: task});
    showForm ? this.setState({formButtonName: "Hide Form"}) : this.setState({formButtonName: "Display Form"})
    this.setState({showForm: showForm});
  },

  render() {
    var that = this;
    this.state.showForm ? form = <FormDisplay tasks={this.state.tasks} users={this.state.users} onAddTask={that.handleAddTask} /> : form = null
    tasks = this.state.tasks.map(function(task){
      return (
        <Task key={task.id} task={task} users={that.state.users} onDeleteTask={that.handleDeleteTask} />
      );
    });
      return (
        <div>        
          <h3>Todo-List</h3>
         <div className='row'>
           <div className='col s4 l4 m4'>
             Task
           </div>
           <div className='col s4 l4 m4'>
             Task
           </div>
           <div className='col s4 l4 m4'>
             Actions
           </div>        
         </div>
        
            {tasks}
          <div className='row'>
              <button className="btn waves-effect waves-light" onClick = {this.displayForm}>{this.state.formButtonName}</button>
              {form}
          </div>
        </div>
      );
  }
});