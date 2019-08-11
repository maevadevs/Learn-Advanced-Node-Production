// BlogFormReview shows users their form inputs for review
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import formFields from 'components/blogs/formFields'
import { submitBlog } from 'actions'

class BlogFormReview extends Component {
  renderFields () {
    const { formValues } = this.props
    return _.map(formFields, ({ name, label }) => (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ))
  }

  renderButtons () {
    const { onCancel } = this.props
    return (
      <div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    )
  }

  onSubmit (e) {
    e.preventDefault()
    const { dispatch, history, formValues } = this.props
    dispatch(submitBlog(formValues, history))
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}
        {this.renderButtons()}
      </form>
    )
  }
}

const mapStateToProps = state => ({ formValues: state.form.blogForm.values })

export default connect(mapStateToProps)(withRouter(BlogFormReview))
