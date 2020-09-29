import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { getYoutubeAction } from "../reducers/media";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import moment from "moment";
import MoreMediaButton from "./MoreMediaButton";

const Youtube = () => {
  const dispatch = useDispatch();
  const { youtube } = useSelector(({ media }: RootState) => media);

  const getMoreYoutubeData = useCallback(() => {
    console.log("more youtubedata");
  }, []);
  const youtubeData = youtube?.data;
  useEffect(() => {
    dispatch(
      getYoutubeAction.request({
        itemCode: 111,
        start: 0,
        countPerPage: 5,
      })
    );
  }, []);

  return (
    <YoutubeBlock>
      <LazyLoad height={338}>
        {/* <YoutubeTT>인기뉴스</YoutubeTT> */}
        {youtubeData?.map((data, index) => (
          <YoutubeItemWrapper
            key={index}
            target="_blank"
            href={`https://www.youtube.com/watch?v=${data.VideoID}`}
          >
            <YoutubeContent>
              <Thumbnail>
                <img src={data.ThumbnailURL} alt={data.Title} />
              </Thumbnail>
              <Detail>
                <DetailLeft>{data.Title}</DetailLeft>
                <DetailRight>
                  <div>{data.ChannelTitle}</div>
                  <div>{moment(data.PublishedAt).format("YY.MM.DD")}</div>
                </DetailRight>
              </Detail>
            </YoutubeContent>
          </YoutubeItemWrapper>
        ))}
      </LazyLoad>
      <MoreMediaButton getMoreYoutubeData={getMoreYoutubeData} />
    </YoutubeBlock>
  );
};

export default Youtube;

const Thumbnail = styled.div`
  width: 130px;
  & > img {
    width: 100%;
    display: block;
  }
`;
const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 15px;
`;
const DetailLeft = styled.div``;
const DetailRight = styled.div``;

const YoutubeBlock = styled.div``;

const YoutubeItemWrapper = styled.a`
  padding: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #999;
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const YoutubeContent = styled.div`
  display: flex;
  width: 100%;
`;