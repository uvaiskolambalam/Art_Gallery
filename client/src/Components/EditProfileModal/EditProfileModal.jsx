import React, { useState } from "react";
import editIcon from "../../Assets/edit-icon.png";
import "./EditProfileModal.css";
import {
  Button,
  Form,
  Input,
  Modal,
} from "antd";
const EditProfileModal = ({ handleEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {

    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        id="edit-btn"
        type="primary"
        className="button-general"
        onClick={showModal}
      >
        <img id="edit-icon" src={editIcon} alt="" />
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          form.validateFields()
            .then((values) => {
              form.resetFields()
              handleEdit(values)
              handleCancel()


            })
        }}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <div className="postUpload-container">
            <div className="contentUpload">
              <Form.Item name="user_name">
                <Input
                  className="modalInput"
                  type="text"
                  placeholder="user_name"
                />
              </Form.Item>
              <Form.Item name="mobile">
                <Input
                  className="modalInput"
                  type="number"
                  placeholder="mobile"
                />
              </Form.Item>
              <Form.Item name="email">
                <Input
                  value={null}
                  className="modalInput"
                  type="email"
                  placeholder="email"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditProfileModal;
