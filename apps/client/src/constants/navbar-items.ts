import {
  homePathConstant,
  aboutPathConstant,
  featuresPathConstant,
} from '../routes/paths'

const navbarItems = [
  {
    title: 'Home',
    url: homePathConstant.HOME,
  },
  {
    title: 'Features',
    url: featuresPathConstant.FEATURES,
  },
  {
    title: 'About',
    url: aboutPathConstant.ABOUT,
  },
]

export { navbarItems }
