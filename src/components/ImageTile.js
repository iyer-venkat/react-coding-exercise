import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import ResponsiveImage from './ResponsiveImage'
import Icon from './Icon'
import theme from '../style/theme'
import color from 'color'
import ShareButtons from './ShareButtons'

const ImageTile = ({
  classes, className, id, image, title, shareTitle = title, url, icon, imageAspect = (7 / 4), displayShareButtons, children, extraChildren
}) =>
  <div className={classNames(classes.tile, className)}>
    <a className={classes.content} href={url}>
      <ResponsiveImage aspect={imageAspect} images={image && image.sizes}
        alt={image && image.alt} className={classes.image} />
      <div className={classNames(classes.details, icon && classes.detailsWithIcon)}>
        {icon && <Icon className={classes.icon} symbol={icon} />}
        <h3 className={classes.title}>{title}</h3>
        {children}
      </div>
    </a>

    {displayShareButtons && <ShareButtons className={classes.shareButtons} url={url} title={shareTitle} id={id} />}
    {extraChildren}
  </div>

export default injectSheet({
  tile: {
    overflow: 'hidden',
    position: 'relative'
  },
  content: {
    display: 'block',
    '&, &:hover, &:focus': {
      textDecoration: 'none'
    },
    '&:hover': {
      '& $title, & $icon': {
        color: theme.colors.primary
      }
    }
  },
  image: {
    backgroundColor: '#cdcdcd'
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 11,
    color: theme.colors.heading,
    width: 30,
    height: 30,
    transition: 'color 0.2s ease-out'
  },
  details: {
    padding: [13, 15, 0, 20],
    position: 'relative',
    color: theme.colors.lightText,
    textTransform: 'uppercase',
    fontSize: 11,
    lineHeight: 1.3,
    height: 110,
    backgroundColor: theme.colors.white
  },
  detailsWithIcon: {
    paddingLeft: 60,
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 46,
      top: 17,
      width: 1,
      height: 18,
      backgroundColor: color(theme.colors.heading).mix(color(theme.colors.white), 0.9).hex()
    }
  },
  title: {
    margin: [0, 0, 8],
    position: 'relative',
    whiteSpace: 'nowrap',
    fontSize: 20,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'color 0.2s ease-out'
  },
  shareButtons: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    '@media (min-width: 380px)': {
      right: 10,
      bottom: 10
    }
  }
})(ImageTile)
