declare namespace API {
  type ParkEquipment = {
    id: number;
    parentId: number;
    equipmentName: string;
    equipmentDescription: string;
    equipmentType: string;
    equipmentUse: number;
    equipmentDriver: string;
    equipmentModel: string;
    equipmentSerialNumber: string;
    createTime: string;
    createUser: string;
    lastUpdateTime: string;
    lastUpdateUser: string;
    channelIds?: number[];
  }
}
