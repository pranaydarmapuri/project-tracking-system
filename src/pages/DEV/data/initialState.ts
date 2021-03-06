import { InitialStateType } from '../../../types'
import storage from '../../../config/localStorageConfig'
import { appStorageKey } from '../../../constants/storageKeys/appStorageKey'


const stateLS = storage.get(appStorageKey)

const initialState: InitialStateType = stateLS ? stateLS : {
  projects: {
    PM: [],
    TL: [],
    DEV: []
  },
  role: 'DEV',
  roleList: {
    isDev: true,
    isPM: false,
    isTL: false
  },
  showRolePopup: false,
  projectView: 'LIST',
  employees: []
}

export default initialState