import Sidebar, { useStyles } from "../Sidebar";
import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react'
import {
  NavLink
} from 'react-router-dom'
import {
  FiGrid as DashboardIcon,
  FiUsers as EmployeesIcon,
  FiCode as ProjectIcon
} from 'react-icons/fi'
import { v4 as key } from 'uuid'

// Props types
interface Props {
  mobileOpen: boolean
  setMobileOpen: any
}

const navLinks: { label: string, path: string, icon: ReactNode }[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />
  }, {
    label: 'Projects',
    path: '/projects',
    icon: <ProjectIcon />
  }, {
    label: 'Employees',
    path: '/employees',
    icon: <EmployeesIcon />
  }
]


const SidebarBDM = (props: { setMobileOpen: () => void, mobileOpen: boolean }) => {

  const css = useStyles()

  const mobileSidebar = (
    <div className={css.root}>
      {
        navLinks.map(link => (
          <NavLink onClick={e => {
            props.setMobileOpen()
          }} key={key()} to={link.path} exact
            className={css.link} activeClassName={css.active}>
            {link.icon}
            {link.label}
          </NavLink>
        ))
      }
    </div>
  )

  return (
    <Sidebar
      setMobileOpen={props.setMobileOpen}
      mobileSidebar={mobileSidebar}
      mobileOpen={props.mobileOpen}
    >
      <div className={css.root}>{
        navLinks.map(link => (
          <NavLink key={key()} to={link.path} exact className={css.link} activeClassName={css.active}>
            {link.icon}
            {link.label}
          </NavLink>
        ))
      }</div>
    </Sidebar>
  );
}

export default SidebarBDM;