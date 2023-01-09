import React, { useState } from "react";
import Url from "../Instence/Base_uel";
import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
} from "antd";
import "./AntdModal.css";
import { useSelector } from "react-redux";
import axiosImage from "../../Components/Instence/Instence";


const AntdModal = ({ setRender }) => {

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(" ");
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const showModal = () => {
    setOpen(true);
  };

  const newPost = {
    userId: user.id,
    desc: description,
  };
  if (image) {
    const data = new FormData();
    const filename = Date.now() + image.name;
    data.append("name", filename);
    data.append("file", image);
    data.append("upload_preset", "artGallery");
    axiosImage.post("/image/upload", data).then((response) => {
      newPost.imageUrl = response.data.secure_url;
      Url.post("/newpost", newPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });

      setImage(null);
      setDescription("");
      setRender(true);
    });
  } else {
  }

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <p type="primary" onClick={showModal}>
        What is on your mind
      </p>
      <Modal
        title="Title"
        open={open}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            setDescription(values.post_content);
            let image = values.post_image.file;

            setImage(image);
            handleCancel();
          });
        }}
        onCancel={handleCancel}
      >
        <div>
          <Form form={form}>
            <div className="postUpload-container">
              <div className="contentUpload">
                <Form.Item name="post_content">
                  <Input
                    className="modalInput"
                    type="text"
                    placeholder="Text here..."
                  />
                </Form.Item>
              </div>

              <div className="imageUpload">
                <Form.Item
                  name="post_image"
                  className="photo-upload-container"
                  rules={[{ required: true, message: "image upload requird" }]}
                >
                  <Upload
                    listType="picture"
                    //action={axiosImage}
                    showUploadList={{ showRemoveIcon: true }}
                    accept=".jpg, .jpeg, .mp4"
                    beforeUpload={(file) => {
                      return false;
                    }}
                  >
                    <Button className="photo-upload-button">
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>

                {/* <Input
                  
                  className="modalInput"
                  id="file"
                  type="file"
                  placeholder="Choose Image"
                />
                <img src={camera} alt="" />
                <label htmlFor="file">Upload a Photo</label> */}
              </div>
            </div>
            {/* <Button htmlType="submit">submit</Button> */}
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default AntdModal;
