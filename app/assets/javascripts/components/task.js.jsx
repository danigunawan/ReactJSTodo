var Task = React.createClass({
  
  getInitialState() {
    return {
      task: this.props.task
    }
  },

  render() {
    return (
      <tr>
        <td>{this.state.task.name}</td>
        <td>{this.state.task.assignee}</td>
      </tr>      
    );
  }
});
