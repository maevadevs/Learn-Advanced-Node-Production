import React, { Component } from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchBlogs } from 'actions'

class BlogList extends Component {

  componentDidMount () {
    this.props.dispatch(fetchBlogs())
  }

  renderBlogs () {
    const { blogs } = this.props
    return map(blogs, blog => (
      <div className="card darken-1 horizontal" key={blog._id}>
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{blog.title}</span>
            <p>{blog.content}</p>
          </div>
          <div className="card-action">
            <Link to={`/blogs/${blog._id}`}>Read</Link>
          </div>
        </div>
      </div>
    ))
  }

  render () {
    return <>{this.renderBlogs()}</>
  }
}

const mapStateToProps = ({ blogs }) => ({ blogs })

export default connect(mapStateToProps)(BlogList)
