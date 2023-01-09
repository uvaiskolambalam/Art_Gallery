import React, { useState } from "react";
import editIcon from "../../Assets/edit-icon.png";
import "./EditProfileMoreModal.css";

import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
} from "antd";
const EditProfileModal = ({ handleMoreEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dateFormat = "YYYY/MM/DD";
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
              handleMoreEdit(values)
              handleCancel()


            })
        }}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <div className="postUpload-container">
            <div className="contentUpload">
              <Form.Item name="university">
                <Input
                  className="modalInput"
                  type="text"
                  placeholder="University"
                />
              </Form.Item>
              <Form.Item name="lives">
                <Input
                  className="modalInput"
                  type="text"
                  placeholder="Lives"
                />
              </Form.Item>
              <Form.Item name="from">
                <Input
                  value={null}
                  className="modalInput"
                  type="email"
                  placeholder="From"
                />
              </Form.Item>
              <Form.Item name="DOB">
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditProfileModal;
