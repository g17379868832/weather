/*
 * @Author: 郭朝鹏 2750323167@qq.com
 * @Date: 2023-03-11 19:49:19
 * @LastEditors: 郭朝鹏 2750323167@qq.com
 * @LastEditTime: 2023-03-12 16:19:52
 * @FilePath: \rear_management_systemc:\Users\admin\Desktop\aa\src\pages\ShowPage\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import PubSub from 'pubsub-js'
import {useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

export default function Index() {
	const navigate = useNavigate()
	//父组件维护全部数据的state
	const [allData, setAllData] = React.useState({})
	const [err,setErr] = React.useState(false)
	console.log(allData)
	PubSub.subscribe('sendData', allData)

	//定义函数传入Header组件 等待Header组件收到数据后传入当前组件
	const getAllData = (info) => {
		return (
			setAllData(info),
			PubSub.publish('getData', info),
			navigate('/showPage/baseInfo', {
				state: info
			})	
		)
	}
	const sendErr = () => {
		setErr(true)
	}
	return (
		<div>
			<Header getAllData={getAllData} sendErr={sendErr} />
		</div>
	)
}
