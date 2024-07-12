import React from "react";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AppNavigator from "./navigation/AppNavigator";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AssetsIconsPack from "./assets/AssetsIconsPack";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <IconRegistry icons={[EvaIconsPack, AssetsIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </GluestackUIProvider>
  );
}
