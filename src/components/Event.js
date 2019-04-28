import React from 'react'
import injectSheet from 'react-jss'
import { getEventTypeIcon } from '../helpers/event'
import ImageTile from './ImageTile'

const Event = ({ content, classes, className }) => {
  return <ImageTile className={className}
    id={content.id}
    image={content.image}
    title={content.title}
    shareTitle={content.shareTitle}
    displayShareButtons={content.displayShareButtons !== undefined ? content.displayShareButtons : true}
    url={content.url}
    icon={getEventTypeIcon(content)}
    imageAspect={7 / 4}
  >
    {content.eventDateText && <p className={classes.detailsItem}>{content.eventDateText}</p>}
    {content.precinctTitle && <p className={classes.detailsItem}>{content.precinctTitle}</p>}
  </ImageTile>
}

export default injectSheet({
  detailsItem: {
    margin: [0, 0, 2],
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  price: {
    paddingTop: 2,
    marginTop: -1,
    marginLeft: -1
  },
  detailsIcon: {
    width: 16,
    height: 16,
    position: 'relative',
    top: -1,
    marginRight: 4
  }
})(Event)
