import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
// import useDevices from "../../services/devices";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL, GET_DASHBOARD_URL, GET_DEVICES_URL } from "../../urlconstants";
import * as React from 'react';

export default function Device() {
	const [loading, setLoading] = useState(false)
	const [deviceData, setDeviceData] = useState({})

	const getDevicesData = async (value) => {
		setLoading(true)
		const params = value ? `?${value}` : ""
		try {
		  const response = await axios.get(`${API_BASE_URL}${GET_DEVICES_URL}${params}`);
		  setDeviceData(response.data[0])
	
		}
		catch (e) {
		  console.log(e)
		}
		finally {
		  setLoading(false)
		}
	
	  }
	  React.useEffect(() => {
		// getDashboardData()
		getDevicesData()
	  }, [])
	const behavior = {
		columnResizeMode: 'growAndShrink'
	}

	const appearance = {
		alternationCount: 2,
		showRowHeader: true,
		showRowHeaderSelectIcon: true,
		showRowHeaderFocusIcon: true
	}

	const paging = {
		enabled: true
	}

	const pager = {
		visible: true
	}

	const sorting = {
		enabled: true
	}

	const editing = {
		enabled: true
	}

	const selection = {
		enabled: true,
		allowCellSelection: true,
		allowRowHeaderSelection: true,
		allowColumnHeaderSelection: true,
		mode: 'extended'
	}

	const dataSource = [  
	  { "id": "1", "CountryId": "Germany", "HospitalId": "Hospital1", "DeviceId": "device1", "LastSyncedDate": "01-01-2024", "LastTherapy": "01-06-2024", "firmwareVersion": "v0.1"},   
	  { "id": "2", "CountryId": "Germany", "HospitalId": "Hospital1", "DeviceId": "device2", "LastSyncedDate": "01-01-2024", "LastTherapy": "01-06-2024", "firmwareVersion": "v0.1"},   
	  { "id": "3", "CountryId": "Germany", "HospitalId": "Hospital2", "DeviceId": "device3", "LastSyncedDate": "01-01-2024", "LastTherapy": "01-06-2024", "firmwareVersion": "v0.1"},   
	  { "id": "4", "CountryId": "France", "HospitalId": "Hospital3", "DeviceId": "device4", "LastSyncedDate": "01-01-2024", "LastTherapy": "01-06-2024", "firmwareVersion": "v0.1"},   
  
 
	]
	
	const dataSourceSettings = {
		dataFields: [
			'id: string',
			'countryId: string',
			'hospitalId: string',
			'name: string',
			'lastSync: string',
			'lastTherapy: string',
			'lastError: string',			
			'firmwareVersion: string'



		]
	}

	const columns = [{
		label: 'id',
		dataField: 'id'
	},
	{
		label: 'Country Id',
		dataField: 'countryId'
	},
	{
		label: 'Hospital Id',
		dataField: 'hospitalId'
	},
	{
		label: 'DeviceId',
		dataField: 'name'
	},
	{
		label: 'Last Synced Date',
		dataField: 'lastSync'
	},
	{
		label: 'Last Therapy',
		dataField: 'lastTherapy'
	},
	{
		label: 'Last Error',
		dataField: 'lastError'
	},
	{
		label: 'F/w Version',
		dataField: 'firmwareVersion'
	},
	]

	return (
		<div>
		<div>
			<h2>Active Devices</h2>
			<Grid
				dataSourceSettings={dataSourceSettings}
				dataSource={deviceData["activeDevices"]}
				columns={columns}
				appearance={appearance}
				behavior={behavior}
				selection={selection}
				paging={paging}
				pager={pager}
				sorting={sorting}
				editing={editing}
			>
			</Grid>
		</div>
		
		<div>
		<h2>Inactive Devices</h2>
		<Grid
			dataSourceSettings={dataSourceSettings}
			dataSource={deviceData["inactiveDevices"]}
			columns={columns}
			appearance={appearance}
			behavior={behavior}
			selection={selection}
			paging={paging}
			pager={pager}
			sorting={sorting}
			editing={editing}
		>
		</Grid>
	</div>
	</div>
	);
}