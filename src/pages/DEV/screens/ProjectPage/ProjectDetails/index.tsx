import { useContext, useState, UIEvent, useEffect } from 'react'
import {
  FiChevronLeft as BackIcon
} from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../../DataContext'
import { makeStyles, Typography, fade, IconButton, AppBar, Toolbar } from "@material-ui/core";
import images from "../../../../../assets/images";

import PageContainer from '../../../layouts/PageContainer';
import drawerWidth from '../../../../../constants/sibebarWidth';
import Card from '../../../../../components/Card';
import moment from 'moment';
import useFetch from '../../../useFetch';
import TeamAndTask from './TeamAndTask'
import TLDetails from './TLDetails';

const IMAGE_HEIGHT = 290

interface MatchParams {
  isExact: boolean
  params: any
  path: string
  url: string
}
const setBackground = (index: number) => ({
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.95) 100%), url("${images[index]}")`
})

const getDate = (date: Date | null) => date === null ? '-N/A-' : moment((new Date(date))).format('MMM DD, YYYY')


/*
  --------------->>>>>>>>>> Component
*/
const Index = ({ match }: { match: MatchParams }) => {

  const { projectId, imgIndex } = match.params

  const { data } = useContext(DataContext)
  const { fetchEmployeesPM, fetchProjectTL } = useFetch()

  const [showAppbar, setShowAppbar] = useState(false)

  const history = useHistory()

  const getCurrentProject = () => {
    switch (data.role) {
      case ('PM'): return data.projects.PM.filter((project: any) => project._id === projectId)[0]
      case ('DEV'): return data.projects.DEV.filter(project => project.projectRef._id === projectId).map(project => project.projectRef)[0]
      case ('TL'): return data.projects.TL.filter(project => project.projectRef._id === projectId).map(project => project.projectRef)[0]
    }
  }


  const currentProject: any = getCurrentProject()

  const onScroll = (event: UIEvent<HTMLElement>) => {
    if (event.currentTarget.scrollTop > (IMAGE_HEIGHT - 80))
      setShowAppbar(true)
    else
      setShowAppbar(false)
  }

  const backButtonHandler = () => history.push('/projects')

  const css = useCSS()

  useEffect(() => {
    fetchEmployeesPM()
    fetchProjectTL()
    document.title = `WorkSpace | ${data.role} - ${currentProject.projectTitle}`
  }, [])


  return (
    <PageContainer>
      <AppBar position="fixed" color="inherit" className={`${css.appBar} ${showAppbar ? css.openAppBar : ''}`}>
        <Toolbar>
          <IconButton edge="start" onClick={backButtonHandler} >
            <BackIcon />
          </IconButton>
          <div style={{ marginTop: 10, marginBottom: 10, width: '80%' }}>
            <Typography variant="h4" component="h2" >
              {currentProject.projectTitle}
            </Typography>
            <Typography variant="body2" component="p">
              {currentProject.projectId}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div className={css.scrollContainer} onScroll={onScroll}>
        <div className={css.backgroundImage} style={setBackground(imgIndex)}>
          <div>
            <IconButton edge="start" onClick={backButtonHandler} >
              <BackIcon />
            </IconButton>
            <main className="page-title">
              <Typography variant="h4" component="h2">
                {currentProject.projectTitle}
              </Typography>
              <Typography variant="body1" component="p">
                {currentProject.projectId}
              </Typography>
            </main>
          </div>
        </div>
        <main className={css.container}>
          <Card title="Description">
            <div style={{ padding: 5 }}>
              <Typography variant="body1" color="textPrimary" className="justify-text">
                {currentProject.projectDesc}
              </Typography>
            </div>
          </Card>
          <Card title="Details">
            <div className={css["details-container"]}>
              <div>
                <Typography variant="body2" color="textPrimary">
                  Start Date
                </Typography>
                <Typography variant="body1" color="secondary" style={{ fontWeight: 600 }}>
                  {getDate(currentProject.startDate)}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textPrimary">
                  End Date
                </Typography>
                <Typography variant="body1" color="secondary" style={{ fontWeight: 600 }}>
                  {getDate(currentProject.endDate)}
                </Typography>
              </div>
            </div>
            {
              currentProject.managerId && (
                <div className={css["details-container"]}>
                  <div>
                    <Typography variant="body2" color="textPrimary">Project Manager</Typography>
                    <Typography variant="body1" color="secondary" style={{ fontWeight: 600 }}>
                      {currentProject.managerId.employeeId} - {currentProject.managerId.name} {data.role === 'PM' && '(YOU)'}
                    </Typography>
                  </div>
                </div>
              )
            }
          </Card>
          {
            data.role === 'TL' || data.role === 'DEV' ? (
              <TLDetails
                project_id={currentProject._id}
                projectTeam={data.projects[data.role].filter(project => project.projectRef._id === currentProject._id).map(project => project.teamMembers)[0]}
              />
            ) : (
                <TeamAndTask project_id={currentProject._id} />
            )
          }
        </main>
      </div>
    </PageContainer>
  );
}

export default Index

const useCSS = makeStyles(({ spacing, palette, mixins, breakpoints }) => ({
  backgroundImage: {
    padding: `${spacing(1.7)}px ${spacing(3)}px`,
    height: IMAGE_HEIGHT,
    width: '100%',
    backgroundSize: 'cover',
    'background-position': 'center',
    display: 'flex',
    flexDirection: 'column-reverse',
    '& .page-title': {
      width: '85%',
      marginRigth: spacing(2.5)
    },
    '& .page-title h2': {
      color: fade(palette.background.paper, 0.9),
      fontWeight: 500,
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      [breakpoints.down(spacing(55))]: {
        fontSize: spacing(3)
      }
    },
    '& .page-title p': {
      color: fade(palette.background.paper, 0.8)
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      '& .MuiIconButton-root': {
        color: fade(palette.background.paper, 0.9),
        marginRight: spacing(1.5),
        '&:hover': {
          backgroundColor: fade(palette.background.paper, 0.15)
        }
      }
    },
    [breakpoints.down('xs')]: {
      padding: `${spacing(1.7)}px ${spacing(2.5)}px`
    }
  },
  container: {
    padding: `${spacing(1)}px ${spacing(3)}px`,
    [breakpoints.down('xs')]: {
      padding: `${spacing(1)}px ${spacing(2.5)}px`
    }
  },
  scrollContainer: {
    height: '100%',
    maxHeight: `calc(100vh - ${mixins.toolbar.minHeight}px)`,
    overflow: 'auto',
    [breakpoints.up('md')]: {
      maxHeight: '100vh'
    }
  },
  appBar: {
    'clip-path': 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    transition: 'clip-path 750ms',
    [breakpoints.up('md')]: {
      left: drawerWidth
    },
    '& h2': {
      color: palette.text.primary,
      fontWeight: 500,
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      fontSize: spacing(2.75)
    },
    '& .MuiIconButton-root': {
      marginRight: spacing(1.5)
    }
  },
  openAppBar: {
    'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    borderBottom: `1.5px solid ${fade(palette.text.hint, 0.25)}`
  },
  'details-container': {
    padding: spacing(1.15),
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(20.5)}px, 1fr))`,
    gridGap: spacing(1.5)
  }
}))