import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { GET_DEVICES_URL, API_BASE_URL } from '../urlconstants';
const useDevices = () => {
   const [data, setData] = useState({});
   const [loading, setLoading] = useState(false)
   const getDevicesData = async () => {
      setLoading(true)
      try {
         const response = await axios.get(`${API_BASE_URL}${GET_DEVICES_URL}`);
         setData(response.data[0])

      }
      catch (e) {
         console.log(e)
      }
      finally {
         setLoading(false)
      }

   }
   useEffect(() => {
      getDevicesData()

   }, [])
   return {data,loading}
}
export default useDevices;