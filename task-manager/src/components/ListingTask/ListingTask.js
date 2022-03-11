import React, { Component } from "react";
import "./ListingTask.scss";
import axios from 'axios';
class ListingTask extends Component {
  state = {
    task: [],
    category: []
  }
  componentDidMount(){
    axios
    .get('http://localhost:56789/tasks')
    .then(res => {
      const categoryList = [];
      res.data.forEach(element => {
        if (!categoryList.find(category =>{
          return category===element.category
        })){ categoryList.push(element.category);
           const index = categoryList.indexOf(category =>{
            return category===element.category
          }
           )
      });
      console.log(res)}
    )}
  render() {
    return (
      this.state.task.length === 0 ? <div></div> :
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
