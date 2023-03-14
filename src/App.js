import React from 'react'
import {useRoutes } from 'react-router-dom'

import './App.css'
import routes from './routes/index'

export default function App() {
	const element = useRoutes(routes)
	return (
		<div className="app">		
			{element}
		</div>
	)
}
