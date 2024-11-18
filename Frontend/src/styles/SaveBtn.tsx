import React from 'react';
import Button from '../components/Button';

interface SaveBtnProps {
  onSave: () => void;
}

const SaveBtn: React.FC<SaveBtnProps> = ({ onSave }) => {
  return <Button onClick={onSave}>Save</Button>;
};

export default SaveBtn;
