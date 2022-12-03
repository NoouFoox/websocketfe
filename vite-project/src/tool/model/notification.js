import { ElNotification } from "element-plus";
/**
 *
 * @param {string} title 消息标题
 * @param {string} message 消息内容
 * @param {string} type 消息类型 Success Warning Info Error
 */
export const emsg = (
  title = "title",
  message = "message",
  type = "success"
) => {
  ElNotification({
    title,
    message,
    type,
  });
};
