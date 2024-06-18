import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { GET_DASHBOARD_URL, API_BASE_URL } from '../urlconstants';
const useDashboard = () => {
   const [data, setData] = useState({});
   const [loading, setLoading] = useState(false)
   const getDashboardData = async () => {
      setLoading(true)
      try {
         const response = await axios.get(`${API_BASE_URL}${GET_DASHBOARD_URL}`);
         setData(response.data)

      }
      catch (e) {
         console.log(e)
      }
      finally {
         setLoading(false)
      }

   }
   useEffect(() => {
      getDashboardData()

   }, [])
   return {data,loading}
}
export default useDashboard;