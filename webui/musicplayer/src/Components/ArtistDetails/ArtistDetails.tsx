import styled from "@emotion/styled";
import { Cell, Grid } from "baseui/layout-grid";
import { FC } from "react";
import Button from "../Button";
import ControlBar from "../ControlBar";
import ArrowBack from "../Icons/ArrowBack";
import Play from "../Icons/Play";
import Shuffle from "../Icons/Shuffle";
import MainContent from "../MainContent";
import Sidebar from "../Sidebar";
import TracksTable from "../TracksTable";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BackButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: #f7f7f8;
  margin-left: 10px;
  margin-bottom: 46px;
  position: absolute;
  z-index: 1;
`;

const Scrollable = styled.div`
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

const Artist = styled.div`
  font-family: RockfordSansBold;
  font-size: 32px;
  margin-top: 94px;
  margin-left: 15px;
  margin-bottom: 40px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-bottom: 20px;
`;

const Separator = styled.div`
  width: 26px;
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.div`
  margin-top: 6px;
`;

const Title = styled.div`
  font-family: RockfordSansBold;
  font-size: 16px;
  margin-left: 15px;
  margin-bottom: 10px;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-right: 50px;
`;

const SeeMore = styled.div`
  width: 64px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.51);
  cursor: pointer;
`;

const Tracks = styled.div`
  margin-bottom: 48px;
`;

const AlbumCover = styled.img`
  height: 169px;
  width: 169px;
  border-radius: 5px;
  cursor: pointer;
`;

const AlbumArtist = styled.div`
  color: #828282;
  margin-bottom: 56px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
`;

const AlbumTitle = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
`;

export type ArtistDetailsProps = {
  onBack: () => void;
  onClickLibraryItem: (item: string) => void;
  artist: any;
  tracks: any[];
  albums: any[];
};

const ArtistDetails: FC<ArtistDetailsProps> = ({
  onBack,
  onClickLibraryItem,
  artist,
  tracks,
  albums,
}) => {
  return (
    <Container>
      <Sidebar active="artists" onClickLibraryItem={onClickLibraryItem} />
      <Content>
        <ControlBar />
        <MainContent displayHeader={false}>
          <Scrollable>
            <BackButton onClick={onBack}>
              <div style={{ marginTop: 2 }}>
                <ArrowBack />
              </div>
            </BackButton>
            <Artist>{artist.name}</Artist>
            <Buttons>
              <Button onClick={() => {}} kind="primary">
                <Label>
                  <Icon>
                    <Play small color="#fff" />
                  </Icon>
                  <div style={{ marginLeft: 7 }}>Play</div>
                </Label>
              </Button>
              <Separator />
              <Button onClick={() => {}} kind="secondary">
                <Label>
                  <Shuffle color="#ab28fc" />
                  <div style={{ marginLeft: 7 }}>Shuffle</div>
                </Label>
              </Button>
            </Buttons>
            <Tracks>
              <TracksTable
                tracks={tracks}
                title={
                  <Row>
                    <Title>Tracks</Title>
                    <SeeMore>See all</SeeMore>
                  </Row>
                }
              />
            </Tracks>

            <Row>
              <Title>Albums</Title>
              <SeeMore>See all</SeeMore>
            </Row>
            <Grid gridColumns={[3, 4, 5]} gridMargins={[8, 16, 18]}>
              {albums.map((item) => (
                <Cell key={item.id}>
                  <AlbumCover src={item.cover} />
                  <AlbumTitle>{item.title}</AlbumTitle>
                  <AlbumArtist>{item.artist}</AlbumArtist>
                </Cell>
              ))}
            </Grid>
          </Scrollable>
        </MainContent>
      </Content>
    </Container>
  );
};

export default ArtistDetails;
