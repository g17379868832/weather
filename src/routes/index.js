import React from 'react'
import { Navigate } from 'react-router-dom'

import BaseInfo from '../pages'

import ShowPage from '../pages/ShowPage/index'

const routes = [
	{
		path:'/showPage',
		element:<ShowPage/>,
		children:[
			{
				path: 'baseInfo',
				element: <BaseInfo />
			},
		]
	},
	{
		path:'/',
		element:<Navigate to='/showPage'/>
	}
]
export default routes