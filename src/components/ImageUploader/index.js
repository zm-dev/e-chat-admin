import React from 'react';
import { Upload, message, Icon } from 'antd';
// import tokenStore from '@/common/tokenStore';

function beforeUpload(file) {
  const allowType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
  const isImage = allowType.indexOf(file.type) > -1;
  if (!isImage) {
    message.error('只能上传图片类型文件');
  }
  const isLt6M = file.size / 1024 / 1024 < 6;
  if (!isLt6M) {
    message.error('图片必须小于6MB');
  }
  return isImage && isLt6M;
}
function getBase64(img, callback) {
  if (img) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}

export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: '',
    };
  }

  render() {
    const uploadButton = (
      <div>
        <Icon style={{ fontSize: 24 }} type={this.state.loading ? 'loading' : 'plus'} />
        <div>Upload</div>
      </div>
    );
    // const token = tokenStore.getToken();
    return (
      <Upload
        name="image"
        listType="picture-card"
        showUploadList={false}
        action="/api/v1/upload_image"
        // headers={{
        //   Authorization: token ? 'Bearer ' + token.accessToken : undefined,
        // }}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {this.props.imageUrl || this.state.imageUrl ? (
          <img
            src={this.state.imageUrl || this.props.imageUrl}
            alt="upload"
            style={{ maxHeight: 98 }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
  handleChange = info => {
    const { onChange } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        if (imageUrl) {
          this.setState({ imageUrl: imageUrl });
        }
        this.setState({
          loading: false,
        });
        if (onChange) {
          onChange(info.file.response.image_hash);
        }
      });
    }
  };
}
