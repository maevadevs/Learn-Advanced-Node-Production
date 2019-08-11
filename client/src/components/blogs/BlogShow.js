import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchBlog } from 'actions'

class BlogShow extends Component {

  componentDidMount () {
    const { dispatch, match } = this.props
    dispatch(fetchBlog(match.params._id))
  }

  render () {
    const { blog } = this.props
    
    if (!blog) return ''

    const { title, content } = blog
    return (
      <>
        <h3>{title}</h3>
        <p>{content}</p>
      </>
    )
  }
}

const mapStateToProps = ({ blogs }, ownProps) => ({ 
  blog: blogs[ownProps.match.params._id] 
})

export default connect(mapStateToProps)(BlogShow)
