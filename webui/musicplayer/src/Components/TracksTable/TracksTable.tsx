import styled from "@emotion/styled";
import { Play } from "@styled-icons/ionicons-sharp";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import _ from "lodash";
import { FC } from "react";
import ContextMenu from "../ContextMenu";
import Speaker from "../Icons/Speaker";
import TrackIcon from "../Icons/Track";

const TableWrapper = styled.div`
  margin-top: 31px;
`;

const AlbumCoverAlt = styled.div<{ current: boolean }>`
  height: 43px;
  width: 43px;
  background-color: #f7f7f8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  ${({ current }) => `opacity: ${current ? 0 : 1};`}
`;

const CellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
`;

export type CellProps = {
  current?: string | boolean;
  row: any;
  item: any;
  index: number;
  onPlayTrack: (id: string, postion?: number) => void;
  isAlbumTracks: boolean;
};

const Cell: FC<CellProps> = ({
  current,
  row,
  item,
  onPlayTrack,
  index,
  isAlbumTracks,
}) => {
  return (
    <CellWrapper>
      {!isAlbumTracks && item === "Title" && (
        <AlbumCoverAlt className="album-cover" current={!!current}>
          <TrackIcon width={24} height={24} color="#a4a3a3" />
        </AlbumCoverAlt>
      )}
      {current && isAlbumTracks && (
        <div>
          {item === "#" && (
            <div
              style={{
                position: "absolute",
                left: isAlbumTracks ? 20 : 37,
                marginTop: -11,
              }}
            >
              <Speaker color="#ab28fc" />
            </div>
          )}

          {item !== "#" && (
            <div style={{ flex: 1 }}>{_.get(row, _.toLower(item), "")}</div>
          )}
        </div>
      )}
      {current && !isAlbumTracks && (
        <div>
          {item === "Title" && (
            <div
              style={{
                position: "absolute",
                left: isAlbumTracks ? 20 : 37,
              }}
            >
              <Speaker color="#ab28fc" />
            </div>
          )}
          <div style={{ flex: 1 }}>{_.get(row, _.toLower(item), "")}</div>
        </div>
      )}
      {!current && !isAlbumTracks && item === "Title" && (
        <div
          onClick={() => onPlayTrack(row.id, index)}
          className="floating-play"
        >
          <Play size={16} />
        </div>
      )}
      {!current && item === "#" && (
        <>
          <div onClick={() => onPlayTrack(row.id, index)} className="play">
            <Play size={16} />
          </div>
          <div className="tracknumber">{_.get(row, _.toLower(item), "")}</div>
        </>
      )}
      {!current && item !== "#" && (
        <div style={{ flex: 1 }}>{_.get(row, _.toLower(item), "")}</div>
      )}
    </CellWrapper>
  );
};

export type TracksTableProps = {
  tracks: any[];
  header?: string[];
  title?: JSX.Element;
  currentIndex?: number;
  currentTrackId?: string;
  isPlaying?: boolean;
  maxHeight?: string;
  onPlayTrack: (id: string, position?: number) => void;
};

const TracksTable: FC<TracksTableProps> = ({
  tracks,
  header,
  title,
  currentIndex,
  currentTrackId,
  isPlaying,
  maxHeight,
  onPlayTrack,
}) => {
  return (
    <TableWrapper>
      {title}
      <TableBuilder
        data={tracks}
        overrides={{
          Root: {
            style: {
              maxHeight,
              paddingLeft: "10px",
            },
          },
          TableHeadCell: {
            style: ({ $col }) => {
              return {
                width:
                  $col.header === "#"
                    ? "10px"
                    : $col.header === "Time"
                    ? "98px"
                    : $col.header === ""
                    ? "50px"
                    : $col.header === "Title"
                    ? "calc(100% - 200px)"
                    : $col.header === "Artist"
                    ? "100px"
                    : "auto",
                outlineWidth: "0px",
                borderBottomColor: "#fff !important",
                color: "rgba(0, 0, 0, 0.542)",
              };
            },
          },
          TableBodyCell: {
            style: ({ $col }) => ({
              outlineWidth: "0px 0px 0px 0px",
              borderBottomColor: "#fff !important",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth:
                $col.header === "Artist" || $col.header === "Album"
                  ? "120px"
                  : "300px",
            }),
          },
          TableHead: {
            style: () => ({
              outlineWidth: "0px",
              borderBottomColor: "#fff",
            }),
          },
          TableBody: {
            style: () => ({ border: "none" }),
          },
        }}
      >
        {header?.map((item, index) => (
          <TableBuilderColumn key={index} header={item}>
            {(row: any) => {
              const current =
                (item === "Title" || item === "#") &&
                ((currentIndex && currentIndex === row.index) ||
                  (currentTrackId && row.id === currentTrackId)) &&
                isPlaying;
              return (
                <Cell
                  current={current}
                  row={row}
                  item={item}
                  index={index}
                  onPlayTrack={onPlayTrack}
                  isAlbumTracks={header.includes("#")}
                />
              );
            }}
          </TableBuilderColumn>
        ))}
        <TableBuilderColumn header="">
          {(row: any) => (
            <CellWrapper>
              <ContextMenu track={row} />
            </CellWrapper>
          )}
        </TableBuilderColumn>
      </TableBuilder>
    </TableWrapper>
  );
};

TracksTable.defaultProps = {
  header: ["Title", "Artist", "Album", "Time"],
  title: <div />,
  maxHeight: "calc(100vh - 250px)",
};

export default TracksTable;
