import { atom } from 'recoil';
import { atomWithLocalStorage } from '~/store/utils';

const isOperationMode = atomWithLocalStorage('isOperationMode', false);

const operationPanelOpen = atom<boolean>({
  key: 'operationPanelOpen',
  default: false,
});

const activeOperationJobId = atom<string | null>({
  key: 'activeOperationJobId',
  default: null,
});

const activeOperationExecutionId = atom<string | null>({
  key: 'activeOperationExecutionId',
  default: null,
});

export default {
  isOperationMode,
  operationPanelOpen,
  activeOperationJobId,
  activeOperationExecutionId,
};
