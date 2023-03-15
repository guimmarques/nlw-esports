import { ImageBackground } from "react-native";
import { styles } from "./styles";
import backgroundImg from "../../assets/background-galaxy.png";

interface Props {
  children: React.ReactNode;
}

export function Background(props: Props) {
  const { children } = props;
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.contatiner}
      defaultSource={backgroundImg}
    >
      {children}
    </ImageBackground>
  );
}
