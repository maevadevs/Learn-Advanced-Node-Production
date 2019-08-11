// BlogNew shows BlogForm and BlogFormReview
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import BlogForm from 'components/blogs/BlogForm'
import BlogFormReview from 'components/blogs/BlogFormReview'

class BlogNew extends Component {

  state = { 
    showFormReview: false
  }

  renderContents () {
    const { showFormReview } = this.state
    if (showFormReview) {
      return <BlogFormReview onCancel={() => this.setState({ showFormReview: false })} />
    }
    return <BlogForm onBlogSubmit={() => this.setState({ showFormReview: true })} />
  }

  render () {
    return <>{this.renderContents()}</>
  }
}

export default reduxForm({
  form: 'blogForm'
})(BlogNew)
