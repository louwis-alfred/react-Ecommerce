import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSeller = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (error) {
        console.error(`Error fetching authors: ${error}`);
      }
    };

    fetchData();
  }, []);

  const toggleFollow = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Top Sellers</h1>
      <div className="space-y-4">
        {authors.map((author, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <span className="text-lg px-6">{author.name}</span>
            </div>
            <button
              onClick={() => toggleFollow(index)}
              className={`ml-4 px-3 py-2 rounded w-24 ${
                author.isFollowing
                  ? "bg-gray-300 text-gray-700"
                  : "bg-blue-500 text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSeller;