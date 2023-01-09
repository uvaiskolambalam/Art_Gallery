import React, { useState } from "react";
import { Form, Modal, Upload, Image } from "antd";
import ImgCrop from "antd-img-crop";
import camera from "../../Assets/camera.png";
import { useDispatch, useSelector } from "react-redux";
import axiosImage from "../../Components/Instence/Instence";

import Url from "../Instence/Base_uel";

const ProfileImageModal = ({ setUpload }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState("");

  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const showModal = ({ renderImgage }) => {
    setOpen(true);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const toColoudinary = (fileList) => {
    if (fileList) {
      const profileimageUpload = fileList[0].originFileObj;
      const profielPic = new FormData();
      const filename = Date.now() + profileimageUpload.name;

      profielPic.append("name", filename);
      profielPic.append("file", profileimageUpload);
      profielPic.append("upload_preset", "artGallery");

      axiosImage.post("/image/upload", profielPic).then(async (response) => {
        const profileImageUrl = response.data.secure_url;

        const profileImageData = {
          userId: user.id,
          profileImage: profileImageUrl,
        };

        const responsee = await Url.post("/profileImage", profileImageData);
        setUpload(responsee.data.success);
        const aaaa = { ...responsee.data.updated };
        dispatch({ type: "USER", payload: aaaa });
      });
    } else {
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <p type="primary" onClick={showModal}>
        <img for="file" src={camera} alt="" label="kkk" />
      </p>
      <Modal
        title="Title"
        open={open}
        onOk={() => {
          form.validateFields().then((values) => {
            toColoudinary(fileList);
            handleCancel();
          });
        }}
        onCancel={handleCancel}
      >
        <div>
          <Form form={form}>
            <div className="postUpload-container">
              <div className="imageUpload">
                <Form.Item
                  name="profileImage"
                  className="photo-upload-container"
                >
                  <ImgCrop rotate>
                    <Upload
                      listType="picture-card"
                      accept=".jpg, .jpeg,"
                      onPreview={onPreview}
                      onChange={onChange}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ProfileImageModal;
