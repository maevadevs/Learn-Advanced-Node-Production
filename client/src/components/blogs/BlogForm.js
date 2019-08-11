// BlogForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import BlogField from 'components/blogs/BlogField'
import formFields from 'components/blogs/formFields'

class BlogForm extends Component {
  renderFields () {
    return formFields.map(({ label, name }) => (
      <Field
        key={name}
        component={BlogField}
        type="text"
        label={label}
        name={name}
      />
    ))
  }

  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
        {this.renderFields()}
        <Link to="/blogs" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  _.each(formFields, ({ name }) => {
    if (!values[name]) errors[name] = 'You must provide a value'
  })
  return errors
}

export default reduxForm({
  validate,
  form: 'blogForm',
  destroyOnUnmount: false
})(BlogForm)
