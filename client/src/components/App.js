import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Landing from 'components/Landing'
import Dashboard from 'components/Dashboard'
import BlogNew from 'components/blogs/BlogNew'
import BlogShow from 'components/blogs/BlogShow'

import { fetchUser } from 'actions'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUser())
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route path="/blogs/new" component={BlogNew} />
              <Route exact path="/blogs/:_id" component={BlogShow} />
              <Route path="/blogs" component={Dashboard} />
              <Route path="/" component={Landing} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null)(App)
