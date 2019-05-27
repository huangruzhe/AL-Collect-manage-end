import { message } from 'antd';

export default function config() {
  return {
    onError(err) {
      err.preventDefault();
      message.error(err.message);
    },
  };
}