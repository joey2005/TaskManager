import React, { Component } from "react";
import "./ListingTask.scss";

class ListingTask extends Component {
  render() {
    return (
      <>
        <section className="tasks">
          <div className="tasks__container">
            <h2 className="tasks__category">Category</h2>
            <div className="task">
              <p className="task__content">Content</p>
              <p className="task__priority">Priority</p>
              <p className="task__date">Due Date</p>
              <button className="task__btton">Delete</button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ListingTask;
