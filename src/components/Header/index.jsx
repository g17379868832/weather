import React from 'react'
import PubSub from 'pubsub-js';
import axios from 'axios'
import {nanoid} from 'nanoid'
import { Input, message } from 'antd';

import { APPID,APPSECRET } from '../../config/id';

export default function Index(props) {
	const { Search } = Input;

	//初始化项目
	React.useEffect(() => {
		if (!localStorage.getItem("weatherInfo")) {
			//创建新的本地数据
			const weatherInfo = [{}]
			localStorage.setItem("weatherInfo", JSON.stringify(weatherInfo))
		}
		//取到本地城市数据第一条，发送请求，完成初始化
		axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v62&appid=${APPID}&appsecret=${APPSECRET}`)
			.then(
				data => {
					//是否设置appid
					if(data.data.errcode == 100){
						props.sendErr()
						console.log(data.data)
					}
					
					else{
						axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v9&appid=${APPID}&appsecret=${APPSECRET}`)
						.then(
							daysData => {
								props.getAllData([data.data, daysData.data])
							}
						)
						.catch(
							err => {
								console.log(err);
							}
						)
					}

				}
			)

	}, [0])


	//搜索天气
	const onSearch = (value) => {
		PubSub.publish("setLoading",true)
		//判断输入框是否为空，若空提示用户输入，不空发送请求
		if (value.trim() === "") {
			message.warning('请输入城市名', 0.5);
		}
		else {
			
			axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v62&appid=${APPID}&appsecret=${APPSECRET}&city=${value}`)
				.then(
					data => {
						console.log(data);
						//判断是否返回正确数据
						if (data.data.errcode == 100) {
							PubSub.publish("setLoading",false)
							//错误提示
							message.warning('城市名不正确', 0.5);
						}
						else {
							axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v9&appid=${APPID}&appsecret=${APPSECRET}&city=${value}`)
								.then(
									daysData => {
										console.log([data.data, daysData.data]);
										props.getAllData([data.data, daysData.data])
										//本地存储搜索数据
										let getData = JSON.parse(localStorage.getItem("weatherInfo"))
										
										let result = getData.findIndex((item, i) => {
											return item.city == value
										})
										if (result != -1) {
											if (result != 0) {
												getData.splice(result, 1);
												const newData = { id:nanoid(), city: value, isDefault:false }
												getData.push(newData)
												localStorage.setItem("weatherInfo", JSON.stringify(getData))
											}

										}
										else {
											const newData = { id:nanoid(), city: value, isDefault:false }
											getData.push(newData)
											localStorage.setItem("weatherInfo", JSON.stringify(getData))
										}

									}
								)
								.catch(
									err => {
										console.log(err);
									}
								)



						}
					}
				)
				.catch(
					err => {
						message.error('网络出错，请稍后再试', 0.5);
					}
				)
		}
	};

	return (
		<div className="header">
			<Search
				placeholder="请输入城市名，例如：南昌 /景德镇"
				enterButton="搜索"
				size="large"
				onSearch={onSearch}
			/>
		</div>
	)
}
