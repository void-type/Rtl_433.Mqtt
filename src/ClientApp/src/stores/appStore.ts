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
import type { ModalParameters } from '@/models/ModalParameters';
import DarkModeHelpers from '@/models/DarkModeHelpers';
import UserSettingHelpers from '@/models/UserSettingHelpers';

interface AppStoreState {
  applicationName: string;
  fieldsInError: Array<string>;
  messageIsError: boolean;
  messages: Array<string>;
  user: DomainUser;
  isInitialized: boolean;
  version: string;
  useDarkMode: boolean;
  modalIsActive: boolean;
  modalParameters: ModalParameters;
  useFahrenheit: boolean;
  showHumidity: boolean;
}

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
    useDarkMode: false,
    modalIsActive: false,
    modalParameters: {
      title: '',
      description: '',
      okAction: undefined,
      cancelAction: undefined,
    },
    useFahrenheit: true,
    showHumidity: true,
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
        const userMessage = response.error as IFailure;
        this.setErrorMessage(userMessage.message || '');
      } else {
        const failureSet = response.error as IFailureIItemSet;
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

    setDarkMode(setting: boolean) {
      DarkModeHelpers.setDarkMode(setting);
      this.useDarkMode = setting;
    },

    showModal(modalParameters: ModalParameters) {
      if (this.modalIsActive) {
        return;
      }

      this.modalIsActive = true;
      this.modalParameters = modalParameters;
    },

    hideModal() {
      this.modalIsActive = false;
      this.modalParameters = {
        title: '',
        description: '',
        okAction: undefined,
        cancelAction: undefined,
      };
    },

    setUseFahrenheit(setting: boolean) {
      UserSettingHelpers.setFahrenheit(setting);
      this.useFahrenheit = setting;
    },

    setShowHumidity(setting: boolean) {
      UserSettingHelpers.setHumidity(setting);
      this.showHumidity = setting;
    },
  },
});

export default useAppStore;
