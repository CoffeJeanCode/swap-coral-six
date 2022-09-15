const clipBoard = (url: string) => {
  navigator.clipboard.writeText(url);
};

export default clipBoard;
