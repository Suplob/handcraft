import { Container, Grid, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import Preloader from "../../Shared/Preloader/Preloader";
import { EffectFade } from "swiper";
import "swiper/css/effect-fade";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://hand-craft-backend.herokuapp.com/reviews`)
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      });
  }, []);

  console.log(reviews);

  return (
    <>
      {loading ? (
        <Preloader></Preloader>
      ) : (
        <Container>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", mt: 5, fontFamily: "Cormorant", mb: 3 }}
          >
            Customers' Say
          </Typography>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[EffectFade]}
            effect="fade"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: { xs: "100%", md: "100%" },
                    margin: "0 auto",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`data:image/png;base64,${review.image}`}
                      alt={review.name}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={9}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: "start",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Cormorant",
                        fontStyle: "italic",
                        fontSize: "25px",
                        color: "rgba(0,0,0,0.6)",
                      }}
                    >
                      ”{review.review}
                    </p>
                    <Typography
                      variant="body1"
                      sx={{ mt: 2, fontFamily: "Cormorant" }}
                    >
                      {review.name}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      sx={{ color: "rgba(0,0,0,0.7)" }}
                    />
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}
    </>
  );
};

export default Review;
