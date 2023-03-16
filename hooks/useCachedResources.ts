import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { initWorkouts } from "../storage/workout";

const useCachedResources = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await initWorkouts();
        await Font.loadAsync({
          "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
          "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, [isLoadingComplete]);

  return isLoadingComplete;
};
export default useCachedResources;
