import React from 'react'
import _ from 'lodash'
import { Glyphicon } from 'react-bootstrap'


import './style/TagGroup.scss'

export default class TagGroup extends React.Component {

  static propTypes = {
    lookup: React.PropTypes.object,
    onChange: React.PropTypes.func,
    getColor: React.PropTypes.func,
    tags: React.PropTypes.object,
  }
  

  lookup(k,d) {
    return this.props.lookup && this.props.lookup[k] && this.props.lookup[k][d] || d
  }

  onClick = (dimension, value) => {
    return () => {
       this.props.onChange && this.props.onChange(dimension, value)
    }
  }

  render() {
    let filterEl = []
    let {tags, aggregation, group, getColor, onChange} = this.props
           
    _.map(tags, (f, dimension) => {
      _.map(f, (value, i) => {
        let text = null
        let iconEl = null

        if(getColor) {
          iconEl = <span className="graph-tags__element__color" style={{backgroundColor: this.props.getColor(text, dimension) }} />
        } else {
          iconEl = <span className="graph-tags__element__icon">
                        <Glyphicon glyph="filter"/>
                      </span>
        }
            
        if(_.isObject(value)){
          if(value.text) text = value.text
          if(value.icon) iconEl = <span className="graph-tags__element__icon">
                                    {value.icon}
                                  </span>
        } else {
          text = value
        }

        filterEl.push(<span className={`graph-tags__element ${_.isUndefined(onChange) ? "" : "graph-tags__element--with-action"}`} 
                        key={'filter-'+dimension+text+i}
                        onClick={this.onClick(dimension, text)}>
                        {iconEl} {dimension}: {this.lookup(dimension, text)} 
                      </span>)
      })
    })

    return <div className="graph-tags">{filterEl}</div>
  }
}
