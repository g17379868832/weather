//引入React的库
import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

// import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';

//引入App组件
import App from './App'


  

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>

)

// const container = document.getElementById('root')
// const root = createRoot(container)
// root.render(<App/>)