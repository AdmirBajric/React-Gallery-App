import React, { Component } from "react";
// Components
import Photo from "./Photo";
import NotFoundSearch from "./NotFoundSearch";

class PhotoContainer extends Component {
  render() {
    // Creating variables to store title, jsx-component
    let jsx = "";
    let title;
    let url = this.props.props.match.url;

    const data = this.props.data;
    let newData = [];
    // Loop over the object and store in a array
    for (const key in data) {
      const element = data[key];
      newData.push(element);
    }
    // If no data then render notfound search component
    if (newData.length === 0) {
      jsx = <NotFoundSearch />;
    } else if (newData.length > 0) {
      // If data exist render component to show images
      jsx = newData.map((item) => <Photo data={item} key={item.id} />);
      if (url.startsWith("/search")) {
        title = `${url.slice(8)} Images`;
      } else {
        title = `${url.slice(1)} Images`;
      }
    }

    return (
      <div className="photo-container">
        {newData.length === 0 ? null : <h2>{title}</h2>}
        <ul>{jsx}</ul>
      </div>
    );
  }
}

export default PhotoContainer;
