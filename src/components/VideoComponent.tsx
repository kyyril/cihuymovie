interface PropsData {
  id: any;
  size: string;
}
const VideoComponent = ({ id, size }: PropsData) => {
  return (
    <iframe
      width="100%"
      height={size}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
};

export default VideoComponent;
