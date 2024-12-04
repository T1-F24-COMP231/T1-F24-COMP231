import React from 'react';
import Button from './Button';

interface SaveDesignBtnProps {
  onSaveDesign: () => void;
}

const SaveDesignBtn: React.FC<SaveDesignBtnProps> = ({ onSaveDesign }) => {
  return <Button onClick={onSaveDesign}>Save Design</Button>;
};

export default SaveDesignBtn;
