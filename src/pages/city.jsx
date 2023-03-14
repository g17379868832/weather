
import { useState } from 'react'
import { Cascader,  Space} from 'antd-mobile';
import provinces from "china-division/dist/provinces";
import cities from "china-division/dist/cities";
import areas from "china-division/dist/areas";
const AntdCascader = () => {
  console.log(cities);

  areas.forEach((area, id) => {
    const matchCity = cities.filter(city => city.code === area.cityCode)[0];
    if (matchCity) {
      matchCity.children = matchCity.children || [];
      matchCity.children.push({ label: area.name, value: area.code, id });
    }
  });

  cities.forEach((city, id) => {
    const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
    if (matchProvince) {
      matchProvince.children = matchProvince.children || [];
      matchProvince.children.push({ label: city.name, value: city.code, id, children: city.children });
    }
  });

  const options = provinces.map((province, id) => ({ label: province.name, value: province.code, id, children: province.children })); 

  function RenderChildrenDemo() {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState([])
    return (
      <Space align='center'>
        <div
          style={{ color: '#fff', margin: '10px', fontSize: '24px' }}
          onClick={() => {
            setVisible(true)
          }}>
          <Cascader
            options={options}
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            value={value}
            onConfirm={setValue}
            onSelect={(val, extend) => {
              console.log('onSelect', val, extend.items)
            }}
          >
            {items => {
              if (items.every(item => item === null)) {
                return '南昌'
              } else {
                return items.map(item => item?.label ?? '未选择')
              }
            }}
          </Cascader>
        </div>
 
      </Space>
    )
  }
  return (
    <div>
      <RenderChildrenDemo />
    </div>
  );
};
export default AntdCascader;