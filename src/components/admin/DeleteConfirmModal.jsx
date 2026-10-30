import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './DeleteConfirmModal.css';

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  productTitle,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Product Deletion">
      <div className="delete-modal-content">
        <div className="delete-modal-icon-wrap">
          <AlertTriangle size={32} className="delete-modal-icon" />
        </div>
        
        <p className="delete-modal-warning">
          Are you sure you want to delete <strong>"{productTitle}"</strong>?
        </p>
        <p className="delete-modal-subtext">
          This action will permanently remove the product from the database and catalog.
        </p>

        <div className="delete-modal-actions">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Delete Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};

