import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState } from 'react';
import ReactWordCloud from 'react-wordcloud';
import { WordsQuery } from 'src/graphql';
interface Props {
  words?: WordsQuery['words'];
}

const WordCloud: React.VFC<Props> = ({ words }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (words == null) {
    return null;
  }

  return (
    <>
      <Tooltip title="Word cloud">
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{ textTransform: 'none' }}
          disableRipple
        >
          WC
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>📖 Word Cloud</DialogTitle>
        <DialogContent style={{ transform: 'scale(1.5)' }}>
          <ReactWordCloud words={words ?? []} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WordCloud;
