import { useEffect, useState } from "react";
import VideoCard from "./components/VideoCard";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="status">Loading videos...</h2>;

  return (
    <div>
      <h1 className="title">📺 YouTube Videos</h1>

      <div className="container">
        {videos.map((video) => (
          <VideoCard
            key={video.items.id}
            video={video.items}
          />
        ))}
      </div>
    </div>
  );
}

export default App;