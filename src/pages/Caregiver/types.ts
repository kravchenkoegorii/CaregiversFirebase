export interface RequestApplyProps {
  open: boolean;
  onClose: (needToReload: boolean) => void;
  request: any;

}

export interface RequestEditProps extends RequestApplyProps {
  resource: string;
}
