import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import CloseIcon from '@mui/icons-material/Close';

export function HttpErrorComponent() {
  return (
    <div className="col-md-4 alert alert-danger">
      Can't fetch data at this time. Please refresh the page or check your
      internet connectivity
    </div>
  );
}

export function HttpError() {
  const [open, setOpen] = React.useState(true);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    // <Stack spacing={2} sx={{ width: '100%' }}>
    //   <Button variant="outlined" onClick={handleClick}>
    //     Open success snackbar
    //   </Button>
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Can't fetch data at this time
      </Alert>
    </Snackbar>
    //   <Alert severity="error">This is an error message!</Alert>
    //   <Alert severity="warning">This is a warning message!</Alert>
    //   <Alert severity="info">This is an information message!</Alert>
    //   <Alert severity="success">This is a success message!</Alert>
    // </Stack>
  );
}
