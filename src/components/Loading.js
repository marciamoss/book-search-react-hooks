import React from 'react';
import "./Loading.css";

const Loading = () => {
  return (
    <div className="ui centered inline loader-size segment">
      <div className="ui active inverted dimmer">
        <div className="ui medium text loader">Loading</div>
      </div>
    </div>
  );
}
export default Loading;
