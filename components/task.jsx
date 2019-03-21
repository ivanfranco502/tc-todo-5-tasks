import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component{
  constructor(props){
    super(props);
  }

  onCheck = e => {
    this.props.onHandleChange(e);
  }

  onClick = e =>{
    this.props.onHandleDelete(e);
  }

  render(){
    let { title, completed, id } = this.props;
    return(
      <li>
        <label>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={this.onCheck}
          />
          {title}
        </label>
        <button onClick={this.onClick}>X</button>
      </li>
    );
  }
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool
};

Task.defaultProps = {
  completed: false
};

export default Task;