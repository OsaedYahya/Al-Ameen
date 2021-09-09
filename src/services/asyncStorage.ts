import AsyncStorage from "@react-native-async-storage/async-storage";

import { logError } from "~/utils/errorHandler";

export const storeItem = async (key: string, item: string | JSON): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    logError("AsyncStorage storeItem Error: " + error);
  }
  return;
};

export const retrieveItem = async (key: string): Promise<string | undefined> => {
  try {
    const retrievedItem: string | null = await AsyncStorage.getItem(key);
    if (retrievedItem) {
      const item = JSON.parse(retrievedItem);
      return item;
    }
  } catch (error) {
    logError("AsyncStorage retrieveItem Error: " + error);
  }
  return;
};
export const deleteItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    logError("AsyncStorage deleteItem Error: " + error);
  }
  return;
};

export const getAllKeys = async (): Promise<string[] | undefined> => {
  let keys: string[] = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    logError("AsyncStorage getAllKeys Error: " + error);
  }
  return;
};

export const getMultiple = async (
  keys: string[]
): Promise<[string, string | null][] | undefined> => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (error) {
    logError(`AsyncStorage getMultiple Error: " + ${error}`);
  }
  return;
};

//   const firstPair = ["@MyApp_user", "value_1"]
//   const secondPair = ["@MyApp_key", "value_2"]
export const multiSet = async (
  keyValuePairs: Array<Array<string>>
): Promise<void | undefined> => {
  try {
    await AsyncStorage.multiSet(keyValuePairs);
  } catch (error) {
    logError(`AsyncStorage multiSet Error: " + ${error}`);
  }
  return;
};

export const removeFew = async (keys: string[]): Promise<void | undefined> => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    logError(`AsyncStorage removeFew Error: " + ${error}`);
  }

  return;
};

export const clearAll = async (): Promise<void | undefined> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    logError(`AsyncStorage clearAll Error: " + ${error}`);
  }

  return;
};
