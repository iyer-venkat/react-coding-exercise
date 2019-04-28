import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getEvents, isEventsReady } from '../selectors'
import Icon from './Icon'
import titleIcon from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'
import Event from './Event'

/* const loaderStyle = {
  animationDuration: '1s',
  animationFillMode: 'forwards',
  animationIterationCount: 'infinite',
  animationName: 'placeHolderShimmer',
  animationTimingfunction: 'linear',
  backgroundColor: '#f6f7f8',
  background: 'linear-gradient(\'to right\', \'#eeeeee 8%\', \'#dddddd 18%\', \'#eeeeee 33%\')',
  backgroundSize: '1000px 104px',
  height: '338px',
  position: 'relative',
  overflow: 'hidden'
} */

const Events = ({ classes, ready, events }) => (
  <div className={classes.container}>
    <h3 className={classes.title}>
      <Icon className={classes.titleIcon} symbol={titleIcon} />
      Results{ready && `: ${events.length} events found`}
    </h3>
    {!ready && (
      <div className={classes.tilesWrapper}>
        <div className={classes.tiles}>
          <style>{`
@keyframes placeHolderShimmer{
  0%{
      background-position: -468px 0
  }
  100%{
      background-position: 468px 0
  }
}
.linear-background {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1000px 104px;
  height: 338px !important;
  position: relative;
  overflow: hidden;
}
`}
          </style>
          <div style={{ width: '100%' }}>
            <Event key={-10} className={`linear-background ${classes.tile}`} content={{ displayShareButtons: false, id: -10, image: '', title: ' ', url: ' ', eventDateText: ' ', precinctTitle: ' ' }} />
            <Event key={-9} className={`linear-background ${classes.tile}`} content={{ displayShareButtons: false, id: -9, image: '', title: ' ', url: ' ', eventDateText: ' ', precinctTitle: ' ' }} />
          </div>
        </div>
      </div>
    )}
    {ready && (
      <div className={classes.tilesWrapper}>
        <div className={classes.tiles}>
          {events.map(event => <Event key={event.id} className={classes.tile} content={event} />)}
        </div>
      </div>
    )}
  </div>
)

const mapStateToProps = (state) => ({
  ready: isEventsReady(state),
  events: getEvents(state)
})

export default compose(
  connect(mapStateToProps),
  injectSheet({
    title: {
      paddingLeft: 20,
      position: 'relative'
    },
    titleIcon: {
      position: 'absolute',
      left: 0,
      top: 5
    },
    tilesWrapper: {
      margin: [0, 'auto'],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        maxWidth: theme.maxTileWidth * 2 + theme.gutter
      },
      '@media (min-width: 1200px)': {
        maxWidth: theme.maxTileWidth * 3 + theme.gutter * 2
      }
    },
    tiles: {
      '@media (min-width: 768px)': {
        marginLeft: -theme.gutter / 2,
        marginRight: -theme.gutter / 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }
    },

    tile: {
      margin: [0, 'auto', theme.gutter],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        marginLeft: theme.gutter / 2,
        marginRight: theme.gutter / 2,
        width: `calc(50% - ${theme.gutter}px)`
      },
      '@media (min-width: 1200px)': {
        width: `calc(${100 / 3}% - ${theme.gutter}px)`
      }
    }
  })
)(Events)
