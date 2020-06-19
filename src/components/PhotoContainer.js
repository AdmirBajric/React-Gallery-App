import React, { Component } from "react";
import Photo from "./Photo";
import NotFoundSearch from "./NotFoundSearch";

class PhotoContainer extends Component {
  componentDidUpdate() {
    if (this.props.loading) {
      this.props.handleLoading();
    }
  }

  render() {
    let jsx = "";
    let title;
    let url = this.props.props.match.url;

    const data = this.props.data;
    let newData = [];

    for (const key in data) {
      const element = data[key];
      newData.push(element);
    }

    if (newData.length === 0) {
      jsx = <NotFoundSearch />;
    } else {
      jsx = newData.map((item) => <Photo data={item} key={item.id} />);
      if (url.startsWith("/search")) {
        title = `${url.slice(8)} Images`;
      } else {
        title = `${url.slice(1)} Images`;
      }
    }

    return (
      <div className="photo-container">
        <h2>{title}</h2>
        <ul>{jsx}</ul>
      </div>
    );
  }
}

export default PhotoContainer;
