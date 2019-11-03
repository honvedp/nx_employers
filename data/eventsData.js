	var employersD = [
						{id: 'en_1', name: 'Erdélyi Árpád', email: 'erdelyi.arpad@nextent.hu', munkaviszonyFrom: '2010-10-01', munkaviszonyTo: null/*, treeData: [{text: "Parent 1"}]*/},
						{id: 'en_3', name: 'Jenei Krisztián', email: 'jenei.krisztian@nextent.hu', munkaviszonyFrom: '2016-10-01', munkaviszonyTo: '2019-07-01'/*, treeData: [{text: "Parent 2"}]*/},
						{id: 'en_4', name: 'Kollerné Koska Veronika', email: 'koska.veronika@nextent.hu', munkaviszonyFrom: '2014-10-01', munkaviszonyTo: null/*, treeData: [{text: "Parent 3"}]*/},
						{id: 'en_5', name: 'László József', email: 'laszlo.jozsef@nextent.hu', munkaviszonyFrom: '2011-10-01', munkaviszonyTo: null},
						{id: 'en_6', name: 'Pernye László', email: 'pernye.laszlo@nextent.hu', munkaviszonyFrom: '2011-10-01', munkaviszonyTo: null},
						{id: 'en_7', name: 'Radnai László', email: 'radnai.laszlo@nextent.hu', munkaviszonyFrom: '2014-10-01', munkaviszonyTo: null},
						{id: 'en_8', name: 'Sipos Annamária', email: 'sipos.annamaria@nextent.hu', munkaviszonyFrom: '2016-10-01', munkaviszonyTo: null},
						{id: 'en_9', name: 'Kovács Ákos', email: 'kovacs.akos@nextent.hu', munkaviszonyFrom: '2010-10-01', munkaviszonyTo: null}
						
	]

	var allocationsD = [
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_1', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_2', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_3', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_4', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_5', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_6', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_7', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'MT_DWH_DEV_SUP_TM_2019', projectName: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', userId: 'en_8', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCode: 'ERSTE_2019', projectName: 'ERSTE tesztelés 2019', userId: 'en_9', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'}
	]

	var conversationsD = [
                        {eventDT: '2019-06-10T12:00:00Z', userIdFrom: 'en_1', userIdTo: 'en_3', messageType: 'email', messageID: '16b69682844ed1a5'},
                        {eventDT: '2019-08-10T12:05:00Z', userIdFrom: 'en_3', userIdTo: 'en_1', messageType: 'email', messageID: '16b69682844ed1a5'},
                        {eventDT: '2019-09-12T13:00:00Z', userIdFrom: 'en_8', userIdTo: 'en_4', messageType: 'email', messageID: '16b69682844ed1a5'},
                        {eventDT: '2019-10-12T14:00:00Z', userIdFrom: 'en_8', userIdTo: 'en_9', messageType: 'email', messageID: '16b69682844ed1a5'},
]

var treeData = [
	{
	  text: "Parent 1",
	  nodes: [
		{
		  text: "Child 1",
		  nodes: [
			{
			  text: "Gchild 1"
			},
			{
			  text: "Gchild 2"
			}
		  ]
		},
		{
		  text: "Child 2"
		}
	  ]
	},
	{
	  text: "Parent 2"
	},
	{
	  text: "Parent 3"
	},
	{
	  text: "Parent 4"
	},
	{
	  text: "Parent 5"
	}
  ];