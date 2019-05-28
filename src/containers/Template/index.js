import React from 'react'
import { connect } from 'react-redux'
import Template from '../../components/Template'

const TemplateContainer = props => {
  const { currentUser } = props
  return (
    <Template currentUser={currentUser} />
  )
}

const mapStateToProps = state => {
  const { currentUser } = state
  return {
    currentUser
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContainer)
