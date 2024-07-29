import { TransactionDto } from "./transaction";

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

export interface trxModalState extends ConfirmationModalState {
  trxHash?: string;
  trxInitData?: TransactionDto;
}
