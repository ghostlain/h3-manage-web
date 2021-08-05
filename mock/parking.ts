import { Request, Response } from 'express';

const Park = [
  {
    id: '1',
    areaName: '红门工业园',
    areaType: 1,
    areas: [
      {
        id: '2',
        areaName: '外区',
        areaLevel: 1,
        areaType: 2,
        enterChannels: [
          {
            id: 1,
            channelName: '入口',
          }
        ],
        exitChannels: [
          {
            id: 2,
            channelName: '出口',
          }
        ]
      }
    ],
  }
]


const areas = {
  1: {
    id: '1',
    parentId: 0,
    parkingId: 1,
    areaName: '红门工业园',
    areaLevel: 1,
    areaType: 1,
    whetherCharge: true,
    temporaryQuantities: 100,
    fixedQuantities: 0,
    specialQuantities: 0,
    truckQuantities: 0,
    createdTime: '2021-01-01 11:00:00',
    createdUser: 'admin',
    lastUpdateTime: '2021-01-01 11:00:00',
    lastUpdateUser: 'admin',
    areaDescription: '',
  },
  2: {
    id: '2',
    parentId: 1,
    parkingId: 1,
    areaName: '外区',
    areaLevel: 1,
    areaType: 2,
    whetherCharge: true,
    temporaryQuantities: 100,
    fixedQuantities: 0,
    specialQuantities: 0,
    truckQuantities: 0,
    createdTime: '2021-01-01 11:00:00',
    createdUser: 'admin',
    lastUpdateTime: '2021-01-01 11:00:00',
    lastUpdateUser: 'admin',
    areaDescription: '',
    enterChannels: [
      {
        id: 1,
        channelNumber: 1,
        channelName: '入口',
        unattendedMode: 1,
        channelDescription: '',
        disable: false,
        createTime: '2021-01-01 11:00:00',
        createUser: 'admin',
        lastUpdateTime: '2021-01-01 11:00:00',
        lastUpdateUser: 'admin',
      }
    ],
    exitChannels: [
      {
        id: 2,
        channelNumber: 1,
        channelName: '出口',
        unattendedMode: 1,
        channelDescription: '',
        disable: false,
        createTime: '2021-01-01 11:00:00',
        createUser: 'admin',
        lastUpdateTime: '2021-01-01 11:00:00',
        lastUpdateUser: 'admin',
      }
    ]
  }
}

export default {
  'GET /api/parking/get': (req: Request, res: Response) => {
    res.send({
      data: Park
    })
  },
  'GET /api/parking/area/1': {
    data: areas[1],
  },
  'GET /api/parking/area/2': {
    data: areas[2],
  },
}
