import React, { Component } from "react";
import "./ListingTask.scss";
import axios from 'axios';
class ListingTask extends Component {
  state = {
    task: [],
    category: []
  }

  render() {
    return (
      // this.state.task.length === 0 ? <div></div> :
      <>
        <section className="tasks">
          <div className="tasks__container">
            <h2 className="tasks__category">Category</h2>
            <div className="task">
              <p className="task__content">Content</p>
              <p className="task__priority">Priority</p>
              <p className="task__date">Due Date</p>
              <button className="task__button">Delete</button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ListingTask;
