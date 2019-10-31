	var employersD = [
						{id: 'en_1', name: 'Erdélyi Árpád', email: 'erdelyi.arpad@nextent.hu', munkaviszonyFrom: '2010-10-01', munkaviszonyEnd: ''},
						{id: 'en_2', name: 'Honvéd Péter', email: 'honved.peter@nextent.hu', munkaviszonyFrom: '2001-10-01', munkaviszonyEnd: ''},
						{id: 'en_3', name: 'Jenei Krisztián', email: 'jenei.krisztian@nextent.hu', munkaviszonyFrom: '2016-10-01', munkaviszonyEnd: '2019-07-01'},
						{id: 'en_4', name: 'Kollerné Koska Veronika', email: 'koska.veronika@nextent.hu', munkaviszonyFrom: '2014-10-01', munkaviszonyEnd: ''},
						{id: 'en_5', name: 'László József', email: 'laszlo.jozsef@nextent.hu', munkaviszonyFrom: '2011-10-01', munkaviszonyEnd: ''},
						{id: 'en_6', name: 'Pernye László', email: 'pernye.laszlo@nextent.hu', munkaviszonyFrom: '2011-10-01', munkaviszonyEnd: ''},
						{id: 'en_7', name: 'Radnai László', email: 'radnai.laszlo@nextent.hu', munkaviszonyFrom: '2014-10-01', munkaviszonyEnd: ''},
						{id: 'en_8', name: 'Sipos Annamária', email: 'sipos.annamaria@nextent.hu', munkaviszonyFrom: '2016-10-01', munkaviszonyEnd: ''},
						{id: 'en_9', name: 'Kovács Ákos', email: 'kovacs.akos@nextent.hu', munkaviszonyFrom: '2010-10-01', munkaviszonyEnd: ''}
						
	]
	var projektsD = [
						{code: 'pn_MT_DWH_DEV_SUP_TM_2019', name: 'MT Adattárház fejlesztés és üzemeltetés T&M 2019', managerID: 'en_2'},
						{code: 'pn_ERSTE_2019', name: 'ERSTE tesztelés 2019', managerID: 'en_9'}
	]

	var allocationsD = [
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_1', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_2', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_3', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_4', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_5', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_6', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_7', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_MT_DWH_DEV_SUP_TM_2019', userIdTo: 'en_8', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'},
						{projectCodeFrom: 'pn_ERSTE_2019', userIdTo: 'en_9', fromDT: '2010-10-10T12:00:00Z', toDT: '2019-12-31T23:59:59Z'}
	]

	var conversationsD = [
                        {eventDT: '2019-10-10T12:00:00Z', userIdFrom: 'en_1', userIdTo: 'en_2', messageType: 'email', messageID: '16b69682844ed1a5'},
                        {eventDT: '2019-10-10T12:05:00Z', userIdFrom: 'en_2', userIdTo: 'en_1', messageType: 'email', messageID: '16b69682844ed1a5'},
                        {eventDT: '2019-10-12T13:00:00Z', userIdFrom: 'en_8', userIdTo: 'en_4', messageType: 'email', messageID: '16b69682844ed1a5'},
                        {eventDT: '2019-10-12T14:00:00Z', userIdFrom: 'en_8', userIdTo: 'en_9', messageType: 'email', messageID: '16b69682844ed1a5'},
]
