import React from "react";

const Photo = (props) => {
  return (
    <li>
      <img
        src={`https://farm${props.data.farm}.staticflickr.com/${props.data.server}/${props.data.id}_${props.data.secret}.jpg`}
        alt={props.data.title}
      />
    </li>
  );
};

export default Photo;
