import {
  Drawer, FormControlLabel, makeStyles, Radio, RadioGroup, withStyles
} from '@material-ui/core'
import { useContext, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import useFormField from '../../../hooks/useFormField';
import { DataContext } from '../DataContext';

const Model = withStyles(() => ({
  root: {
    display: 'grid',
    placeItems: 'center',
  },
  paper: {
    height: '100vh',
    marginBottom: 'auto',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)'
  }
}))(Drawer)

const RolePopup = () => {

  const { data, dispatch } = useContext(DataContext)
  const css = useCSS()
  const roleField = useFormField(data.role)
  const history = useHistory()

  const onSubmit = (event: FormEvent) => {

    event.preventDefault()
    const val = roleField.value

    if (val === data.role) {
      dispatch.closeRoleModal()
    } else {
      if (val === 'PM')
        dispatch.setRole('PM')
      else if (val === 'TL')
        dispatch.setRole('TL')
      else if (val === 'DEV')
        dispatch.setRole('DEV')
      history.push('/')
      dispatch.closeRoleModal()
    }
  }

  useEffect(() => {

    const handleClick = ({ target }: any) => {

      if (target.id && target.id === 'show-roles-modal')
        dispatch.closeRoleModal()
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  })

  return (
    <Model
      variant="temporary"
      open={data.showRolePopup}
      anchor="bottom"
      onClose={dispatch.closeRoleModal}
    >
      <section id="show-roles-modal" className={css.container}>
        <div className={css.modal}>
          <Card title="Select your role" >
            <form className={css.form} onSubmit={onSubmit}>
              <RadioGroup aria-label="role" name="role" {...roleField}>
                <FormControlLabel value="DEV" control={<Radio />} label="Software Developer" />
                {data.roleList.isTL && <FormControlLabel value="TL" control={<Radio />} label="Team Leader" />}
                {data.roleList.isPM && <FormControlLabel value="PM" control={<Radio />} label="Project Manager" />}
              </RadioGroup>
              <div className={css.btnContainer}>
                <Button.Secondary label="close" onClick={dispatch.closeRoleModal} />
                <Button.Primary type="submit" label="Done" />
              </div>
            </form>
          </Card>
        </div>
      </section>
    </Model>
  );
}

export default RolePopup;


const useCSS = makeStyles(({ spacing, breakpoints }) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    [breakpoints.up('sm')]: {
      alignItems: 'center',
      bacKdropFilter: 'blur(5px)'
    }
  },
  modal: {
    width: spacing(60),
    [breakpoints.down(spacing(60.01))]: {
      width: '95vw'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2)
  },
  btnContainer: {
    display: 'flex',
    '& > *': {
      flex: 1,
      '&:last-child': {
        marginLeft: spacing(2.5)
      }
    }
  }
}))