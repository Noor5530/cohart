export interface EnableSnackBar {
  type: string;
  data: { message: string };
}

export interface DisableSnackBar {
  type: string;
}
