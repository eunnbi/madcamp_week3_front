import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
const AlertDialog = ({ title, content, open, handleClose, onCancel, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
            {content && (
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            )}
            </DialogContent>
            <DialogActions>
            <Button onClick={onCancel} color="error">취소</Button>
            <Button onClick={onConfirm}>확인</Button>
            </DialogActions>
      </Dialog>
    )
}

export default AlertDialog;