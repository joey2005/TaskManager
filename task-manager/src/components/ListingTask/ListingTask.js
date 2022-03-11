import React, { Component } from "react";
import "./ListingTask.scss";
import axios from 'axios';
class ListingTask extends Component {
  state = {
    categoryList: []
  }

  componentDidMount() {
    axios.get('http://localhost:56789/tasks')
      .then((res) => {
        const categoryList = [];
        res.data.forEach((task) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categoryList } = this.state;
    console.log(categoryList.length);

    return (
      categoryList.length === 0 ?
      <></> :
      <div className="tasks">
        {
          categoryList.map((category) => {
            return (
              <div className="tasks__container">
                <h2 className="tasks__category">
                  {category.categoryName}
                </h2>
                {
                  category.tasks.map((task) => {
                    return (
                      <div className="task">
                        <p className="task__content">
                          {task.content}
                        </p>
                        <p className="task__priority">
                          Level {task.priority}
                        </p>
                        <p className="task__date">
                          {new Date(task.due).toLocaleDateString('en-US')}
                        </p>
                        <button className="task__button">
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
