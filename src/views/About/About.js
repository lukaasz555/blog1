import React, { useEffect, useState } from "react";
import { Wrapper } from "./About.styles";
import picture from "../../img/man.jpg";
import Socials from "components/atoms/Socials/Socials";
import axios from "axios";
import Loader from "components/atoms/Loader/Loader";

const URL = "https://graphql.datocms.com/";
const query = `{
allAbouts {
  header
  part1
  part2
  part3
  adminImg {
    id
    url
  }
}}
`;

const About = () => {
  const [author, setAuthor] = useState({
    header: "",
    part1: "",
    part2: "",
    part3: "",
    img: "",
  });

  useEffect(() => {
    axios
      .post(
        URL,
        { query },
        {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_DATOCMS_TOKEN}`,
          },
        }
      )
      .then(({ data: { data } }) => {
        const author = data.allAbouts;
        console.log(author);
        console.log(author[0].header);
        setAuthor({
          header: author[0].header,
          part1: author[0].part1,
          part2: author[0].part2,
          part3: author[0].part3,
          img: author[0].adminImg.url,
        });
        //console.log(author);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {author.header == "" ? (
        <Loader />
      ) : (
        <Wrapper>
          <img src={author.img} alt="" />

          <div>
            <h3>{author.header}</h3>
            <p>{author.part1}</p>

            <p>{author.part2}</p>

            <p>{author.part3}</p>
          </div>
          <Socials />
        </Wrapper>
      )}
    </>
  );
};

export default About;
