export interface ConfirmationModalState {
  isOpened: boolean;
  isConfirmed: boolean;
  isDeclined: boolean;
  value?: string;
}

export const initialConfirmationModalState: ConfirmationModalState = {
  isOpened: false,
  isConfirmed: false,
  isDeclined: false,
};
