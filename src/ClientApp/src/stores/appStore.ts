import { defineStore } from 'pinia';
import type {
  AppVersion,
  DomainUser,
  IFailureIItemSet,
  IFailure,
  WebClientInfo,
} from '@/api/data-contracts';
import type { HttpResponse } from '@/api/http-client';
import { isNil } from '@/models/FormatHelpers';

interface AppStoreState {
  applicationName: string;
  fieldsInError: Array<string>;
  messageIsError: boolean;
  messages: Array<string>;
  user: DomainUser;
  isInitialized: boolean;
  version: string;
  useFahrenheit: boolean;
  useDarkMode: boolean;
  showHumidity: boolean;
}

interface UserMessage {
  message: string;
}

const settingKeyDisableDarkMode = 'disableDarkMode';
const settingKeyDisableFahrenheit = 'disableFahrenheit';
const settingKeyDisableHumidity = 'disableHumidity';

const initialDarkModeSetting = localStorage.getItem(settingKeyDisableDarkMode) === null;

function setUseDarkMode(setting: boolean) {
  const { body } = document;

  if (setting) {
    body.classList.add('bg-dark');
    body.classList.add('text-light');
    body.classList.remove('bg-light');
    body.classList.remove('text-dark');

    localStorage.removeItem(settingKeyDisableDarkMode);
  } else {
    body.classList.remove('bg-dark');
    body.classList.remove('text-light');
    body.classList.add('bg-light');
    body.classList.add('text-dark');

    localStorage.setItem(settingKeyDisableDarkMode, 'true');
  }
}

setUseDarkMode(initialDarkModeSetting);

export const useAppStore = defineStore('app', {
  state: (): AppStoreState => ({
    applicationName: '',
    fieldsInError: [],
    messageIsError: false,
    messages: [],
    user: {
      login: '',
      authorizedAs: [],
    },
    isInitialized: false,
    version: '',
    useFahrenheit: localStorage.getItem(settingKeyDisableFahrenheit) === null,
    useDarkMode: initialDarkModeSetting,
    showHumidity: localStorage.getItem(settingKeyDisableHumidity) === null,
  }),

  getters: {
    isFieldInError: (state) => (fieldName: string) =>
      state.fieldsInError
        .map((errorField) => errorField.toLowerCase())
        .indexOf(fieldName.toLowerCase()) > -1,

    userIsAuthorizedAs: (state) => (policy: string) =>
      (state.user.authorizedAs || []).includes(policy),
  },

  actions: {
    setApiFailureMessages(response: HttpResponse<unknown, unknown>) {
      if (response === undefined || response === null) {
        this.setErrorMessage('Cannot connect to server.');
        return;
      }

      if (response.status === 401 || response.status === 403) {
        this.setErrorMessage('You are not authorized for this server endpoint.');
      } else if (response.status === 404) {
        this.setErrorMessage('Server responded with endpoint not found.');
      } else if (response.status >= 500) {
        const userMessage = response.error as UserMessage;
        this.setErrorMessage(userMessage.message);
      } else {
        const failureSet = response.data as IFailureIItemSet;
        if (failureSet !== undefined && failureSet !== null) {
          this.setValidationErrorMessages(failureSet.items || []);
        } else {
          this.setErrorMessage(
            'Something went wrong. Try refreshing your browser or contact the administrator.'
          );
        }
      }
    },

    clearMessages() {
      this.messageIsError = false;
      this.fieldsInError = [];
      this.messages.length = 0;
    },

    setApplicationInfo(data: WebClientInfo) {
      this.applicationName = data.applicationName || '';
      this.user = data.user || { login: '', authorizedAs: [] };
      this.isInitialized = true;
    },

    setVersionInfo(data: AppVersion) {
      let version = `v${data.version}`;

      if (data.isPublicRelease === false && data.gitCommitId) {
        const gitCommitId = data.gitCommitId.slice(0, 10);
        version += `-g${gitCommitId}`;
      }

      this.version = version;
    },

    setErrorMessage(message: string) {
      this.messageIsError = true;
      this.fieldsInError = [];
      this.messages = [message];
    },

    setSuccessMessage(message: string) {
      this.messageIsError = false;
      this.fieldsInError = [];
      this.messages = [message];
    },

    setValidationErrorMessages(failures: IFailure[]) {
      function notEmpty(value: string | null | undefined): value is string {
        return !isNil(value);
      }
      const fieldNames = failures.map((item) => item.uiHandle);
      const messages = failures.map((item) => item.message);

      this.messageIsError = true;
      this.fieldsInError = fieldNames.filter(notEmpty);
      this.messages = messages.filter(notEmpty);
    },

    setUseDarkMode,

    setUseFahrenheit(setting: boolean) {
      if (setting) {
        localStorage.removeItem(settingKeyDisableFahrenheit);
      } else {
        localStorage.setItem(settingKeyDisableFahrenheit, 'true');
      }
    },

    setShowHumidity(setting: boolean) {
      if (setting) {
        localStorage.removeItem(settingKeyDisableHumidity);
      } else {
        localStorage.setItem(settingKeyDisableHumidity, 'true');
      }
    },
  },
});

export default useAppStore;
