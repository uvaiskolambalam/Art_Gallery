import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Label,
  Upload,
  message,
  Icon,
  Image,
} from "antd";
import ImgCrop from "antd-img-crop";
import camera from "../../Assets/camera.png";
import { useDispatch, useSelector } from "react-redux";
import axiosImage from "../../Components/Instence/Instence";
import { useEffect } from "react";
import axios from "axios";

const ProfileImageModal = ({ setUpload }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState("");
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(" ");

  // const [userData,setUserData]=useState('')
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
  //   const onFinish = async(value) => {
  //     setProfileImage(value.post_content)

  //     let image=value.post_image.file
  //     setImage(image)
  //   };

  // const newPost={
  //   userId:user.id,
  //   desc:profileImage
  // }

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

        const responsee = await axios.post(
          "http://localhost:5000/profileImage",
          profileImageData
        );
        setUpload(responsee.data.success);
        const aaaa = {...responsee.data.updated}
        console.log(responsee.data.updated,'111111111');
        dispatch({type:"USER" , payload:aaaa});
        // dispatch({type:"LOGIN" , payload:responsee.data});
        // const profilePicUpdate=responsee.data.editProfileImage.profileImage
        // renderImage(profilePicUpdate)

        setImage(null);
        setProfileImage("");
        //setRender(true)
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
            // form.resetFields()
            // let image=values.post_image.file

            // setImage(image)
            setProfileImage(fileList);
            toColoudinary(fileList);
            handleCancel();
          });
        }}
        setConfirmLoading={confirmLoading}
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
                      // beforeUpload={(file) => {
                      //   console.log(file, "file");
                      //   return false;
                      // }}
                      //showUploadList={true}
                      accept=".jpg, .jpeg,"
                      onPreview={onPreview}
                      onChange={onChange}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
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
export default ProfileImageModal;
