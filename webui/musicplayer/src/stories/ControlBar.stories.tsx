import { ComponentMeta, ComponentStory } from "@storybook/react";
import ControlBar from "../Components/ControlBar";

export default {
  title: "Components/ControlBar",
  component: ControlBar,
} as ComponentMeta<typeof ControlBar>;

const Template: ComponentStory<typeof ControlBar> = (args: any) => (
  <ControlBar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  nowPlaying: {
    title: "Otherside",
    artist: "Red Hot Chilli Peppers",
    album: "Californication",
    duration: 329,
    progress: 91,
    cover:
      "https://resources.tidal.com/images/543575fc/ad02/419b/ae61/671558dc019d/320x320.jpg",
  },
};

export const NotPlaying = Template.bind({});
