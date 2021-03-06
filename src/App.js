import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
// API Key for Flickr.com
import apiKey from "./config";
// Promise based HTTP client
import axios from "axios";
// Components
import Home from "./components/Home";
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";
import NotFoundPage from "./components/NotFoundPage";

class App extends Component {
  state = {
    searchTopic: null,
    defaultTopics: ["summer", "sun", "sea"],
    loading: true,
  };
  // Fetch default topics in first run
  componentDidMount() {
    this.defaultTopicsSearch();
  }
  // Default fetching data for the three default topics
  defaultTopicsSearch = (topic) => {
    this.state.defaultTopics.forEach((topic) => {
      axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`
        )
        .then((data) => {
          this.setState({
            [`${topic}`]: data.data.photos.photo,
          });
        })
        .catch((error) => {
          console.log("Error fetching and parsing data", error);
        });
    });
  };
  // Perform search for the SearchForm
  performSearch = (topic) => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((data) => {
        this.setState({
          searchTopic: data.data.photos.photo,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };
  // Handling the loading indicator
  handleLoading = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route
            render={() => (
              <SearchForm
                performSearch={this.performSearch}
                handleLoading={this.handleLoading}
              />
            )}
          />
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path={"/search/:name"}
              render={(props) =>
                this.state.loading ? (
                  <h2>Loading...</h2>
                ) : (
                  <PhotoContainer
                    props={props}
                    data={this.state.searchTopic}
                    handleLoading={this.handleLoading}
                  />
                )
              }
            />
            <Route
              path="/summer"
              render={(props) => (
                <PhotoContainer props={props} data={this.state.summer} />
              )}
            />
            <Route
              path="/sun"
              render={(props) => (
                <PhotoContainer props={props} data={this.state.sun} />
              )}
            />
            <Route
              path="/sea"
              render={(props) => (
                <PhotoContainer props={props} data={this.state.sea} />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
