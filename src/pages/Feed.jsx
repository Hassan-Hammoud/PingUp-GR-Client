import { useEffect, useState } from 'react';
import { dummyPostsData } from '../assets/assets';
import { Loading, PostCard, StoriesBar } from '../components';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH FEEDS
  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);
  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* STORIES AND POST LIST  */}
      <div className=''>
        <StoriesBar />
        <div className='p-4 space-y-6'>
          {feeds.map((post, id) => {
            return (
              <PostCard
                key={id}
                post={post}
              />
            );
          })}
        </div>
      </div>
      {/* RIGHT SIDE BAR  */}
      <div className=''>
        <div className=''>
          <h1 className=''>Sponsored</h1>
        </div>
        <div className=''>
          <h1 className=''>Recent Messages</h1>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
