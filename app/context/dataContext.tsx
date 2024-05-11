import React, {createContext, ReactNode, useState} from 'react';

type dataDTO = {
  role: "user" | "model",
  parts: [{ text: string }],
};

export type DataContextDataProps = {
  chatData: dataDTO[];
  storageData: (props: dataDTO) => void;
}

type DataContextProps = {
  children: ReactNode;
};

export const DataContext = createContext<DataContextDataProps>([] as any);

export function DataContextProvider({children}: DataContextProps) {
  const [chatData, setChatData] = useState<dataDTO[]>([] as dataDTO[]);

  async function storageData(props: dataDTO) {
    try {
      setChatData((prev) =>  [...prev, props]);
    } catch (error) {
      throw error;
    }
  }

  return (
    <DataContext.Provider
      value={{
       chatData,
       storageData
      }}>
      {children}
    </DataContext.Provider>
  );
}