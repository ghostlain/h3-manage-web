import { Request, Response } from 'express';

const getParking =  (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '1',
        parentId: 0,
        parkingId: 1,
        areaName: '红门工业园',
        areaNumber: 1,
        areaLevel: 0,
        areaType: 1,
        whetherCharge: true,
        temporaryQuantities: 0,
        fixedQuantities: 0,
        specialQuantities: 0,
        truckQuantities: 0,
        createdTime: '2021-01-01 11:00:00',
        createdUser: 'admin',
        lastUpdateTime: '2021-01-01 11:00:00',
        lastUpdateUser: 'admin',
        areaDescription: '',
        areas: [
          {
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
        ],

      }
    ]
  })
}

export default {
  'GET /api/parking/get': getParking
}
