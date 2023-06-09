import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard(props: Props) {
  const { data, ...rest } = props;
  return (
    <TouchableOpacity style={styles.contatiner} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.ads}>{`${data._count.ads} anúncios`}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
