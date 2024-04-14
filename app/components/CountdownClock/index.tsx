import Countdown from "react-countdown";
import { Text } from "@mantine/core";

interface ITimeProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface IProps {
  closeTime: Date;
}

const CountdownClock = ({ closeTime }: IProps) => {
  const DoneMessage = () => <span>Lottery Ended</span>;

  const renderer = ({ hours, minutes, seconds, completed }: ITimeProps) => {
    if (completed) {
      // Render a completed state
      return <DoneMessage />;
    } else {
      // Render a countdown
      return (
        <span>
          {"Time left: "}
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  return <Countdown date={closeTime.getTime()} renderer={renderer} />;
};

export default CountdownClock;
