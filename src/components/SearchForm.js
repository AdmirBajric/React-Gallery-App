import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchForm extends Component {
  // Store the target value
  state = {
    text: "",
  };
  // If browser refresh, call axios with the current pathname
  componentDidMount() {
    this.props.performSearch(this.props.location.pathname.slice(8));
  }
  // Set state with the current value
  onChange = (e) => {
    this.setState({ text: e.target.value });
  };
  // Submit the form
  handleSubmit = (e) => {
    // Prevent browser refreshing
    e.preventDefault();
    // Handling the loading indicator
    this.props.handleLoading();
    // Call axios with current value
    this.props.performSearch(this.query.value);
    // Create variables to store the current value and the path to push to the history
    let query = this.query.value;
    let path = `/search/${query}`;
    // Push to history the current path
    this.props.history.push(path);
    // Reset the input
    e.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <input
          type="search"
          name="search"
          placeholder="Search"
          onChange={this.onChange}
          ref={(input) => (this.query = input)}
          required
        />
        <button type="submit" className="search-button">
          <svg
            fill="#fff"
            height="24"
            viewBox="0 0 23 23"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </form>
    );
  }
}

export default withRouter(SearchForm);
