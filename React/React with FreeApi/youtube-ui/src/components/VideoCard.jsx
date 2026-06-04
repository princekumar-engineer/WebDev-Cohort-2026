function VideoCard({ video }) {
  return (
    <div className="card">
      <div className="thumbnail">
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
        />
        <span className="duration">
          {video.contentDetails.duration}
        </span>
      </div>

      <div className="info">
        <h3>{video.snippet.title}</h3>
        <p>{video.snippet.channelTitle}</p>
        <p className="meta">
          👁️ {video.statistics.viewCount} views
        </p>
      </div>
    </div>
  );
}

export default VideoCard;