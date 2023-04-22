export const getTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0) {
    return `${diffInYears} 年前`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} 个月前`;
  } else if (diffInDays > 0) {
    return `${diffInDays} 天前`;
  } else if (diffInHours > 0) {
    return `${diffInHours} 小时前`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} 分钟前`;
  } else {
    if (diffInSeconds <= 0) {
      return "刚刚";
    } else return `${diffInSeconds} 秒前`;
  }
}
