/*

select '						{id: ''en_' || emp.EMPLOYEE_ID || ''', name: ''' || emp.EMPLOYEE_NAME || ''', email: ''' || deem.detail_value || ''', munkaviszonyFrom: ''' || to_char(emp.c_date, 'yyyy-mm-dd') || ''',  munkaviszonyTo: ''' || nvl(to_char(emp.d_date, 'yyyy-mm-dd'), 'null') || '''},' as emp_row
from  NEXTIME_DATA.NXT_EMPLOYEE emp,
      NEXTIME_DATA.nxt_employee_detail deem
where deem.EMPLOYEE_ID = emp.EMPLOYEE_ID     
  and deem.detail_type_id = 135 -- Email cím
  and deem.valid_to is null

select * from NEXTIME_DATA.nxt_employee_detail where detail_type_id = 135 and valid_to is null

*/

var employersD = [
	{id: 'en_117', name: 'Angyal Fruzsina', email: 'angyal.fruzsina@nextent.hu', munkaviszonyFrom: '2014-12-16',  munkaviszonyTo: 'null'},
	{id: 'en_124', name: 'Perneky Virág', email: 'perneky.virag@nextent.hu', munkaviszonyFrom: '2015-07-02',  munkaviszonyTo: 'null'},
	{id: 'en_137', name: 'Móré János', email: 'more.janos@nextent.hu', munkaviszonyFrom: '2016-01-05',  munkaviszonyTo: 'null'},
	{id: 'en_142', name: 'Balázs Attila', email: 'balazs.attila@nextent.hu', munkaviszonyFrom: '2016-03-19',  munkaviszonyTo: 'null'},
	{id: 'en_143', name: 'Paál László', email: 'paal.laszlo@nextent.hu', munkaviszonyFrom: '2016-04-04',  munkaviszonyTo: 'null'},
	{id: 'en_145', name: 'Somogyi Lili', email: 'somogyi.lili@nextent.hu', munkaviszonyFrom: '2016-05-05',  munkaviszonyTo: 'null'},
	{id: 'en_146', name: 'Zrínyi Berta', email: 'zrinyi.berta@nextent.hu', munkaviszonyFrom: '2016-05-20',  munkaviszonyTo: 'null'},
	{id: 'en_147', name: 'Oláh Bernadett', email: 'olah.bernadett@nextent.hu', munkaviszonyFrom: '2016-05-30',  munkaviszonyTo: 'null'},
	{id: 'en_148', name: 'Cseh Zoltán', email: 'cseh.zoltan@nextent.hu', munkaviszonyFrom: '2016-06-10',  munkaviszonyTo: 'null'},
	{id: 'en_150', name: 'Szabó György', email: 'szabo.gyorgy@nextent.hu', munkaviszonyFrom: '2016-06-20',  munkaviszonyTo: 'null'},
	{id: 'en_88', name: 'Pálhidy Csaba', email: 'palhidy.csaba@nextent.hu', munkaviszonyFrom: '2014-01-21',  munkaviszonyTo: 'null'},
	{id: 'en_91', name: 'Fodor István', email: 'fodor.istvan@nextent.hu', munkaviszonyFrom: '2014-03-11',  munkaviszonyTo: 'null'},
	{id: 'en_154', name: 'Kiss József', email: 'kiss2.jozsef@nextent.hu', munkaviszonyFrom: '2016-08-15',  munkaviszonyTo: 'null'},
	{id: 'en_11', name: 'Dr. Bodnár Zsigmond', email: 'bodnar.zsigmond@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_12', name: 'Bottlikné Dalnoki Zita', email: 'dalnoki.zita@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_15', name: 'Lukácsné Csere Edina', email: 'csere.edina@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_17', name: 'Erdélyi Árpád', email: 'erdelyi.arpad@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_18', name: 'Fábián Anikó', email: 'fabian.aniko@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_20', name: 'Fidler Zoltán', email: 'fidler.zoltan@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_24', name: 'Hegedüs Tamás', email: 'hegedus.tamas@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_25', name: 'Hivekovics Zoltán', email: 'hivekovics.zoltan@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_26', name: 'Honvéd Péter', email: 'honved.peter@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_28', name: 'Konczos Szilárd', email: 'konczos.szilard@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: '2019-02-18'},
	{id: 'en_29', name: 'Kovács Ákos', email: 'kovacs.akos@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_33', name: 'László József', email: 'laszlo.jozsef@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_34', name: 'Lukács László', email: 'lukacs.laszlo@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_35', name: 'Makhult Viktor', email: 'makhult.viktor@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_37', name: 'Nagy Péter Szilárd', email: 'nagy.peter.szilard@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_39', name: 'Pernye László', email: 'pernye.laszlo@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_40', name: 'Péter Tamás', email: 'peter.tamas@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_42', name: 'Sipos Annamária', email: 'sipos.anna@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_45', name: 'Szabó István', email: 'szabo.istvan@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_47', name: 'Szalai Balázs', email: 'szalai.balazs@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_48', name: 'Szendrői Gábor', email: 'szendroi.gabor@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_49', name: 'Szloboda Éva', email: 'szloboda.eva@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_52', name: 'Tóth László', email: 'toth.laszlo@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_60', name: 'Adorján Gábor', email: 'adorjan.gabor@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_61', name: 'Bakos Balázs', email: 'bakos.balazs@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_62', name: 'Canjavec Attila', email: 'canjavec.attila@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_63', name: 'Dörnyei László', email: 'dornyei.laszlo@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_66', name: 'Kiss József', email: 'kiss.jozsef@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_69', name: 'Rimay Tibor', email: 'rimay.tibor@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_72', name: 'Turbucz Áron', email: 'turbucz.aron@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_73', name: 'Vas Frigyes', email: 'vas.frigyes@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_74', name: 'Vincze Csaba', email: 'vincze.csaba@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: 'null'},
	{id: 'en_1', name: 'Fekete Erika', email: 'fekete.erika@nextent.hu', munkaviszonyFrom: '2013-04-23',  munkaviszonyTo: '2019-04-15'},
	{id: 'en_90', name: 'Horváth Attila', email: 'horvath.attila@nextent.hu', munkaviszonyFrom: '2014-02-03',  munkaviszonyTo: 'null'},
	{id: 'en_95', name: 'Csontos Valentin', email: 'csontos.valentin@nextent.hu', munkaviszonyFrom: '2014-06-12',  munkaviszonyTo: 'null'},
	{id: 'en_96', name: 'Karácsony Péter', email: 'karacsony.peter@nextent.hu', munkaviszonyFrom: '2014-06-12',  munkaviszonyTo: 'null'},
	{id: 'en_97', name: 'Papp László', email: 'papp.laszlo@nextent.hu', munkaviszonyFrom: '2014-06-16',  munkaviszonyTo: 'null'},
	{id: 'en_107', name: 'Budavári Károly', email: 'budavari.karoly@nextent.hu', munkaviszonyFrom: '2014-09-09',  munkaviszonyTo: 'null'},
	{id: 'en_110', name: 'Gede Gergely', email: 'gede.gergely@nextent.hu', munkaviszonyFrom: '2014-09-22',  munkaviszonyTo: 'null'},
	{id: 'en_111', name: 'Egyházi Balázs', email: 'egyhazi.balazs@nextent.hu', munkaviszonyFrom: '2014-10-10',  munkaviszonyTo: 'null'},
	{id: 'en_161', name: 'Radnai László', email: 'radnai.laszlo@nextent.hu', munkaviszonyFrom: '2016-10-25',  munkaviszonyTo: 'null'},
	{id: 'en_166', name: 'Garamszegi Gabriella', email: 'garamszegi.gabriella@nextent.hu', munkaviszonyFrom: '2016-11-08',  munkaviszonyTo: 'null'},
	{id: 'en_188', name: 'Szücs-Mátyás Ádám', email: 'szucs.adam@nextent.hu', munkaviszonyFrom: '2017-10-06',  munkaviszonyTo: '2019-03-25'},
	{id: 'en_206', name: 'Kerner Orsolya', email: 'kerner.orsolya@nextent.hu', munkaviszonyFrom: '2018-04-03',  munkaviszonyTo: 'null'},
	{id: 'en_207', name: 'Sebők Tibor', email: 'sebok.tibor@nextent.hu', munkaviszonyFrom: '2018-05-31',  munkaviszonyTo: 'null'},
	{id: 'en_183', name: 'Filep Tamás', email: 'filep.tamas@nextent.hu', munkaviszonyFrom: '2017-08-28',  munkaviszonyTo: 'null'},
	{id: 'en_192', name: 'Makk Árpád', email: 'makk.arpad@nextent.hu', munkaviszonyFrom: '2017-11-30',  munkaviszonyTo: '2019-05-23'},
	{id: 'en_195', name: 'Dobsa Dániel', email: 'dobsa.daniel@nextent.hu', munkaviszonyFrom: '2018-01-07',  munkaviszonyTo: 'null'},
	{id: 'en_198', name: 'Takács Ádám', email: 'takacs.adam@nextent.hu', munkaviszonyFrom: '2018-02-11',  munkaviszonyTo: 'null'},
	{id: 'en_201', name: 'Túri Balázs', email: 'turi.balazs@nextent.hu', munkaviszonyFrom: '2018-02-21',  munkaviszonyTo: 'null'},
	{id: 'en_203', name: 'Vida Gábor', email: 'vida.gabor@nextent.hu', munkaviszonyFrom: '2018-03-11',  munkaviszonyTo: 'null'},
	{id: 'en_208', name: 'Borbély Zoltán', email: 'borbely.zoltan@nextent.hu', munkaviszonyFrom: '2018-06-12',  munkaviszonyTo: '2019-02-19'},
	{id: 'en_189', name: 'Haller Renáta', email: 'haller.renata@nextent.hu', munkaviszonyFrom: '2017-10-15',  munkaviszonyTo: 'null'},
	{id: 'en_194', name: 'Keszthelyi Zoltán', email: 'keszthelyi.zoltan@nextent.hu', munkaviszonyFrom: '2018-01-04',  munkaviszonyTo: '2019-03-26'},
	{id: 'en_205', name: 'Burián Kornél', email: 'burian.kornel@nextent.hu', munkaviszonyFrom: '2018-04-03',  munkaviszonyTo: 'null'},
	{id: 'en_215', name: 'Bodó Norbert', email: 'bodo.norbert@nextent.hu', munkaviszonyFrom: '2018-11-05',  munkaviszonyTo: 'null'},
	{id: 'en_159', name: 'Milánkovichné Shadeh Noura', email: 'shadeh.noura@nextent.hu', munkaviszonyFrom: '2016-10-21',  munkaviszonyTo: 'null'},
	{id: 'en_163', name: 'Jenei Krisztián', email: 'jenei.krisztian@nextent.hu', munkaviszonyFrom: '2016-11-03',  munkaviszonyTo: 'null'},
	{id: 'en_164', name: 'Koska Veronika', email: 'koska.veronika@nextent.hu', munkaviszonyFrom: '2016-11-03',  munkaviszonyTo: 'null'},
	{id: 'en_168', name: 'Pápai Szabolcs', email: 'papai.szabolcs@nextent.hu', munkaviszonyFrom: '2016-12-21',  munkaviszonyTo: 'null'},
	{id: 'en_170', name: 'Botos Ádám', email: 'botos.adam@nextent.hu', munkaviszonyFrom: '2016-12-21',  munkaviszonyTo: 'null'},
	{id: 'en_172', name: 'Pallaghy Ajtony', email: 'pallaghy.ajtony@nextent.hu', munkaviszonyFrom: '2017-01-27',  munkaviszonyTo: 'null'},
	{id: 'en_191', name: 'Jacsó Ferenc', email: 'jacso.ferenc@nextent.hu', munkaviszonyFrom: '2017-11-20',  munkaviszonyTo: 'null'},
	{id: 'en_200', name: 'Filep Gábor', email: 'filep.gabor@nextent.hu', munkaviszonyFrom: '2018-02-19',  munkaviszonyTo: 'null'},
	{id: 'en_209', name: 'Weiling Fanni', email: 'weiling.fanni@nextent.hu', munkaviszonyFrom: '2018-06-29',  munkaviszonyTo: 'null'},
	{id: 'en_211', name: 'Balogh Ákos', email: 'balogh.akos@nextent.hu', munkaviszonyFrom: '2018-09-13',  munkaviszonyTo: 'null'},
	{id: 'en_157', name: 'Tóth Márta', email: 'toth.marta@nextent.hu', munkaviszonyFrom: '2016-09-05',  munkaviszonyTo: 'null'},
	{id: 'en_175', name: 'Pap Dániel', email: 'pap.daniel@nextent.hu', munkaviszonyFrom: '2017-05-22',  munkaviszonyTo: 'null'},
	{id: 'en_204', name: 'Wilk Gábor', email: 'wilk.gabor@nextent.hu', munkaviszonyFrom: '2018-03-21',  munkaviszonyTo: 'null'},
	{id: 'en_210', name: 'Herczeg Dániel', email: 'herczeg.daniel@nextent.hu', munkaviszonyFrom: '2018-08-16',  munkaviszonyTo: 'null'},
	{id: 'en_212', name: 'Huri Ferenc', email: 'huri.ferenc@nextent.hu', munkaviszonyFrom: '2018-09-19',  munkaviszonyTo: 'null'},
	{id: 'en_174', name: 'Bagi Tamás', email: 'bagi.tamas@nextent.hu', munkaviszonyFrom: '2017-04-28',  munkaviszonyTo: 'null'},
	{id: 'en_180', name: 'Rácz Zoltán', email: 'racz.zoltan@nextent.hu', munkaviszonyFrom: '2017-07-10',  munkaviszonyTo: 'null'},
	{id: 'en_181', name: 'Bodnár Adrienn', email: 'bodnar.adrienn@nextent.hu', munkaviszonyFrom: '2017-07-26',  munkaviszonyTo: '2019-01-22'},
	{id: 'en_214', name: 'Tóth Ádám', email: 'toth.adam@nextent.hu', munkaviszonyFrom: '2018-10-05',  munkaviszonyTo: 'null'},
	{id: 'en_216', name: 'Kutas Norbert', email: 'kutas.norbert@nextent.hu', munkaviszonyFrom: '2018-11-26',  munkaviszonyTo: 'null'},
	{id: 'en_155', name: 'Dombai Norbert', email: 'dombai.norbert@nextent.hu', munkaviszonyFrom: '2016-08-22',  munkaviszonyTo: 'null'},
	{id: 'en_202', name: 'Csábi Attila', email: 'csabi.attila@nextent.hu', munkaviszonyFrom: '2018-03-01',  munkaviszonyTo: 'null'},
	{id: 'en_217', name: 'Simon Laura', email: 'simon.laura@nextent.hu', munkaviszonyFrom: '2019-01-21',  munkaviszonyTo: 'null'},
	{id: 'en_218', name: 'Mayer Balázs', email: 'mayer.balazs@nextent.hu', munkaviszonyFrom: '2019-01-21',  munkaviszonyTo: 'null'}						
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
                        {eventDT: '2019-08-10T12:05:00Z', userIdFrom: 'en_3', userIdTo: 'en_1', messageType: 'email', messageID: '16b69682844ed1a6'},
                        {eventDT: '2019-09-12T13:00:00Z', userIdFrom: 'en_8', userIdTo: 'en_4', messageType: 'email', messageID: '16b69682844ed1a7'},
                        {eventDT: '2019-09-12T13:05:00Z', userIdFrom: 'en_8', userIdTo: 'en_4', messageType: 'email', messageID: '16b69682844ed1a8'},
                        {eventDT: '2019-10-12T14:00:00Z', userIdFrom: 'en_8', userIdTo: 'en_9', messageType: 'email', messageID: '16b69682844ed1a9'}
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