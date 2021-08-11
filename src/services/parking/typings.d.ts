declare namespace API {
  type ParkArea = {
    id?: number;
    parentId: number;
    parkingId: number;
    areaName: string;
    areaLevel: number;
    areaType: AreaType;
    whetherCharge: string;
    temporaryQuantities: number;
    fixedQuantities: number;
    specialQuantities: number;
    truckQuantities: number;
    createdTime: string;
    createdUser: string;
    lastUpdateTime: string;
    lastUpdateUser: string;
    areaDescription?: string;
    areas?: ParkArea[];
    enterChannels?: ParkChannel[];
    exitChannels?: ParkChannel[];
  }

  type ParkChannel = {
    id?: number;
    channelName: string;
    unattendedMode?: number;
    channelDescription?: string;
    disable: boolean;
    createTime: string;
    createUser: string;
    lastUpdateTime: string;
    lastUpdateUser: string;
  }

  enum AreaType {
    ParkingLot = 1,
    OuterArea = 2,
    InnerArea = 3
  }

  type ChannelNode = {
    id: number;
    channelName: string;
  }

  export type AreaNode = {
    id: number;
    parentId: number;
    areaName: string;
    areaType: AreaType;
    areas?: AreaNode[];
    enterChannels?: ChannelNode[];
    exitChannels?: ChannelNode[];
  }
}
