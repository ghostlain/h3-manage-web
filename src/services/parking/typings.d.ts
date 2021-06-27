declare namespace API {
  type ParkArea = {
    id: number;
    parentId: number;
    parkingId: number;
    areaName: string;
    areaLevel: number;
    areaType: number;
    whetherCharge: boolean;
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
    id: number;
    channelName: string;
    unattendedMode?: number;
    channelDescription?: string;
    disable: boolean;
    createTime: string;
    createUser: string;
    lastUpdateTime: string;
    lastUpdateUser: string;
  }
}
