import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import "../css/post.css";

const Posts = () => {
  const [PostData, setPostDatas] = useState([]);
  async function getPostData() {
    try {
      const response = await fetch("https://codebuddy.review/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await response.json();
      setPostDatas(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getPostData();
  }, []);
  console.log(PostData, "getData");
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <Grid container spacing={2}>
        {PostData.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card className="CardBody">
              <CardMedia
                component="img"
                height="240"
                image={post.image}
                alt={`${post.firstName} ${post.lastName}`}
              />
              <CardContent className="CardComponentBody">
                <Stack direction="row" spacing={2}>
                  <Avatar alt={`${post.firstName} ${post.lastName}`} src={post.avatar} />
                  <Typography variant="h5" component="div">
                    {`${post.firstName} ${post.lastName}`}
                  </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {post.writeup}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
