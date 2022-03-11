import React, { Component } from "react";
import "./ListingTask.scss";
import axios from 'axios';
class ListingTask extends Component {
  state = {
    categoryList: []
  }

  sortTasksByCategory(data) {
    const categoryList = [];
    data.forEach((task) => {
      const currentCategory = task.category;
      let categoryExsited = false;
      for (let i = 0; i < categoryList.length; ++i) {
        if (categoryList[i].categoryName === currentCategory) {
          categoryList[i].tasks.push(task);
          categoryExsited = true;
          break;
        }
      }
      if (!categoryExsited) {
        const newCategory = {
          categoryName: currentCategory,
          tasks: [task]
        };
        categoryList.push(newCategory);
      }
    })
    this.setState({ categoryList });
  }

  componentDidMount() {
    axios.get('http://localhost:56789/tasks')
      .then((response) => {
        this.sortTasksByCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (event) => {
    event.preventDefault();
    const taskDiv = event.target.closest(".task");
    for (let i = 0; i < taskDiv.attributes.length; ++i) {
      const { name, value } = taskDiv.attributes[i];
      if (name === "id") {
        axios.delete(`http://localhost:56789/tasks/${value}`)
          .then((response) => {
            this.sortTasksByCategory(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  render() {
    const { categoryList } = this.state;
    return (
      categoryList.length === 0 ?
      <></> :
      <div className="tasks">
        {
          categoryList.map((category) => {
            return (
              <div
                className="tasks__container"
                key={category.categoryName}
              >
                <h2 className="tasks__category">
                  {category.categoryName}
                </h2>
                {
                  category.tasks.map((task) => {
                    return (
                      <div
                        className="task"
                        id={task.id}
                        key={task.id}
                      >
                        <p className="task__content">
                          {task.content}
                        </p>
                        <p className="task__priority">
                          Level {task.priority}
                        </p>
                        <p className="task__date">
                          {new Date(task.due).toLocaleDateString('en-US')}
                        </p>
                        <button
                          className="task__button"
                          onClick={this.handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default ListingTask;
